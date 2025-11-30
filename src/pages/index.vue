<template>
  <div class="font-sans bg-[#FDFCF8] dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen selection:bg-rose-100 selection:text-rose-900">
    <SiteNavbar/>

    <main class="pt-24 pb-20 space-y-24">
      <HomeHeroSection />

      <HomeEventTypes />

      <HomeHowItWorks />

      <HomeFeaturedVendors :vendors="vendors" :pending="pending" />

      <HomeTestimonials />

      <HomeCallToAction />
    </main>

    <footer class="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2 mb-6">
              <div
                  class="h-8 w-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-serif font-bold flex items-center justify-center rounded-lg">
                SB
              </div>
              <span class="font-serif font-bold text-lg text-slate-900 dark:text-white">Stage &amp; Bloom</span>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Reimagining how events are planned in Africa. Beautifully simple, reliably curated.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-4">Discover</h4>
            <ul class="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <NuxtLink to="/vendors/search?categorySlug=decorator" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Wedding Vendors
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/vendors/search?categorySlug=caterer" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Caterers
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/vendors/search?categorySlug=photographer" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Photographers
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
            <ul class="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">About Us</a></li>
              <li><a href="#" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-4">Join the list</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">Get the best vendors delivered to your inbox monthly.</p>
            <div class="flex gap-2">
              <input
type="email" placeholder="Email address"
                     class="w-full bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-rose-300 dark:focus:border-rose-500 dark:text-white">
              <button class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100">Go
              </button>
            </div>
          </div>
        </div>
        <div
            class="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>&copy; {{ new Date().getFullYear() }} Stage &amp; Bloom. Made with ♥ in Accra.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-slate-600 dark:hover:text-slate-300">Privacy Policy</a>
            <a href="#" class="hover:text-slate-600 dark:hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
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