<template>
  <div class="min-h-screen bg-[#FDFCF8] dark:bg-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900 transition-colors duration-300">


    <div v-if="!currentEvent" class="pt-32 pb-20 text-center max-w-md mx-auto px-4">
      <div class="text-6xl mb-6">🥀</div>
      <h1 class="font-serif text-3xl font-bold text-slate-900 dark:text-white">Occasion not found</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-3 mb-8">We couldn't find the event type you are looking for.</p>
      <NuxtLink
to="/"
                class="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-900 dark:text-white">
        Return Home
      </NuxtLink>
    </div>

    <div v-else>
      <header class="relative h-[75vh] min-h-[600px] flex items-end justify-center overflow-hidden pb-20">
        <div class="absolute inset-0 z-0">
          <img
              :src="currentEvent.heroImage"
              :alt="currentEvent.title"
              class="w-full h-full object-cover transform scale-105 animate-slow-zoom"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/30"/>
        </div>

        <div class="relative z-10 text-center max-w-5xl mx-auto px-4 w-full animate-fade-in-up">
          <div
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
            <span class="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"/>
            <span class="text-[10px] font-bold uppercase tracking-[0.25em]">Curated Collection</span>
          </div>

          <h1 class="font-serif text-6xl md:text-8xl font-bold text-white mb-6 leading-[0.9] tracking-tight drop-shadow-lg">
            {{ currentEvent.title }}
          </h1>

          <p class="text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-light mb-10 text-shadow-sm">
            {{ currentEvent.description }}
          </p>

          <button class="animate-bounce text-white/50 hover:text-white transition-colors" @click="scrollToContent">
            <svg class="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </button>
        </div>
      </header>

      <main id="content" class="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-24 pb-24">

        <section>
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 border border-slate-100 dark:border-slate-700">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Essential Vendors</p>
            <div class="flex flex-wrap justify-center gap-3 md:gap-4">
              <NuxtLink
                  v-for="cat in currentEvent.recommendedCategories"
                  :key="cat.slug"
                  :to="`/vendors/search?categorySlug=${cat.slug}`"
                  class="group flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-600 hover:border-rose-200 dark:hover:border-rose-500 hover:shadow-md transition-all duration-300"
              >
                <span class="text-2xl group-hover:scale-110 transition-transform duration-300">{{ cat.icon }}</span>
                <div class="text-left">
                  <span class="block text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{{
                      cat.name
                    }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </section>

        <section>
          <div class="flex items-end justify-between mb-10 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 class="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Top Rated Vendors</h2>
              <p class="text-slate-500 dark:text-slate-400 mt-2 text-lg font-light">Hand-picked professionals for your {{
                  currentEvent.slug
                }}.</p>
            </div>
            <NuxtLink
to="/vendors/search"
                      class="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-all">
              View All Vendors <span>→</span>
            </NuxtLink>
          </div>

          <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
v-for="n in 3" :key="n"
                 class="bg-white dark:bg-slate-800 rounded-2xl h-[450px] border border-slate-100 dark:border-slate-700 animate-pulse"/>
          </div>

          <div
v-else-if="filteredVendors.length === 0"
               class="py-20 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <p class="text-slate-400 text-lg">No featured vendors found for this category yet.</p>
            <button class="mt-4 text-rose-600 font-medium hover:underline" @click="router.push('/vendors/search')">
              Browse all categories
            </button>
          </div>

          <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
v-for="(vendor, index) in filteredVendors" :key="vendor.id"
                     class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-rose-900/5 dark:hover:shadow-rose-900/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col"
                     :style="{ animationDelay: `${index * 100}ms` }">
              <div class="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img
