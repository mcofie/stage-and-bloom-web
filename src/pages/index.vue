<template>
  <div class="font-sans bg-[#FDFCF8] dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen selection:bg-rose-100 selection:text-rose-900">


    <main class="pt-24 pb-20 space-y-24">
      <HomeHeroSection />

      <HomeEventTypes />

      <HomeHowItWorks />

      <HomeFeaturedVendors :vendors="vendors" :pending="pending" />

      <HomeTestimonials />

      <HomeCallToAction />
    </main>


  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useAsyncData, useSeoMeta} from '#imports'
import {useFeaturedVendors} from '~/composables/useFeaturedVendors'

import type { Database } from '~/types/database.types'

useSeoMeta({
  title: 'Stage & Bloom - The Curated Marketplace for Events in Ghana',
  description: 'Discover and book Accra\'s finest decorators, caterers, and photographers. Plan your perfect wedding or event with confidence.',
  ogTitle: 'Stage & Bloom - The Curated Marketplace for Events in Ghana',
  ogDescription: 'Discover and book Accra\'s finest decorators, caterers, and photographers. Plan your perfect wedding or event with confidence.',
})

// --- DATA FETCHING (FEATURED VENDORS) ---

type VendorRow = Database['public']['Tables']['vendors']['Row']
type FeaturedVendor = Pick<VendorRow,
  | 'id'
  | 'slug'
  | 'display_name'
  | 'city'
  | 'area'
  | 'short_bio'
  | 'starting_price'
  | 'price_range_min'
  | 'is_verified'
  | 'cover_image_url'
> & {
  vendor_categories?: { name: string } | null
}

const { data: featuredVendors, pending } = await useAsyncData('featured-vendors', () => useFeaturedVendors())

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const vendors = computed<FeaturedVendor[]>(() => (featuredVendors.value as any) || [])
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }
.font-sans { font-family: 'Inter', sans-serif; }

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>