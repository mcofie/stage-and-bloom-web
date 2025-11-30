// src/server/api/booking-requests/create.post.ts
import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Use service role to bypass RLS policies for public submissions
    const client = await serverSupabaseClient<Database>(event)

    const { data, error } = await client
        .schema('stagebloom')
        .from('booking_requests')
        .insert(body)
        .select()
        .single()

    if (error) {
        console.error('Error creating booking request:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create booking request',
            message: error.message
        })
    }

    return data
})
