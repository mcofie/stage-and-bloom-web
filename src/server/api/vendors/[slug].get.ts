// server/api/vendors/[slug].get.ts
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const { slug } = event.context.params as { slug: string };
    const supabase = await serverSupabaseClient(event);

    const { data: vendor, error } = await supabase
        .from('stagebloom.vendors')
        .select(
            `
      id,
      slug,
      display_name,
      city,
      area,
      country_code,
      currency_code,
      starting_price,
      price_range_min,
      price_range_max,
      short_bio,
      cover_image_url,
      is_verified,
      whatsapp_number,
      instagram_url,
      vendor_categories:category_id ( slug, name ),
      vendor_rates:vendor_id (
        id,
        service_name,
        pricing_model,
        unit_label,
        starting_from_amount,
        currency_code,
        min_guests,
        max_guests,
        is_primary
      ),
      vendor_photos:vendor_id (
        id,
        image_url,
        caption,
        is_cover,
        sort_order
      )
    `
        )
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error || !vendor) {
        throw createError({ statusCode: 404, statusMessage: 'Vendor not found' });
    }

    return { vendor };
});