:src="vendor.cover_image_url || fallbackImage" :alt="vendor.display_name"
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     loading="lazy">

                <div class="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span
                      class="px-2.5 py-1 rounded-md bg-white/95 dark:bg-slate-900/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-sm">
                    {{ Array.isArray(vendor.vendor_categories) ? vendor.vendor_categories[0]?.name : 'Vendor' }}
                  </span>
                </div>
                <button
                    class="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm">
                  ♥
                </button>
              </div>

              <div class="p-6 flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                      {{ vendor.display_name }}
                    </h3>
                    <p class="text-xs text-slate-500 flex items-center gap-1 mt-1">
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
                  <div v-if="vendor.is_verified" class="text-emerald-500" title="Verified Vendor">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path
fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>

                <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-6 leading-relaxed">
                  {{ vendor.short_bio || 'Professional vendor available for bookings.' }}
                </p>

                <div class="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Starting from</p>
                    <p class="text-slate-900 dark:text-white font-serif font-semibold text-lg">GH₵
                      {{ getStartingPrice(vendor).toLocaleString() }}</p>
                  </div>
                  <NuxtLink
:to="`/vendors/${vendor.slug}`"
                            class="inline-flex items-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium px-5 py-2.5 rounded-lg transition-all hover:shadow-lg">
                    View Profile
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>

          <div class="mt-8 text-center sm:hidden">
            <NuxtLink
to="/vendors/search"
                      class="inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              View All Vendors
            </NuxtLink>
          </div>
        </section>

        <section class="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-white shadow-2xl">
          <div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl"/>
          <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"/>

          <div class="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-8">
              <div>
                <span class="text-rose-400 font-bold uppercase tracking-widest text-xs">Expert Guidance</span>
                <h2 class="font-serif text-4xl md:text-5xl font-bold mt-3 leading-tight">
                  Planning a {{ currentEvent.slug }} <br> doesn't have to be chaos.
                </h2>
              </div>

              <div class="space-y-5 text-slate-300 text-lg leading-relaxed">
                <p>
                  Organizing a {{ currentEvent.slug }} comes with unique challenges.
                  We've curated vendors who specialize specifically in this area to ensure your vision comes to life
                  seamlessly.
                </p>
                <ul class="space-y-3 pt-2">
                  <li class="flex items-center gap-3">
                    <div
                        class="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 text-xs">
                      ✓
                    </div>
                    <span>Verified professionals with track records</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <div
                        class="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 text-xs">
                      ✓
                    </div>
                    <span>Transparent pricing (no hidden fees)</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <div
                        class="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 text-xs">
                      ✓
                    </div>
                    <span>Direct WhatsApp integration</span>
                  </li>
                </ul>
              </div>

              <div class="pt-2">
                <button
                    class="group inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl text-sm font-bold hover:bg-rose-50 transition-all shadow-lg hover:shadow-rose-500/20"
                    @click="triggerAiPlan">
                  <span class="text-lg">✨</span>
                  Plan with AI
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            <div class="relative hidden lg:block">
              <div class="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img
:src="currentEvent.heroImage"
                     class="rounded-2xl shadow-2xl border-4 border-slate-800/50 object-cover h-[400px] w-full">
              </div>
            </div>
          </div>
        </section>

      </main>


    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useRoute, useRouter, useAsyncData, useHead} from '#imports'
import type { Database } from '~/types/database.types'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)
const fallbackImage = 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800'

const scrollToContent = () => {
  document.getElementById('content')?.scrollIntoView({behavior: 'smooth'})
}

// Helper for pricing logic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStartingPrice = (vendor: any) => {
  return vendor.starting_price || vendor.price_range_min || 0
}

