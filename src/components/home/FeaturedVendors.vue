<template>
  <section id="vendors" class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-end justify-between mb-8">
      <div>
        <h2 class="font-serif text-3xl font-bold text-slate-900 dark:text-white">Featured Vendors</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-2">Hand-picked vendors available for your dates.</p>
      </div>
      <NuxtLink
to="/vendors/search"
                class="text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1">
        View all vendors <span>→</span>
      </NuxtLink>
    </div>

    <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="n in 3" :key="n" class="bg-white dark:bg-slate-800 rounded-2xl h-96 border border-slate-100 dark:border-slate-700 animate-pulse"/>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
v-for="vendor in vendors" :key="vendor.id"
               class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
        <div class="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
          <NuxtImg
:src="vendor.cover_image_url || fallbackImage" :alt="vendor.display_name"
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               loading="lazy"/>

          <div class="absolute top-3 left-3 flex flex-wrap gap-2">
                <span
                    class="px-2.5 py-1 rounded-md bg-white/95 dark:bg-slate-900/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-sm">
                  {{ vendor.vendor_categories?.name || 'Vendor' }}
                </span>
          </div>
          <button
              class="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm">
            ♥
          </button>
        </div>

        <div class="p-5 flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-serif text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                {{ vendor.display_name }}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                <svg class="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path
stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ vendor.area || 'Accra' }}, {{ vendor.city || 'Ghana' }}
              </p>
            </div>
            <div v-if="vendor.is_verified" class="text-emerald-500 dark:text-emerald-400" title="Verified Vendor">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path
fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"/>
              </svg>
            </div>
          </div>

          <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
            {{ vendor.short_bio || 'Professional vendor available for bookings.' }}
          </p>

          <div class="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Starting from</p>
              <p class="text-slate-900 dark:text-white font-semibold">GH₵ {{ getStartingPrice(vendor).toLocaleString() }}</p>
            </div>
            <NuxtLink
:to="`/vendors/${vendor.slug}`"
                      class="inline-flex items-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium px-4 py-2 rounded-lg transition-colors">
              View Profile
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

type VendorRow = Database['public']['Tables']['vendors']['Row']

// Define the shape of the vendor object as it is actually passed (subset of fields)
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

defineProps<{
  vendors: FeaturedVendor[]
  pending: boolean
}>()

const fallbackImage = 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800'

const getStartingPrice = (vendor: FeaturedVendor) => {
  return vendor.starting_price || vendor.price_range_min || 0
}
</script>
