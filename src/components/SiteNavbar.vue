<template>
  <header
      class="fixed top-0 w-full z-50 transition-all duration-300 border-b"
      :class="headerClasses"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">

      <NuxtLink to="/" class="flex items-center gap-3 group shrink-0">
        <div
            class="relative flex items-center justify-center h-10 w-10 bg-rose-600 text-white font-serif font-bold text-xl rounded-xl shadow-lg shadow-rose-200 group-hover:scale-105 transition-transform">
          SB
        </div>
        <div class="leading-none hidden sm:block">
          <h1 class="font-serif font-bold text-lg tracking-tight" :class="textColorClass">Stage &amp; Bloom</h1>
          <p class="text-[10px] uppercase tracking-widest mt-0.5 opacity-80" :class="textColorClass">The Event
            Collective</p>
        </div>
      </NuxtLink>

      <div class="flex-1 flex justify-center max-w-xl mx-auto px-4">

        <nav v-if="isHome && !isScrolled" class="hidden md:flex items-center gap-8 text-sm font-medium" :class="textColorClass">
          <a href="#vendors" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Find Vendors</a>
          <a href="#how-it-works" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">How it Works</a>
          <NuxtLink to="/vendors/search" class="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">Browse All</NuxtLink>
        </nav>

        <button
            v-else
            class="w-full flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm px-4 py-2.5 rounded-full transition-all text-left group"
            @click="toggleSearchPanel"
        >
          <span class="truncate">
             <span v-if="currentQuery.q" class="text-slate-800 dark:text-white font-medium">AI: "{{ currentQuery.q }}"</span>
             <span
v-else-if="currentQuery.categorySlug"
                   class="text-slate-800 dark:text-white font-medium">{{ formatCategory(currentQuery.categorySlug) }}</span>
             <span v-else>Search vendors, locations...</span>
          </span>
          <svg
class="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path
stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-4 shrink-0">
        <div
class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
          <span class="text-lg">🇬🇭</span>
          <select class="bg-transparent text-xs font-medium focus:outline-none cursor-pointer dark:bg-slate-800">
            <option value="gh" class="text-slate-800 dark:text-white">Ghana</option>
            <option value="ke" class="text-slate-800 dark:text-white">Kenya</option>
          </select>
        </div>

        <button
            class="p-2 rounded-full transition-colors relative text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="isPinnedDrawerOpen = true"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span
              v-if="vendors.length > 0"
              class="absolute top-0 right-0 h-4 w-4 bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900"
          >
            {{ vendors.length }}
          </span>
        </button>

        <button
            class="p-2 rounded-full transition-colors text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="toggleTheme"
        >
          <span v-if="colorMode.value === 'dark'" class="text-lg">🌞</span>
          <span v-else class="text-lg">🌙</span>
        </button>

        <NuxtLink
to="/for-vendors"
                  class="hidden sm:inline-flex rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg transition-all">
          List your business
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
            class="md:hidden p-2 rounded-lg transition-colors text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="isMobileMenuOpen = true"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[60] bg-white dark:bg-slate-900 flex flex-col">
        <div class="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-2">
             <div class="h-8 w-8 bg-rose-600 rounded-lg flex items-center justify-center font-serif font-bold text-white">SB</div>
             <span class="font-serif font-bold text-lg text-slate-900 dark:text-white">Stage & Bloom</span>
          </div>
          <button
              class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              @click="isMobileMenuOpen = false"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-8">
          <nav class="flex flex-col gap-6 text-lg font-medium text-slate-900 dark:text-white">
            <NuxtLink to="/" class="hover:text-rose-600 dark:hover:text-rose-400" @click="isMobileMenuOpen = false">Home</NuxtLink>
            <NuxtLink to="/vendors/search" class="hover:text-rose-600 dark:hover:text-rose-400" @click="isMobileMenuOpen = false">Find Vendors</NuxtLink>
            <a href="#how-it-works" class="hover:text-rose-600 dark:hover:text-rose-400" @click="isMobileMenuOpen = false">How it Works</a>
            <NuxtLink to="/for-vendors" class="hover:text-rose-600 dark:hover:text-rose-400" @click="isMobileMenuOpen = false">For Vendors</NuxtLink>
          </nav>

          <div class="pt-8 border-t border-slate-100 dark:border-slate-800">
            <NuxtLink
                to="/for-vendors"
                class="w-full flex items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all"
                @click="isMobileMenuOpen = false"
            >
              List your business
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>

    <div
v-show="isSearchPanelOpen"
         class="border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl absolute w-full left-0 top-20 z-40 transition-all duration-300 ease-in-out">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        <div class="flex justify-center mb-6">
          <div class="bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl inline-flex">
            <button
