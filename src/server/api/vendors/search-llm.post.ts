// server/api/vendors/search-llm.post.ts
import {serverSupabaseClient} from '#supabase/server';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `...your stringified Vendor Query Planner prompt...`;

export default defineEventHandler(async (event) => {
    const {query} = await readBody<{ query: string }>(event);
    const config = useRuntimeConfig();

    const supabase = await serverSupabaseClient(event);
    const client = new OpenAI({apiKey: config.openaiApiKey});

    const resp = await client.responses.create({
        model: 'gpt-5-mini',
        input: [
            {
                role: 'system',
                content: [{type: 'input_text', text: SYSTEM_PROMPT}],
            },
            {
                role: 'user',
                content: [{type: 'input_text', text: query}],
            },
        ],
    });

    const anyResp = resp as any;
    const raw: string =
        anyResp.output?.[0]?.content?.[0]?.text ??
        JSON.stringify(anyResp.output ?? {});

    let planner: any;
    try {
        planner = JSON.parse(raw);
    } catch (e) {
        console.error('LLM parse error', e, raw);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to parse planner JSON',
        });
    }

    const filters = planner.filters ?? {};
    const categorySlug =
        filters.category_slugs && filters.category_slugs.length
            ? filters.category_slugs[0]
            : undefined;
    const city =
        filters.cities && filters.cities.length ? filters.cities[0] : undefined;
    const minBudget = filters.min_budget ?? undefined;
    const maxBudget = filters.max_budget ?? undefined;

    // Supabase query same as basic search
    let categoryId: string | undefined;
    if (categorySlug) {
        const {data: cat} = await supabase
            .from('stagebloom.vendor_categories')
            .select('id')
            .eq('slug', categorySlug)
            .single();
        if (cat) {
            categoryId = (cat as { id: string }).id;
        }
    }

    let queryV = supabase
        .from('stagebloom.vendors')
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
      vendor_categories:category_id ( slug, name )
    `
        )
        .eq('is_active', true);

    if (categoryId) queryV = queryV.eq('category_id', categoryId);
    if (city) queryV = queryV.ilike('city', city);
    if (minBudget != null) {
        queryV = queryV.or(
            `price_range_min.is.null,price_range_min.lte.${minBudget}`
        );
    }
    if (maxBudget != null) {
        queryV = queryV.or(
            `price_range_max.is.null,price_range_max.gte.${maxBudget}`
        );
    }

    const {data: vendors, error} = await queryV.limit(30);
    if (error) {
        console.error(error);
        throw createError({statusCode: 500, statusMessage: error.message});
    }

    return {
        planner,
        filters: {categorySlug, city, minBudget, maxBudget},
        vendors,
    };
});