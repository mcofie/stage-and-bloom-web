<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen selection:bg-rose-100 selection:text-rose-900">

    <header
        class="fixed top-0 w-full z-50 border-b border-slate-200/50 bg-white/90 backdrop-blur-md transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
              class="relative flex items-center justify-center h-9 w-9 bg-rose-600 text-white font-serif font-bold text-lg rounded-xl shadow-lg shadow-rose-200 group-hover:scale-105 transition-transform">
            SB
          </div>
          <div class="leading-none hidden sm:block">
            <h1 class="font-serif font-bold text-lg text-slate-900 tracking-tight">Stage &amp; Bloom</h1>
          </div>
        </NuxtLink>

        <div class="flex-1 max-w-xl mx-auto px-4">
          <button
              @click="toggleSearchPanel"
              class="w-full flex items-center justify-between gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-sm px-4 py-2 rounded-full transition-colors text-left"
          >
            <span v-if="isAiSearch">AI Search: "{{ queryText }}"</span>
            <span v-else-if="filters.categorySlug || filters.city">
              {{ filters.categorySlug ? categoryLabels[filters.categorySlug] : 'All Vendors' }}
              {{ filters.city ? `in ${filters.city}` : '' }}
            </span>
            <span v-else>Search vendors, locations, or services...</span>

            <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
            </svg>
          </button>
        </div>

        <nav class="flex items-center gap-4">
          <NuxtLink to="/"
                    class="text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors hidden sm:block">
            Home
          </NuxtLink>
          <div class="h-4 w-px bg-slate-200 hidden sm:block"></div>
          <NuxtLink to="/auth/sign-in" class="text-sm font-medium text-slate-900 hover:text-rose-600 transition-colors">
            Log in
          </NuxtLink>
        </nav>
      </div>

      <div v-show="isSearchPanelOpen"
           class="border-t border-slate-100 bg-white/95 backdrop-blur-xl shadow-xl absolute w-full left-0 top-16 z-40 transition-all duration-300 ease-in-out">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6">

          <div class="flex justify-center mb-6">
            <div class="bg-slate-100/80 p-1 rounded-xl inline-flex">
              <button
                  @click="mode = 'filters'"
                  class="px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  :class="mode === 'filters' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
              >
                Filters
              </button>
              <button
                  @click="mode = 'ai'"
                  class="px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                  :class="mode === 'ai' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
              >
                <span class="text-xs">✨</span> AI Planner
              </button>
            </div>
          </div>

          <div v-if="mode === 'filters'" class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div class="md:col-span-4 space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
              <select v-model="selectedCategory"
                      class="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                <option value="">All Categories</option>
                <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
              </select>
            </div>
            <div class="md:col-span-4 space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Location</label>
              <input v-model="location" type="text" placeholder="e.g. East Legon"
                     class="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"/>
            </div>
            <div class="md:col-span-2 space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Max Price</label>
              <input v-model="budgetPerVendor" type="number" placeholder="5000"
                     class="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"/>
            </div>
            <div class="md:col-span-2">
              <button @click="runFilterSearch"
                      class="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 rounded-xl transition-colors text-sm">
                Search
              </button>
            </div>
          </div>

          <div v-else class="max-w-2xl mx-auto">
            <div class="relative">
              <textarea
                  v-model="aiPrompt"
                  rows="2"
                  class="w-full bg-slate-50 border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none pr-24"
                  placeholder="Describe your event (e.g. 'I need a photographer for a wedding in Accra under 10k')"
              ></textarea>
              <button
                  @click="runAISearch"
                  class="absolute right-2 bottom-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors"
              >
                Generate
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>

    <main class="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">

      <section class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              {{ headingText }}
            </h1>
            <p class="text-sm text-slate-500 mt-1">{{ subheadingText }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-slate-400">{{ vendorsCountLabel }}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4" v-if="hasActiveFilters">
          <button
              v-if="filters.categorySlug"
              @click="clearFilter('category')"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:border-rose-200 hover:text-rose-600 transition-colors"
          >
            {{ prettyCategory(filters.categorySlug) }}
            <span class="text-slate-400 text-[10px]">✕</span>
          </button>

          <button
              v-if="filters.city"
              @click="clearFilter('city')"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:border-rose-200 hover:text-rose-600 transition-colors"
          >
            {{ filters.city }}
            <span class="text-slate-400 text-[10px]">✕</span>
          </button>

          <button
              v-if="isAiSearch"
              @click="clearAll"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors"
          >
            Clear AI Search
            <span class="text-purple-400 text-[10px]">✕</span>
          </button>

          <button
              v-if="hasActiveFilters"
              @click="clearAll"
              class="text-xs text-slate-400 hover:text-rose-600 hover:underline ml-2 transition-colors"
          >
            Clear all
          </button>
        </div>
      </section>

      <section>
        <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div v-for="n in 6" :key="n" class="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div class="h-56 bg-slate-100 animate-pulse"></div>
            <div class="p-5 space-y-3">
              <div class="h-5 bg-slate-100 rounded w-3/4 animate-pulse"></div>
              <div class="h-3 bg-slate-100 rounded w-1/2 animate-pulse"></div>
              <div class="space-y-2 pt-2">
                <div class="h-3 bg-slate-100 rounded w-full animate-pulse"></div>
                <div class="h-3 bg-slate-100 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="!pending && !vendors.length"
             class="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
          <div
              class="mx-auto h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-4xl shadow-sm">
            🔍
          </div>
          <h3 class="text-xl font-serif font-bold text-slate-900 mb-2">No vendors found</h3>
          <p class="text-slate-500 max-w-md mx-auto mb-8">
            We couldn't find any vendors matching your specific criteria. Try broadening your search or removing some
            filters.
          </p>
          <button
              @click="clearAll"
              class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
          >
            View all vendors
          </button>
        </div>

        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <article
              v-for="vendor in vendors"
              :key="vendor.id"
              class="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-rose-100 transition-all duration-300 flex flex-col"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                  :src="vendor.cover_image_url || fallbackImage"
                  :alt="vendor.display_name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
              />

              <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

              <div class="absolute top-3 left-3 flex gap-2">
                <span
                    class="px-2 py-1 rounded-md bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                  {{ vendor.vendor_categories?.name || 'Service' }}
                </span>
              </div>

              <div v-if="vendor.is_verified"
                   class="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/90 backdrop-blur-sm">
                <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"/>
                </svg>
                Verified
              </div>
            </div>

            <div class="p-5 flex-1 flex flex-col">
              <div class="mb-3">
                <h3 class="font-serif text-lg font-bold text-slate-900 leading-tight group-hover:text-rose-600 transition-colors">
                  {{ vendor.display_name }}
                </h3>
                <div class="flex items-center gap-1 mt-1.5 text-xs text-slate-500">
                  <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{{ vendor.area || 'Accra' }}, {{ vendor.city || 'Ghana' }}</span>
                </div>
              </div>

              <p class="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                {{ vendor.short_bio || 'Professional vendor available for your event needs.' }}
              </p>

              <div class="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Starts from</span>
                  <span class="text-slate-900 font-bold">GH₵ {{ startingFrom(vendor).toLocaleString() }}</span>
                </div>

                <NuxtLink
                    :to="`/vendors/${vendor.slug}`"
                    class="text-sm font-medium text-rose-600 hover:text-rose-700 hover:underline decoration-2 underline-offset-4"
                >
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
import {computed, ref, watch} from 'vue'
import {useRoute, useRouter, useFetch} from '#imports'

// --- State ---
const route = useRoute()
const router = useRouter()
const isSearchPanelOpen = ref(false)

const isAiSearch = computed(() => !!route.query.q)
const queryText = computed(() => (route.query.q as string | undefined) || '')

const filters = computed(() => ({
  categorySlug: (route.query.categorySlug as string | undefined) || '',
  city: (route.query.city as string | undefined) || '',
  minBudget: (route.query.minBudget as string | undefined) || '',
  maxBudget: (route.query.maxBudget as string | undefined) || ''
}))

const hasActiveFilters = computed(() => {
  return !!(filters.value.categorySlug || filters.value.city || filters.value.minBudget || isAiSearch.value)
})

// --- Toggle Panel ---
const toggleSearchPanel = () => {
  isSearchPanelOpen.value = !isSearchPanelOpen.value
}

// --- Categories Logic ---
type VendorCategory = { slug: string; name: string }
const categoryLabels: Record<string, string> = {
  decorator: 'Decor & Styling',
  caterer: 'Caterers & Food',
  photographer: 'Photographers',
  dj: 'DJs & Music',
  mc: 'MCs & Hosts',
  baker: 'Cakes & Desserts'
}
const categories: VendorCategory[] = Object.entries(categoryLabels).map(([slug, name]) => ({slug, name}))

const prettyCategory = (slug?: string) => (slug ? categoryLabels[slug] || slug : '')

// --- Local Form State ---
const mode = ref<'filters' | 'ai'>('filters')
const selectedCategory = ref<string>(filters.value.categorySlug)
const location = ref<string>(filters.value.city)
const budgetPerVendor = ref<number | ''>(filters.value.maxBudget ? Number(filters.value.maxBudget) : '')
const aiPrompt = ref<string>(queryText.value)

// Sync form with URL on load/change
watch(() => route.query, () => {
  selectedCategory.value = filters.value.categorySlug
  location.value = filters.value.city
  budgetPerVendor.value = filters.value.maxBudget ? Number(filters.value.maxBudget) : ''
  aiPrompt.value = queryText.value
  isSearchPanelOpen.value = false // Close panel on search
}, {immediate: true})

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

const {data, pending, error, refresh} = await useFetch(
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

const vendors = computed<ApiVendor[]>(() => (data.value as any)?.vendors ?? [])

const vendorsCountLabel = computed(() => {
  if (pending.value) return 'Searching...'
  const count = vendors.value.length
  return `${count} result${count !== 1 ? 's' : ''}`
})

const fallbackImage = 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800'

const startingFrom = (vendor: ApiVendor): number => {
  return vendor.starting_price || vendor.price_range_min || vendor.price_range_max || 0
}

// --- Actions ---
const runFilterSearch = () => {
  router.push({
    path: '/vendors/search',
    query: {
      categorySlug: selectedCategory.value || undefined,
      city: location.value || undefined,
      maxBudget: budgetPerVendor.value ? String(budgetPerVendor.value) : undefined
    }
  })
}

const runAISearch = () => {
  const q = aiPrompt.value.trim()
  if (!q) return
  router.push({path: '/vendors/search', query: {q}})
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