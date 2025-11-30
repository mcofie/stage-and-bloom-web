import type { Database } from '~/types/database.types'

export const useFeaturedVendors = async () => {
    const supabase = useSupabaseClient<Database>()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
        .schema('stagebloom')
        .from('vendors')
        .select(`
      id,
      slug,
      display_name,
      city,
      area,
      short_bio,
      starting_price,
      price_range_min,
      price_range_max,
      is_verified,
      instagram_handle,
      whatsapp_number,
      vendor_categories:vendor_categories!inner ( name ),
      vendor_photos!inner ( image_url )
    `)
        .eq('is_active', true)
        .eq('is_verified', true)
        .eq('vendor_photos.is_cover', true) // Only fetch the cover photo
        .limit(20)

    if (error || !data) {
        console.error('Error loading featured vendors:', error)
        return []
    }

    // 1. Randomize the order
    // 2. Slice the first 6
    // 3. Map the nested vendor_photos array to a flat 'cover_image_url' string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data as any[])
        .sort(() => 0.5 - Math.random())
        .slice(0, 6)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((vendor: any) => ({
            ...vendor,
            // Safely access the first image url from the array
            cover_image_url: vendor.vendor_photos?.[0]?.image_url || null,
            // Ensure vendor_categories is treated as a single object if it comes as array (though it should be object for M:1)
            vendor_categories: Array.isArray(vendor.vendor_categories) ? vendor.vendor_categories[0] : vendor.vendor_categories
        }))
}