// types/database.types.ts

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface PublicSchema {
    Tables: {
        profiles: {
            Row: {
                id: string
                email: string | null
                full_name: string | null
                phone: string | null
                created_at: string
            }
            Insert: {
                id?: string
                email?: string | null
                full_name?: string | null
                phone?: string | null
                created_at?: string
            }
            Update: Partial<PublicSchema['Tables']['profiles']['Insert']>
            Relationships: []
        }
        vendors: {
            Row: {
                id: string
                slug: string
                display_name: string
                category_id: string
                city: string | null
                area: string | null
                country_code: string | null
                instagram_handle: string | null
                instagram_url: string | null
                other_social_links: Json | null
                whatsapp_number: string | null
                whatsapp_default_msg: string | null
                currency_code: string | null
                starting_price: number | null
                price_range_min: number | null
                price_range_max: number | null
                short_bio: string | null
                cover_image_url: string | null
                is_verified: boolean
                is_active: boolean
                created_by: string | null
                claimed_by: string | null
                metadata: Json | null
                created_at: string
                updated_at: string
            }
            Insert: Partial<PublicSchema['Tables']['vendors']['Row']>
            Update: Partial<PublicSchema['Tables']['vendors']['Row']>
            Relationships: []
        }
        vendor_categories: {
            Row: {
                id: string
                slug: string
                name: string
                description: string | null
                icon: string | null
                sort_order: number | null
                is_active: boolean
                created_at: string
                updated_at: string
            }
            Insert: Partial<PublicSchema['Tables']['vendor_categories']['Row']>
            Update: Partial<PublicSchema['Tables']['vendor_categories']['Row']>
            Relationships: []
        }
        vendor_photos: {
            Row: {
                id: string
                vendor_id: string
                image_url: string
                caption: string | null
                source: string
                source_ref: string | null
                sort_order: number | null
                is_cover: boolean
                created_at: string
            }
            Insert: Partial<PublicSchema['Tables']['vendor_photos']['Row']>
            Update: Partial<PublicSchema['Tables']['vendor_photos']['Row']>
            Relationships: []
        }
        vendor_rates: {
            Row: {
                id: string
                vendor_id: string
                service_name: string
                pricing_model: string
                unit_label: string | null
                starting_from_amount: number
                currency_code: string | null
                min_guests: number | null
                max_guests: number | null
                is_primary: boolean
                is_active: boolean
                notes: string | null
                created_at: string
                updated_at: string
            }
            Insert: Partial<PublicSchema['Tables']['vendor_rates']['Row']>
            Update: Partial<PublicSchema['Tables']['vendor_rates']['Row']>
            Relationships: []
        }
        booking_requests: {
            Row: {
                id: string
                vendor_id: string | null
                created_by: string | null
                event_type: string | null
                event_date: string | null
                guest_count: number | null
                location_text: string | null
                city: string | null
                budget_total: number | null
                currency_code: string | null
                user_message: string | null
                parsed_payload: Json | null
                recommended_json: Json | null
                status: string
                contact_name: string | null
                contact_phone: string | null
                contact_email: string | null
                created_at: string
                updated_at: string
            }
            Insert: Partial<PublicSchema['Tables']['booking_requests']['Row']>
            Update: Partial<PublicSchema['Tables']['booking_requests']['Row']>
            Relationships: []
        }
    }
    Views: {
        vendor_search_index: {
            Row: {
                id: string
                slug: string
                display_name: string
                city: string | null
                area: string | null
                country_code: string | null
                category_slug: string | null
                category_name: string | null
                short_bio: string | null
                cover_image_url: string | null
                is_verified: boolean
                starting_price: number | null
                price_range_min: number | null
                price_range_max: number | null
                currency_code: string | null
                whatsapp_number: string | null
            }
        }
    }
    Functions: {
        search_vendors_simple: {
            Args: {
                p_search: string | null
                p_category_slug: string | null
                p_city: string | null
                p_min_budget: number | null
                p_max_budget: number | null
                p_country_code: string | null
            }
            Returns: {
                id: string
                slug: string
                display_name: string
                city: string | null
                area: string | null
                country_code: string | null
                category_slug: string | null
                category_name: string | null
                short_bio: string | null
                cover_image_url: string | null
                is_verified: boolean
                starting_price: number | null
                price_range_min: number | null
                price_range_max: number | null
                currency_code: string | null
                whatsapp_number: string | null
            }[]
        }
    }
    Enums: {
        sb_booking_status: 'new' | 'in_review' | 'connected' | 'closed'
        sb_pricing_model: 'per_event' | 'per_guest' | 'per_hour'
    }
}

export interface Database {
    public: PublicSchema
    stagebloom: PublicSchema
}