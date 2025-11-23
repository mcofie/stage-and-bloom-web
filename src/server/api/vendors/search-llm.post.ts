// src/server/api/vendors/search-llm.post.ts
import {defineEventHandler, readBody, createError} from 'h3'
import {serverSupabaseClient} from '#supabase/server'
import OpenAI from 'openai'

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

    // 🔐 OpenAI client
    const openai = new OpenAI({
        apiKey: config.openaiApiKey
    })

    // 🧠 LLM: Vendor Query Planner
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

Context (simplified schema):

- stagebloom.vendors
  - id (uuid)
  - display_name (text)
  - slug (text, unique)
  - category_id (uuid)          -- FK to vendor_categories.id
  - city (text)
  - area (text)
  - country_code (text, default "GH")
  - currency_code (text, default "GHS")
  - starting_price (numeric)
  - price_range_min (numeric)
  - price_range_max (numeric)
  - is_verified (boolean)
  - is_active (boolean)

- stagebloom.vendor_categories
  - id (uuid)
  - slug (text)                 -- e.g. "photographer", "decor", "caterer"
  - name (text)

- stagebloom.vendor_rates
  - id (uuid)
  - vendor_id (uuid)            -- FK to vendors.id
  - service_name (text)
  - pricing_model (enum, e.g. "per_event", "per_guest")
  - starting_from_amount (numeric)
  - currency_code (text, default "GHS")
  - min_guests (integer)
  - max_guests (integer)
  - is_active (boolean)

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

- intent:
  - "search_vendors" if the user is clearly asking to find/compare/request vendors
  - "unknown" if the message is not about vendors or you cannot map it to a search

- category_slugs:
  - Array of category slugs or null.
  - Infer from phrases like "photographer", "decor", "caterer", "DJ", "MC", "band", "cake", etc.
  - You ARE allowed to infer likely vendor categories from the type of event even if the user does not name them explicitly.
    Examples:
    - "Organising a party for a few friends, who will I need to pull this off?"
      → ["decor", "caterer", "dj", "cake"]
    - "small birthday at home" → ["decor", "cake", "caterer"]
    - "wedding" → ["decor", "caterer", "photographer", "dj", "mc", "cake"]
  - Always lower-case slugs (e.g. "photographer").
  - If no vendor category can reasonably be inferred, use null.

- cities:
  - Array of city names or null.
  - Use the exact city names mentioned (e.g. "Accra", "Kumasi").
  - If no city is mentioned, use null.

- country_codes:
  - Array of ISO country codes or null.
  - Default to ["GH"] if the user clearly implies Ghana but does not specify another country.
  - If country is unclear, use null.

- min_budget / max_budget:
  - If user gives a single total budget (e.g. "budget 20,000 cedis"), set both min_budget and max_budget to that number.
  - If user gives a range (e.g. "10k–20k"), set min_budget to lower bound, max_budget to upper bound.
  - Ignore currency symbols; interpret numbers as the given currency.
  - If no total budget is given, use nulls.

- currency_code:
  - "GHS" for Ghana cedis if user mentions cedis or uses GH₵.
  - If user mentions another currency explicitly (e.g. "USD"), use that code.
  - If unsure, set to null (do NOT guess).

- min_guests / max_guests:
  - If the user gives a specific guest count (e.g. "150 guests"), set both to that number.
  - If they say "between 100 and 200 guests", set min_guests = 100, max_guests = 200.
  - If guest count is very vague (e.g. "a few friends"), you may leave min_guests and max_guests as null.
  - If no guest count is mentioned, use nulls.

- must_be_verified:
  - true if the user clearly asks for "verified", "trusted only", "top-rated only", etc.
  - false if they explicitly say they don't care.
  - null if not mentioned.

General rules:

- You ARE allowed to infer reasonable vendor categories from the type of event.
- You are NOT allowed to invent specific cities, countries, budgets, or exact guest counts if they are not given.
- If a value cannot be confidently determined from the message, set it to null (do NOT invent details).
- Arrays must be real JSON arrays (e.g. ["photographer"]) or null, never empty strings.
- Use numbers for numeric fields (no quotes).
- Use proper JSON booleans: true / false / null.
- Never include comments in the JSON.
- Never wrap the JSON in markdown code fences.
- Never prefix with explanatory text like "Here is your JSON:" — return ONLY the JSON object.

If the user's message is completely unrelated to vendor search and you cannot infer anything:
- Set "intent" to "unknown"
- Set all filter fields to null
- Copy the original message into "raw_text".

Always ensure the result is valid JSON and parses without error.
      `.trim()
            },
            {
                role: 'user',
                content: `User message: "${queryText}"`
            }
        ]
        // ❗️IMPORTANT: do NOT set `temperature` for gpt-5-mini
    })

    const raw = completion.choices[0]?.message?.content ?? '{}'

    let planner: {
        intent: 'search_vendors' | 'unknown'
        filters: {
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
        raw_text: string
    }

    try {
        planner = JSON.parse(raw)
    } catch (e) {
        console.error('LLM returned invalid JSON:', raw)
        throw createError({
            statusCode: 500,
            statusMessage: 'LLM returned invalid JSON'
        })
    }

    // If not a vendor search, just return planner + empty list
    if (planner.intent !== 'search_vendors') {
        return {vendors: [], planner}
    }

    const filters = planner.filters

    // 🗄 Supabase: use Nuxt helper, not @supabase/supabase-js directly
    const supabase = await serverSupabaseClient(event)

    // Take first category/city if provided
    const categorySlug = filters.category_slugs?.[0] ?? null
    const city = filters.cities?.[0] ?? null

    // 1) Resolve category_id by slug (from stagebloom.vendor_categories)
    let categoryId: string | null = null
    if (categorySlug) {
        const {data: cat, error: catError} = await supabase
            .schema('stagebloom')
            .from('vendor_categories')
            .select('id')
            .eq('slug', categorySlug)
            .maybeSingle()

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

    const {data, error} = await query

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