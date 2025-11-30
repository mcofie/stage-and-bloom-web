<template>
  <div class="font-sans bg-[#FDFCF8] dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen selection:bg-rose-100 selection:text-rose-900">

    <SiteNavbar/>

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
    <footer class="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-8 mt-auto relative overflow-hidden">

      <div class="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"/>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"/>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          <div class="md:col-span-4 space-y-6">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 bg-rose-600 rounded-lg flex items-center justify-center font-serif font-bold text-white shadow-lg shadow-rose-900/50">SB</div>
              <span class="font-serif text-xl font-bold tracking-tight">Stage & Bloom</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
              Reimagining events in Africa. We curate the finest vendors so you can plan with confidence and style.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div class="md:col-span-2 md:col-start-6">
            <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Explore</h4>
            <ul class="space-y-3 text-sm text-slate-400">
              <li><NuxtLink to="/vendors/search?categorySlug=wedding" class="hover:text-white hover:translate-x-1 transition-all inline-block">Weddings</NuxtLink></li>
              <li><NuxtLink to="/vendors/search?categorySlug=party" class="hover:text-white hover:translate-x-1 transition-all inline-block">Parties</NuxtLink></li>
              <li><NuxtLink to="/vendors/search?categorySlug=corporate" class="hover:text-white hover:translate-x-1 transition-all inline-block">Corporate</NuxtLink></li>
              <li><NuxtLink to="/vendors/search" class="hover:text-white hover:translate-x-1 transition-all inline-block">Browse All</NuxtLink></li>
            </ul>
          </div>

          <div class="md:col-span-2">
            <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Company</h4>
            <ul class="space-y-3 text-sm text-slate-400">
              <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</a></li>
              <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">For Vendors</a></li>
              <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">Contact</a></li>
              <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
            </ul>
          </div>

          <div class="md:col-span-3">
            <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Stay in the loop</h4>
            <p class="text-xs text-slate-400 mb-4">Get the latest vendor spotlights and planning tips delivered to your inbox.</p>
            <div class="flex flex-col gap-2">
              <input type="email" placeholder="Email address" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors" >
              <button class="bg-white text-slate-900 hover:bg-rose-50 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors shadow-lg shadow-white/10">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {{ new Date().getFullYear() }} Stage & Bloom. Crafted in Accra 🇬🇭</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-white transition-colors">Privacy</a>
            <a href="#" class="hover:text-white transition-colors">Terms</a>
            <a href="#" class="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
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