// src/server/api/vendors/search.post.ts
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        categorySlug?: string
        city?: string
        minBudget?: number
        maxBudget?: number
        query?: string // Support AI text search if passed here
    }>(event)

    const client = await serverSupabaseClient<Database>(event)

    // 1) Optional: resolve category_id from slug
    let categoryId: string | null = null
    if (body.categorySlug) {
        const { data: cat, error: catError } = await client
            // @ts-ignore
            .schema('stagebloom')
            .from('vendor_categories')
            .select('id')
            .eq('slug', body.categorySlug)
            .maybeSingle() as { data: { id: string } | null, error: any }

        if (catError) {
            console.error('Error fetching category:', catError)
        }
        if (cat?.id) {
            categoryId = cat.id
        }
    }

    // 2) Base query
    let query = client
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
      is_verified,
      vendor_categories:vendor_categories!vendors_category_id_fkey (
        slug,
        name
      ),
      vendor_photos (
        image_url
      )
    `
        )
        .eq('is_active', true)
        // Filter the nested relationship to only get the cover photo
        .eq('vendor_photos.is_cover', true)
        // We limit to 1 photo per vendor in the join just in case
        .limit(1, { foreignTable: 'vendor_photos' })

    // 3) Apply filters
    if (categoryId) {
        query = query.eq('category_id', categoryId)
    }

    if (body.city) {
        query = query.ilike('city', `%${body.city}%`)
    }

    if (body.minBudget) {
        query = query.gte('starting_price', body.minBudget)
    }

    if (body.maxBudget) {
        query = query.lte('starting_price', body.maxBudget)
    }

    // 4) Execute
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await query as { data: any[] | null, error: any }

    if (error) {
        console.error('Error searching vendors:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to search vendors'
        })
    }

    // 5) Transform / Flatten Data
    // The frontend expects 'cover_image_url' as a string, but Supabase returns an array of objects for the join.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattenedVendors = (data ?? []).map((vendor: any) => {
        const coverPhoto = Array.isArray(vendor.vendor_photos)
            ? vendor.vendor_photos[0]
            : null

        // Remove the raw array from the response to keep payload clean
        const { vendor_photos, ...rest } = vendor

        return {
            ...rest,
            cover_image_url: coverPhoto?.image_url || null
        }
    })

    return {
        vendors: flattenedVendors
    }
})