// src/server/api/vendors/search-llm.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'
import OpenAI from 'openai'

type PlannerFilters = {
    category_slugs: string[] | null
    cities: string[] | null
    country_codes: string[] | null
    min_budget: number | null
    max_budget: number | null
    currency_code: string | null
    min_guests: number | null
    max_guests: number | null
    must_be_verified: boolean | null
}

type PlannerResult = {
    intent: 'search_vendors' | 'unknown'
    filters: PlannerFilters
    raw_text: string
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody<{ query: string }>(event)
    const queryText = body?.query

    if (!queryText) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing query'
        })
    }

    // 🔐 OpenAI client (single lightweight call)
    const openai = new OpenAI({
        apiKey: config.openaiApiKey
    })

    // 🧠 LLM: Vendor Query Planner (keep prompt tight for speed)
    const completion = await openai.chat.completions.create({
        model: 'gpt-5-mini',
        messages: [
            {
                role: 'system',
                content: `
You are the Vendor Query Planner for StageBloom, an event vendor marketplace in Ghana.

Your job:
- Take the user's free-text message about event vendors (e.g. "I need a wedding photographer in Accra, budget 20k")
- Infer structured filters that can be used to query the PostgreSQL tables:
  - stagebloom.vendors
  - stagebloom.vendor_categories
  - stagebloom.vendor_rates

You DO NOT write SQL.
You ONLY output a JSON filter object.
The backend will translate it to SQL/ORM.

OUTPUT FORMAT (STRICT):

Return ONLY a JSON object in this exact shape (no extra text, no markdown):

{
  "intent": "search_vendors" | "unknown",
  "filters": {
    "category_slugs": string[] | null,
    "cities": string[] | null,
    "country_codes": string[] | null,
    "min_budget": number | null,
    "max_budget": number | null,
    "currency_code": string | null,
    "min_guests": number | null,
    "max_guests": number | null,
    "must_be_verified": boolean | null
  },
  "raw_text": string
}

Field rules:
- Only infer reasonable vendor categories from the message (photographer, decor, caterer, dj, mc, cake, etc.).
- Do NOT invent cities, budgets or guest counts if they are not present.
- If something cannot be determined confidently, set it to null.
- Never include comments or extra keys.
- Never wrap the JSON in markdown fences.
      `.trim()
            },
            {
                role: 'user',
                content: `User message: "${queryText}"`
            }
        ]
        // ⚠️ IMPORTANT:
        // - Do NOT set temperature for gpt-5-mini.
        // - Do NOT set max_tokens; this model doesn't support it.
    })

    const raw = completion.choices[0]?.message?.content ?? '{}'

    let planner: PlannerResult
    try {
        planner = JSON.parse(raw) as PlannerResult
    } catch {
        console.error('LLM returned invalid JSON:', raw)
        throw createError({
            statusCode: 500,
            statusMessage: 'LLM returned invalid JSON'
        })
    }

    // If not a vendor search, short-circuit
    if (planner.intent !== 'search_vendors') {
        return { vendors: [], planner }
    }

    const filters = planner.filters

    // 🗄 Supabase (Nuxt helper, no direct createClient)
    const supabase = await serverSupabaseClient<Database>(event)

    // Take first category/city if provided
    const categorySlug = filters.category_slugs?.[0] ?? null
    const city = filters.cities?.[0] ?? null

    // 1) Resolve category_id by slug
    let categoryId: string | null = null
    if (categorySlug) {
        const { data: cat, error: catError } = await supabase
            // @ts-ignore
            .schema('stagebloom')
            .from('vendor_categories')
            .select('id')
            .eq('slug', categorySlug)
            .maybeSingle() as { data: { id: string } | null, error: any }

        if (catError) {
            console.error('Category lookup error:', catError)
            throw createError({
                statusCode: 500,
                statusMessage: `Category lookup failed: ${catError.message}`
            })
        }

        if (cat?.id) categoryId = cat.id
    }

    // 2) Build vendor query
    let query = supabase
        // @ts-ignore
        .schema('stagebloom')
        .from('vendors')
        .select(
            `
      id,
      slug,
      display_name,
      city,
      area,
      country_code,
      starting_price,
      price_range_min,
      price_range_max,
      short_bio,
      cover_image_url,
      is_verified,
      vendor_categories:vendor_categories!vendors_category_id_fkey (
        slug,
        name
      )
    `
        )
        .eq('is_active', true)

    if (categoryId) {
        query = query.eq('category_id', categoryId)
    }

    if (city) {
        query = query.ilike('city', `%${city}%`)
    }

    if (filters.min_budget != null) {
        query = query.gte('starting_price', filters.min_budget)
    }

    if (filters.max_budget != null) {
        query = query.lte('starting_price', filters.max_budget)
    }

    if (filters.must_be_verified === true) {
        query = query.eq('is_verified', true)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await query as { data: any[] | null, error: any }

    if (error) {
        console.error('Error searching vendors (LLM):', error)
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to search vendors: ${error.message}`
        })
    }

    return {
        vendors: data ?? [],
        planner
    }
})