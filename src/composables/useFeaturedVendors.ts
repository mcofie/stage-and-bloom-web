import type {Database} from '~/types/database.types'

export const useFeaturedVendors = async () => {
    const supabase = useSupabaseClient<Database>()

    const {data, error} = await supabase
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
    return data
        .sort(() => 0.5 - Math.random())
        .slice(0, 6)
        .map((vendor) => ({
            ...vendor,
            // Safely access the first image url from the array (since we filtered by is_cover, it should be the right one)
            cover_image_url: vendor.vendor_photos?.[0]?.image_url || null
        }))
}