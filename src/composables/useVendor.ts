// src/composables/useVendor.ts
import {serverSupabaseClient} from '#supabase/server'
import type {Database} from '~/types/database.types'

export const useVendor = async (slug: string) => {
    const event = useRequestEvent()
    const supabase = await serverSupabaseClient<Database>(event)

    const {data, error} = await supabase
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
      instagram_handle,
      instagram_url,
      whatsapp_number,
      whatsapp_default_msg,
      currency_code,
      starting_price,
      price_range_min,
      price_range_max,
      short_bio,
      cover_image_url,
      is_verified,
      metadata,
      vendor_categories:vendor_categories!inner (
        id,
        slug,
        name,
        description
      ),
      vendor_rates:stagebloom.vendor_rates (
        id,
        service_name,
        pricing_model,
        unit_label,
        starting_from_amount,
        currency_code,
        min_guests,
        max_guests,
        is_primary,
        is_active,
        notes
      ),
      vendor_photos:stagebloom.vendor_photos (
        id,
        image_url,
        caption,
        sort_order,
        is_cover
      )
    `
        )
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle()

    if (error) {
        throw createError({statusCode: 500, statusMessage: 'Error loading vendor'})
    }

    if (!data) {
        throw createError({statusCode: 404, statusMessage: 'Vendor not found'})
    }

    return data
}