class="px-6 py-2 rounded-lg text-sm font-medium transition-all" :class="mode === 'filters' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'"
                    @click="mode = 'filters'">Filters
            </button>
            <button
class="px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                    :class="mode === 'ai' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'"
                    @click="mode = 'ai'">
              <span>✨</span> AI Planner
            </button>
          </div>
        </div>

        <div v-if="mode === 'filters'" class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div class="md:col-span-4 space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Category</label>
            <select
v-model="form.categorySlug"
                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-sm dark:text-white focus:ring-2 focus:ring-rose-500/20">
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
            </select>
          </div>
          <div class="md:col-span-4 space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Location</label>
            <input
v-model="form.city" type="text" placeholder="e.g. East Legon"
                   class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-sm dark:text-white focus:ring-2 focus:ring-rose-500/20">
          </div>
          <div class="md:col-span-2 space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Max Budget</label>
            <input
v-model="form.maxBudget" type="number" placeholder="5000"
                   class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 text-sm dark:text-white focus:ring-2 focus:ring-rose-500/20">
          </div>
          <div class="md:col-span-2">
            <button
class="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-xl transition-colors text-sm shadow-lg shadow-rose-200 dark:shadow-rose-900/20"
                    @click="runSearch">
              Search
            </button>
          </div>
        </div>

        <div v-else class="max-w-2xl mx-auto relative">
          <textarea
v-model="form.q" rows="2"
                    class="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-purple-500/20 resize-none pr-24"
                    placeholder="Describe your event..."/>
          <button
class="absolute right-2 bottom-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors"
                  @click="runSearch">
            Generate
          </button>
        </div>
      </div>
    </div>
    <PinnedVendorsDrawer :is-open="isPinnedDrawerOpen" @close="isPinnedDrawerOpen = false" />
  </header>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from 'vue'
import {useRoute, useRouter} from '#imports'
import { usePinnedVendors } from '~/composables/usePinnedVendors'
import PinnedVendorsDrawer from '~/components/PinnedVendorsDrawer.vue'

import type { LocationQuery, LocationQueryValue } from 'vue-router'

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()

const { vendors } = usePinnedVendors()
const isPinnedDrawerOpen = ref(false)

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// --- State ---
const isSearchPanelOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const mode = ref<'filters' | 'ai'>('filters')

const form = ref({
  categorySlug: '',
  city: '',
  maxBudget: '',
  q: ''
})

// --- Computed ---
const isHome = computed(() => route.path === '/' || route.path === '/index')

const headerClasses = computed(() => {
  // If on home and not scrolled: Transparent
  if (isHome.value && !isScrolled.value && !isSearchPanelOpen.value) {
    return 'bg-transparent border-transparent'
  }
  // Otherwise: White & Blurred
  return 'bg-white dark:bg-slate-900/95 backdrop-blur-md border-slate-200/50 dark:border-slate-700/50 shadow-sm'
})

const textColorClass = computed(() => {
  return 'text-slate-900 dark:text-white'
})

const currentQuery = computed(() => route.query)

const categories = [
  {slug: 'decorator', name: 'Decor & Styling'},
  {slug: 'caterer', name: 'Caterers & Food'},
  {slug: 'photographer', name: 'Photographers'},
  {slug: 'dj', name: 'DJs & Music'},
  {slug: 'mc', name: 'MCs & Hosts'},
  {slug: 'baker', name: 'Cakes & Desserts'}
]

// --- Actions ---
const toggleSearchPanel = () => isSearchPanelOpen.value = !isSearchPanelOpen.value

const formatCategory = (slug: string | LocationQueryValue[] | null | undefined) => {
  const s = Array.isArray(slug) ? slug[0] : slug
  if (!s) return ''
  return categories.find(c => c.slug === s)?.name || s
}

const runSearch = () => {
  isSearchPanelOpen.value = false
  const query: Record<string, string> = {}

  if (mode.value === 'ai' && form.value.q) {
    query.q = form.value.q
  } else {
    if (form.value.categorySlug) query.categorySlug = form.value.categorySlug
    if (form.value.city) query.city = form.value.city
    if (form.value.maxBudget) query.maxBudget = form.value.maxBudget
  }

  router.push({path: '/vendors/search', query})
}

// --- Scroll & Watchers ---
const handleScroll = () => {
  if (import.meta.client) {
    isScrolled.value = window.scrollY > 50
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// Sync URL to Form
watch(() => route.query, (newQ: LocationQuery) => {
  form.value.categorySlug = (newQ.categorySlug as string) || ''
  form.value.city = (newQ.city as string) || ''
  form.value.maxBudget = (newQ.maxBudget as string) || ''
  form.value.q = (newQ.q as string) || ''
  isSearchPanelOpen.value = false // Close on navigate
}, {immediate: true})

// Lock body scroll when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})


</script>