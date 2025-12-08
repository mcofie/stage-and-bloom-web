<template>
  <div class="font-sans bg-[#FDFCF8] dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen selection:bg-rose-100 selection:text-rose-900">



    <main class="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">

      <section class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {{ headingText }}
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ subheadingText }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-slate-400">{{ vendorsCountLabel }}</span>
          </div>
        </div>

        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4">
          <button
              v-if="filters.categorySlug"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-rose-200 dark:hover:border-rose-800 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              @click="clearFilter('category')"
          >
            {{ prettyCategory(filters.categorySlug) }}
            <span class="text-slate-400 text-[10px]">✕</span>
          </button>

          <button
              v-if="filters.city"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-rose-200 dark:hover:border-rose-800 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              @click="clearFilter('city')"
          >
            {{ filters.city }}
            <span class="text-slate-400 text-[10px]">✕</span>
          </button>

          <button
              v-if="isAiSearch"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 text-xs font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
              @click="clearAll"
          >
            Clear AI Search
            <span class="text-purple-400 text-[10px]">✕</span>
          </button>

          <button
              v-if="hasActiveFilters"
              class="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:underline ml-2 transition-colors"
              @click="clearAll"
          >
            Clear all
          </button>
        </div>
      </section>

      <section>
        <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div v-for="n in 6" :key="n" class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div class="h-56 bg-slate-100 dark:bg-slate-700 animate-pulse"/>
            <div class="p-5 space-y-3">
              <div class="h-5 bg-slate-100 dark:bg-slate-700 rounded w-3/4 animate-pulse"/>
              <div class="h-3 bg-slate-100 dark:bg-slate-700 rounded w-1/2 animate-pulse"/>
              <div class="space-y-2 pt-2">
                <div class="h-3 bg-slate-100 dark:bg-slate-700 rounded w-full animate-pulse"/>
                <div class="h-3 bg-slate-100 dark:bg-slate-700 rounded w-5/6 animate-pulse"/>
              </div>
            </div>
          </div>
        </div>

        <div
v-else-if="!pending && !vendors.length"
             class="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 border-dashed">
          <div
              class="mx-auto h-20 w-20 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-4xl shadow-sm">
            🔍
          </div>
          <h3 class="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">No vendors found</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
            We couldn't find any vendors matching your specific criteria. Try broadening your search or removing some
            filters.
          </p>
          <button
              class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 dark:shadow-rose-900/20"
              @click="clearAll"
          >
            View all vendors
          </button>
        </div>

        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
v-for="vendor in vendors" :key="vendor.id"
                   class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
              <img
:src="vendor.cover_image_url || fallbackImage" :alt="vendor.display_name"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   loading="lazy">

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

    </main>

  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useRoute, useRouter, useFetch, useSeoMeta} from '#imports'

// --- State ---
const route = useRoute()
const router = useRouter()

const isAiSearch = computed(() => !!route.query.q)
const queryText = computed(() => (route.query.q as string | undefined) || '')

const filters = computed(() => ({
  categorySlug: (route.query.categorySlug as string | undefined) || '',
  city: (route.query.city as string | undefined) || '',
  minBudget: (route.query.minBudget as string | undefined) || '',
  maxBudget: (route.query.maxBudget as string | undefined) || ''
}))

const categoryLabels: Record<string, string> = {
  decorator: 'Decor & Styling',
  caterer: 'Caterers & Food',
  photographer: 'Photographers',
  dj: 'DJs & Music',
  mc: 'MCs & Hosts',
  baker: 'Cakes & Desserts'
}

const prettyCategory = (slug?: string) => (slug ? categoryLabels[slug] || slug : '')

const seoTitle = computed(() => {
  if (isAiSearch.value) return `Search Results for "${queryText.value}" | Stage & Bloom`
  if (filters.value.categorySlug) return `${prettyCategory(filters.value.categorySlug)} in Accra | Stage & Bloom`
  return 'Search Event Vendors in Ghana | Stage & Bloom'
})

useSeoMeta({
  title: seoTitle,
  description: 'Browse our curated list of top-rated event professionals in Ghana. Find decorators, caterers, and more for your next event.',
  ogTitle: seoTitle,
  ogDescription: 'Browse our curated list of top-rated event professionals in Ghana. Find decorators, caterers, and more for your next event.',
})

const hasActiveFilters = computed(() => {
  return !!(filters.value.categorySlug || filters.value.city || filters.value.minBudget || isAiSearch.value)
})



// --- Text Helpers ---
const headingText = computed(() => {
  if (isAiSearch.value && queryText.value) return 'AI Recommendation'
  if (filters.value.categorySlug) return `${prettyCategory(filters.value.categorySlug)}`
  if (filters.value.city) return `Vendors in ${filters.value.city}`
  return 'All Vendors'
})

const subheadingText = computed(() => {
  if (isAiSearch.value) return `We found these matches for: "${queryText.value}"`
  const parts = []
  if (filters.value.city) parts.push(`located in ${filters.value.city}`)
  if (filters.value.maxBudget) parts.push(`within GH₵ ${Number(filters.value.maxBudget).toLocaleString()} budget`)
  if (parts.length === 0) return 'Explore our curated list of top-tier event professionals.'
  return `Showing vendors ${parts.join(' and ')}.`
})

// --- API Fetching ---
type ApiVendor = {
  id: string
  slug: string
  display_name: string
  city: string | null
  area: string | null
  starting_price: number | null
  price_range_min: number | null
  price_range_max: number | null
  short_bio: string | null
  cover_image_url: string | null
  is_verified: boolean
  vendor_categories: { slug: string; name: string } | null
}

const {data, pending} = await useFetch<{ vendors: ApiVendor[] }>(
    () => (isAiSearch.value ? '/api/vendors/search-llm' : '/api/vendors/search'),
    {
      method: 'POST',
      body: computed(() =>
          isAiSearch.value
              ? {query: queryText.value}
              : {
                categorySlug: filters.value.categorySlug || undefined,
                city: filters.value.city || undefined,
                maxBudget: filters.value.maxBudget ? Number(filters.value.maxBudget) : undefined
              }
      ),
      watch: [() => route.query]
    }
)

const vendors = computed<ApiVendor[]>(() => data.value?.vendors ?? [])

const vendorsCountLabel = computed(() => {
  if (pending.value) return 'Searching...'
  const count = vendors.value.length
  return `${count} result${count !== 1 ? 's' : ''}`
})

const fallbackImage = 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800'

// Renamed to match template usage and consistency with other files
const getStartingPrice = (vendor: ApiVendor): number => {
  return vendor.starting_price || vendor.price_range_min || vendor.price_range_max || 0
}

const clearFilter = (key: 'category' | 'city') => {
  const newQuery = {...route.query}
  if (key === 'category') delete newQuery.categorySlug
  if (key === 'city') delete newQuery.city
  router.push({path: '/vendors/search', query: newQuery})
}

const clearAll = () => {
  router.push({path: '/vendors/search'})
}
</script>