// --- 1. Configuration Data ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventConfig: Record<string, any> = {
  weddings: {
    slug: 'wedding',
    title: 'Your Dream Wedding',
    description: 'From intimate garden ceremonies to grand ballroom receptions. Find the perfect team to say "I Do" with style and grace.',
    heroImage: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    recommendedCategories: [
      {name: 'Decorators', slug: 'decorator', icon: '💐'},
      {name: 'Photographers', slug: 'photographer', icon: '📸'},
      {name: 'Venues', slug: 'venue', icon: '🏰'},
      {name: 'Makeup', slug: 'makeup-artist', icon: '💄'},
      {name: 'Cakes', slug: 'baker', icon: '🎂'},
      {name: 'MCs', slug: 'mc', icon: '🎤'},
    ]
  },
  parties: {
    slug: 'party',
    title: 'Unforgettable Parties',
    description: 'Birthdays, baby showers, and house parties that feel curated. Discover vendors who know exactly how to bring the vibe.',
    heroImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    recommendedCategories: [
      {name: 'DJs', slug: 'dj', icon: '🎧'},
      {name: 'Caterers', slug: 'caterer', icon: '🥘'},
      {name: 'Venues', slug: 'venue', icon: '🏠'},
      {name: 'Bartenders', slug: 'mixologist', icon: '🍸'},
      {name: 'Decor', slug: 'decorator', icon: '🎈'},
      {name: 'Rentals', slug: 'rentals', icon: '🪑'},
    ]
  },
  corporate: {
    slug: 'corporate',
    title: 'Corporate Excellence',
    description: 'Impress clients and celebrate teams. Reliable vendors for launches, conferences, and end-of-year parties.',
    heroImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    recommendedCategories: [
      {name: 'Caterers', slug: 'caterer', icon: '🍱'},
      {name: 'Venues', slug: 'venue', icon: '🏢'},
      {name: 'Photography', slug: 'photographer', icon: '📸'},
      {name: 'AV & Sound', slug: 'av-tech', icon: '🔊'},
      {name: 'Gifts', slug: 'gifting', icon: '🎁'},
      {name: 'Planners', slug: 'planner', icon: '📋'},
    ]
  },
  'other-events': {
    slug: 'other',
    title: 'Gatherings & Get-Togethers',
    description: 'Church programs, funerals, graduations, and community events handled with care and professionalism.',
    heroImage: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    recommendedCategories: [
      {name: 'Rentals', slug: 'rentals', icon: '⛺️'},
      {name: 'Caterers', slug: 'caterer', icon: '🥘'},
      {name: 'Videography', slug: 'videographer', icon: '🎥'},
      {name: 'Live Bands', slug: 'live-band', icon: '🎸'},
      {name: 'Security', slug: 'security', icon: '🛡'},
      {name: 'Cleaners', slug: 'cleaning', icon: '🧹'},
    ]
  }
}

const currentEvent = computed(() => {
  const key = slug.value.toLowerCase()
  return eventConfig[key] || null
})

useHead(() => ({
  title: currentEvent.value ? `${currentEvent.value.title} | Stage & Bloom` : 'Event Categories',
  meta: [
    {name: 'description', content: currentEvent.value?.description || 'Browse curated event vendors.'}
  ]
}))



// --- 3. Data Fetching ---
const client = useSupabaseClient<Database>()

const {data: vendorsData, pending} = await useAsyncData(
    `event-vendors-${slug.value}`,
    async () => {
      if (!currentEvent.value) return []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
      const targetCategorySlugs = currentEvent.value.recommendedCategories.map((c: any) => c.slug)

      const {data, error} = await client
          .schema('stagebloom')
          .from('vendors')
          .select(`
            id, slug, display_name, city, area,
            starting_price, cover_image_url, is_verified, short_bio,
            vendor_categories!inner (name, slug)
          `)
          .in('vendor_categories.slug', targetCategorySlugs)
          .limit(9)

      if (error) {
        console.error('Error fetching event vendors:', error)
        return []
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as any[]
    },
    {
      watch: [slug],
      immediate: true
    }
)

const filteredVendors = computed(() => vendorsData.value || [])

// --- 4. Actions ---
const triggerAiPlan = () => {
  router.push({
    path: '/vendors/search',
    query: {q: `Plan a ${currentEvent.value?.slug || 'event'} in Accra`}
  })
}
</script>

<style scoped>
/* Simple CSS Animations */
.animate-slow-zoom {
  animation: slowZoom 20s infinite alternate;
}

@keyframes slowZoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-shadow-sm {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>