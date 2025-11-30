// src/server/api/booking-requests/create.post.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Missing Supabase configuration'
        })
    }

    // Use service role to bypass RLS policies for public submissions
    const client = createClient<Database>(supabaseUrl, supabaseServiceKey)

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
            message: error.message // Expose the actual error message
        })
    }

    return data
})
