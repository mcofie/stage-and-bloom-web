<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 space-y-8 relative z-10">
        <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-medium tracking-wide">
              <span class="relative flex h-2 w-2">
                <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"/>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"/>
              </span>
          The curated marketplace for events
        </div>

        <h1 class="font-serif text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.1] font-medium text-slate-900 dark:text-white">
          Curate your <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500 italic pr-2">perfect moment.</span>
        </h1>

        <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
          Discover Accra’s finest decorators, caterers, and creatives. Plugged directly into WhatsApp for seamless
          planning.
        </p>

        <div class="flex items-center gap-6 pt-2">
          <div class="flex -space-x-3">
            <NuxtImg
class="h-10 w-10 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                 src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                 alt="User"/>
            <NuxtImg
class="h-10 w-10 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                 src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64"
                 alt="User"/>
            <NuxtImg
class="h-10 w-10 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64"
                 alt="User"/>
            <div
                class="h-10 w-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
              +2k
            </div>
          </div>
          <div class="text-sm">
            <p class="font-bold text-slate-900 dark:text-white">Trusted by planners</p>
            <div class="flex text-yellow-400 text-xs">★★★★★</div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-6 relative">
        <div
            class="absolute -inset-4 bg-gradient-to-tr from-rose-200 to-orange-100 dark:from-rose-900/20 dark:to-orange-900/20 rounded-[3rem] blur-2xl opacity-60 -z-10"/>

        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden relative">
          <div class="flex border-b border-slate-100 dark:border-slate-700">
            <button
class="flex-1 py-4 text-sm font-medium transition-colors relative" :class="mode === 'filters' ? 'text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-900/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'"
                    @click="mode = 'filters'">
              Quick Search
              <div v-if="mode === 'filters'" class="absolute bottom-0 inset-x-0 h-0.5 bg-rose-600 dark:bg-rose-500"/>
            </button>
            <button
class="flex-1 py-4 text-sm font-medium transition-colors relative flex items-center justify-center gap-2"
                    :class="mode === 'ai' ? 'text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'"
                    @click="mode = 'ai'">
              <span class="text-lg">✨</span> AI Planner
              <div v-if="mode === 'ai'" class="absolute bottom-0 inset-x-0 h-0.5 bg-purple-600 dark:bg-purple-500"/>
            </button>
          </div>

          <div class="p-6 md:p-8">
            <div v-if="mode === 'filters'" class="space-y-5">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Service</label>
                  <select
v-model="selectedCategory"
                          class="w-full bg-slate-50 dark:bg-slate-900 border-0 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-rose-500/20 transition-shadow cursor-pointer">
                    <option value="">All Vendors</option>
                    <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
                  </select>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Location</label>
                  <input
v-model="location" type="text" placeholder="e.g. East Legon"
                         class="w-full bg-slate-50 dark:bg-slate-900 border-0 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500/20 transition-shadow">
                </div>
              </div>

              <div class="space-y-3 pt-2">
                <div class="flex justify-between text-xs font-medium">
                  <span class="text-slate-500 dark:text-slate-400">Budget Range (GHS)</span>
                  <span class="text-rose-600 dark:text-rose-400">Up to {{ budgetPerVendor.toLocaleString() }}</span>
                </div>
                <input
v-model.number="budgetPerVendor" type="range" min="500" max="20000" step="500"
                       class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600 dark:accent-rose-500">
              </div>

              <button
                  :disabled="isSearching"
                  class="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-rose-200 dark:shadow-rose-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  @click="runFilterSearch"
              >
                <svg
                    v-if="isSearching"
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path
class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>{{ isSearching ? 'Searching...' : 'Search Vendors' }}</span>
              </button>
            </div>

            <div v-else class="space-y-5">
              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Describe your dream
                  event</label>
                <textarea
v-model="aiPrompt" rows="3"
                          class="w-full bg-slate-50 dark:bg-slate-900 border-0 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/20 transition-shadow resize-none"
                          placeholder="I need a photographer and cake for a baby shower in Osu next Saturday. Budget is around 5000 GHS."/>
              </div>
              <button
                  :disabled="isSearching"
                  class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-purple-200 dark:shadow-purple-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  @click="runAISearch"
              >
                <svg
                    v-if="isSearching"
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path
class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>{{ isSearching ? 'Generating Plan...' : 'Generate Plan with AI' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'

const router = useRouter()
const mode = ref<'filters' | 'ai'>('filters')
const selectedCategory = ref('')
const location = ref('')
const budgetPerVendor = ref(5000)
const aiPrompt = ref('')
const isSearching = ref(false)

const categories = [
  {slug: 'decorator', name: 'Decor & Styling'},
  {slug: 'caterer', name: 'Caterers & Food'},
  {slug: 'photographer', name: 'Photographers'},
  {slug: 'dj', name: 'DJs & Music'},
  {slug: 'mc', name: 'MCs & Hosts'},
  {slug: 'baker', name: 'Cakes & Desserts'}
]

const runFilterSearch = async () => {
  isSearching.value = true
  await router.push({
    path: '/vendors/search',
    query: {
      categorySlug: selectedCategory.value || undefined,
      city: location.value || undefined,
      minBudget: budgetPerVendor.value ? String(budgetPerVendor.value) : undefined
    }
  })
}

const runAISearch = async () => {
  if (!aiPrompt.value.trim()) return

  isSearching.value = true
  await router.push({
    path: '/vendors/search',
    query: {q: aiPrompt.value}
  })
}
</script>
