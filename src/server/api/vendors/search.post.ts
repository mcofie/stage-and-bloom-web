// server/api/vendors/search.post.ts
import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        categorySlug?: string;
        city?: string;
        minBudget?: number;
        maxBudget?: number;
    }>(event);

    const supabase = await serverSupabaseClient(event);

    const {categorySlug, city, minBudget, maxBudget} = body;

    let categoryId: string | undefined;
    if (categorySlug) {
        const {data: cat, error: catErr} = await supabase
            .from('stagebloom.vendor_categories')
            .select('id')
            .eq('slug', categorySlug)
            .single();

        if (!catErr && cat) {
            categoryId = (cat as { id: string }).id;
        }
    }

    let query = supabase
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

    if (categoryId) {
        query = query.eq('category_id', categoryId);
    }

    if (city) {
        query = query.ilike('city', city);
    }

    if (minBudget != null) {
        query = query.or(
            `price_range_min.is.null,price_range_min.lte.${minBudget}`
        );
    }

    if (maxBudget != null) {
        query = query.or(
            `price_range_max.is.null,price_range_max.gte.${maxBudget}`
        );
    }

    const {data, error} = await query.limit(30);

    if (error) {
        console.error(error);
        throw createError({statusCode: 500, statusMessage: error.message});
    }

    return {vendors: data};
});