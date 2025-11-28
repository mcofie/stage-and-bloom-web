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

        <nav v-if="isHome" class="hidden md:flex items-center gap-8 text-sm font-medium" :class="textColorClass">
          <a href="#vendors" class="hover:text-rose-600 transition-colors">Find Vendors</a>
          <a href="#how-it-works" class="hover:text-rose-600 transition-colors">How it Works</a>
          <NuxtLink to="/vendors/search" class="hover:text-rose-600 transition-colors">Browse All</NuxtLink>
        </nav>

        <button
            v-else
            @click="toggleSearchPanel"
            class="w-full flex items-center justify-between gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-sm px-4 py-2.5 rounded-full transition-all text-left group"
        >
          <span class="truncate">
             <span v-if="currentQuery.q" class="text-slate-800 font-medium">AI: "{{ currentQuery.q }}"</span>
             <span v-else-if="currentQuery.categorySlug"
                   class="text-slate-800 font-medium">{{ formatCategory(currentQuery.categorySlug) }}</span>
             <span v-else>Search vendors, locations...</span>
          </span>
          <svg class="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>

      <div class="flex items-center gap-4 shrink-0">
        <div class="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border"
             :class="isHome && !isScrolled ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'">
          <span class="text-lg">🇬🇭</span>
          <select class="bg-transparent text-xs font-medium focus:outline-none cursor-pointer">
            <option value="gh" class="text-slate-800">Ghana</option>
            <option value="ke" class="text-slate-800">Kenya</option>
          </select>
        </div>

        <NuxtLink to="/for-vendors"
                  class="hidden sm:inline-flex rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-slate-800 hover:shadow-lg transition-all">
          List your business
        </NuxtLink>
      </div>
    </div>

    <div v-show="isSearchPanelOpen"
         class="border-t border-slate-100 bg-white/95 backdrop-blur-xl shadow-xl absolute w-full left-0 top-20 z-40 transition-all duration-300 ease-in-out">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        <div class="flex justify-center mb-6">
          <div class="bg-slate-100/80 p-1 rounded-xl inline-flex">
            <button @click="mode = 'filters'" class="px-6 py-2 rounded-lg text-sm font-medium transition-all"
                    :class="mode === 'filters' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'">Filters
            </button>
            <button @click="mode = 'ai'"
                    class="px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                    :class="mode === 'ai' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500'">
              <span>✨</span> AI Planner
            </button>
          </div>
        </div>

        <div v-if="mode === 'filters'" class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div class="md:col-span-4 space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
            <select v-model="form.categorySlug"
                    class="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-rose-500/20">
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
            </select>
          </div>
          <div class="md:col-span-4 space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Location</label>
            <input v-model="form.city" type="text" placeholder="e.g. East Legon"
                   class="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-rose-500/20"/>
          </div>
          <div class="md:col-span-2 space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Max Budget</label>
            <input v-model="form.maxBudget" type="number" placeholder="5000"
                   class="w-full bg-slate-50 border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-rose-500/20"/>
          </div>
          <div class="md:col-span-2">
            <button @click="runSearch"
                    class="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-xl transition-colors text-sm shadow-lg shadow-rose-200">
              Search
            </button>
          </div>
        </div>

        <div v-else class="max-w-2xl mx-auto relative">
          <textarea v-model="form.q" rows="2"
                    class="w-full bg-slate-50 border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500/20 resize-none pr-24"
                    placeholder="Describe your event..."></textarea>
          <button @click="runSearch"
                  class="absolute right-2 bottom-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition-colors">
            Generate
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from 'vue'
import {useRoute, useRouter} from '#imports'

const route = useRoute()
const router = useRouter()

// --- State ---
const isSearchPanelOpen = ref(false)
const isScrolled = ref(false)
const mode = ref<'filters' | 'ai'>('filters')

const form = ref({
  categorySlug: '',
  city: '',
  maxBudget: '',
  q: ''
})

// --- Computed ---
const isHome = computed(() => route.path === '/')

const headerClasses = computed(() => {
  // If on home and not scrolled: Transparent
  if (isHome.value && !isScrolled.value && !isSearchPanelOpen.value) {
    return 'bg-transparent border-transparent'
  }
  // Otherwise: White & Blurred
  return 'bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm'
})

const textColorClass = computed(() => {
  return (isHome.value && !isScrolled.value && !isSearchPanelOpen.value) ? 'text-white' : 'text-slate-900'
})

const currentQuery = computed(() => route.query as any)

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

const formatCategory = (slug: string) => categories.find(c => c.slug === slug)?.name || slug

const runSearch = () => {
  isSearchPanelOpen.value = false
  const query: any = {}

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
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// Sync URL to Form
watch(() => route.query, (newQ: any) => {
  form.value.categorySlug = newQ.categorySlug || ''
  form.value.city = newQ.city || ''
  form.value.maxBudget = newQ.maxBudget || ''
  form.value.q = newQ.q || ''
  isSearchPanelOpen.value = false // Close on navigate
}, {immediate: true})

</script>