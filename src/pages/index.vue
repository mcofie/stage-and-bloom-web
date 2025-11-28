<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen selection:bg-rose-100 selection:text-rose-900">
    <component :is="'style'">
      @import
      url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
      .font-serif { font-family: 'Playfair Display', serif; }
      .font-sans { font-family: 'Inter', sans-serif; }
    </component>

    <SiteNavbar/>

    <main class="pt-24 pb-20 space-y-24">

      <section class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-6 space-y-8 relative z-10">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-medium tracking-wide">
              <span class="relative flex h-2 w-2">
                <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              The curated marketplace for events
            </div>

            <h1 class="font-serif text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.1] font-medium text-slate-900">
              Curate your <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500 italic pr-2">perfect moment.</span>
            </h1>

            <p class="text-lg text-slate-600 leading-relaxed max-w-lg">
              Discover Accra’s finest decorators, caterers, and creatives. Plugged directly into WhatsApp for seamless
              planning.
            </p>

            <div class="flex items-center gap-6 pt-2">
              <div class="flex -space-x-3">
                <img class="h-10 w-10 rounded-full border-2 border-white object-cover"
                     src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                     alt="User"/>
                <img class="h-10 w-10 rounded-full border-2 border-white object-cover"
                     src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64"
                     alt="User"/>
                <img class="h-10 w-10 rounded-full border-2 border-white object-cover"
                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64"
                     alt="User"/>
                <div
                    class="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                  +2k
                </div>
              </div>
              <div class="text-sm">
                <p class="font-bold text-slate-900">Trusted by planners</p>
                <div class="flex text-yellow-400 text-xs">★★★★★</div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 relative">
            <div
                class="absolute -inset-4 bg-gradient-to-tr from-rose-200 to-orange-100 rounded-[3rem] blur-2xl opacity-60 -z-10"></div>

            <div class="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
              <div class="flex border-b border-slate-100">
                <button @click="mode = 'filters'" class="flex-1 py-4 text-sm font-medium transition-colors relative"
                        :class="mode === 'filters' ? 'text-rose-600 bg-rose-50/50' : 'text-slate-500 hover:bg-slate-50'">
                  Quick Search
                  <div v-if="mode === 'filters'" class="absolute bottom-0 inset-x-0 h-0.5 bg-rose-600"></div>
                </button>
                <button @click="mode = 'ai'"
                        class="flex-1 py-4 text-sm font-medium transition-colors relative flex items-center justify-center gap-2"
                        :class="mode === 'ai' ? 'text-purple-600 bg-purple-50/50' : 'text-slate-500 hover:bg-slate-50'">
                  <span class="text-lg">✨</span> AI Planner
                  <div v-if="mode === 'ai'" class="absolute bottom-0 inset-x-0 h-0.5 bg-purple-600"></div>
                </button>
              </div>

              <div class="p-6 md:p-8">
                <div v-if="mode === 'filters'" class="space-y-5">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Service</label>
                      <select v-model="selectedCategory"
                              class="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-rose-500/20 transition-shadow cursor-pointer">
                        <option value="">All Vendors</option>
                        <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
                      </select>
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Location</label>
                      <input v-model="location" type="text" placeholder="e.g. East Legon"
                             class="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500/20 transition-shadow"/>
                    </div>
                  </div>

                  <div class="space-y-3 pt-2">
                    <div class="flex justify-between text-xs font-medium">
                      <span class="text-slate-500">Budget Range (GHS)</span>
                      <span class="text-rose-600">Up to {{ budgetPerVendor.toLocaleString() }}</span>
                    </div>
                    <input v-model.number="budgetPerVendor" type="range" min="500" max="20000" step="500"
                           class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600"/>
                  </div>

                  <button
                      @click="runFilterSearch"
                      :disabled="isSearching"
                      class="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-rose-200 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    <svg
                        v-if="isSearching"
                        class="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ isSearching ? 'Searching...' : 'Search Vendors' }}</span>
                  </button>
                </div>

                <div v-else class="space-y-5">
                  <div class="space-y-1.5">
                    <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Describe your dream
                      event</label>
                    <textarea v-model="aiPrompt" rows="3"
                              class="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/20 transition-shadow resize-none"
                              placeholder="I need a photographer and cake for a baby shower in Osu next Saturday. Budget is around 5000 GHS."></textarea>
                  </div>
                  <button
                      @click="runAISearch"
                      :disabled="isSearching"
                      class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-purple-200 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    <svg
                        v-if="isSearching"
                        class="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{{ isSearching ? 'Generating Plan...' : 'Generate Plan with AI' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="font-serif text-3xl font-bold text-slate-900 mb-3">Browse by Occasion</h2>
          <p class="text-slate-500">Start with the type of event you are planning and we'll guide you.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink v-for="event in eventTypes" :key="event.slug"
                    :to="`/events/${event.slug}`"
                    class="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer">
            <div class="absolute inset-0 bg-slate-200 transition-transform duration-700 group-hover:scale-110">
              <img :src="event.image" class="h-full w-full object-cover opacity-90" :alt="event.name" loading="lazy"/>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p class="text-[10px] uppercase tracking-widest font-medium text-white/80 mb-2">{{ event.kicker }}</p>
              <h3 class="font-serif text-2xl font-medium mb-1">{{ event.name }}</h3>
              <p class="text-sm text-white/80 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {{ event.description }}</p>
              <div
                  class="flex items-center gap-2 text-xs font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Explore Vendors <span class="text-lg">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section id="vendors" class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="font-serif text-3xl font-bold text-slate-900">Featured Vendors</h2>
            <p class="text-slate-500 mt-2">Hand-picked vendors available for your dates.</p>
          </div>
          <NuxtLink to="/vendors/search"
                    class="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1">
            View all vendors <span>→</span>
          </NuxtLink>
        </div>

        <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 3" :key="n" class="bg-white rounded-2xl h-96 border border-slate-100 animate-pulse"></div>
        </div>

        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="vendor in vendors" :key="vendor.id"
                   class="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img :src="vendor.cover_image_url || fallbackImage" :alt="vendor.display_name"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   loading="lazy"/>

              <div class="absolute top-3 left-3 flex flex-wrap gap-2">
                <span
                    class="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                  {{ vendor.vendor_categories?.name || 'Vendor' }}
                </span>
              </div>
              <button
                  class="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
                ♥
              </button>
            </div>

            <div class="p-5 flex-1 flex flex-col">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="font-serif text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-1">
                    {{ vendor.display_name }}
                  </h3>
                  <p class="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <svg class="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {{ vendor.area || 'Accra' }}, {{ vendor.city || 'Ghana' }}
                  </p>
                </div>
                <div v-if="vendor.is_verified" class="text-emerald-500" title="Verified Vendor">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>

              <p class="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                {{ vendor.short_bio || 'Professional vendor available for bookings.' }}
              </p>

              <div class="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Starting from</p>
                  <p class="text-slate-900 font-semibold">GH₵ {{ getStartingPrice(vendor).toLocaleString() }}</p>
                </div>
                <NuxtLink :to="`/vendors/${vendor.slug}`"
                          class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                  View Profile
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="bg-slate-900 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div class="space-y-6">
            <div class="inline-block p-3 rounded-xl bg-white/10 backdrop-blur">
              <svg class="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 class="font-serif text-4xl font-bold leading-tight">
              Vendor booking, <br/>simplified.
            </h2>
            <div class="space-y-4 text-slate-300 text-lg">
              <p>Stop drowning in Instagram DMs and screenshots. Stage &amp; Bloom brings structure to the chaos of
                event planning.</p>
              <ul class="space-y-3 pt-2 text-base">
                <li class="flex items-center gap-3">
                  <span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                  Verified rate cards & transparent pricing
                </li>
                <li class="flex items-center gap-3">
                  <span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                  Direct WhatsApp integration
                </li>
                <li class="flex items-center gap-3">
                  <span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                  Curated for quality, not quantity
                </li>
              </ul>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -inset-4 bg-rose-500/20 rounded-full blur-3xl"></div>
            <img
                src="https://images.pexels.com/photos/2291462/pexels-photo-2291462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                class="rounded-2xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500"
                alt="Event planning"/>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-white border-t border-slate-100 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2 mb-6">
              <div
                  class="h-8 w-8 bg-slate-900 text-white font-serif font-bold flex items-center justify-center rounded-lg">
                SB
              </div>
              <span class="font-serif font-bold text-lg">Stage &amp; Bloom</span>
            </div>
            <p class="text-sm text-slate-500 leading-relaxed mb-6">
              Reimagining how events are planned in Africa. Beautifully simple, reliably curated.
            </p>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 mb-4">Discover</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li>
                <NuxtLink to="/vendors/search?categorySlug=decorator" class="hover:text-rose-600 transition-colors">
                  Wedding Vendors
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/vendors/search?categorySlug=caterer" class="hover:text-rose-600 transition-colors">
                  Caterers
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/vendors/search?categorySlug=photographer" class="hover:text-rose-600 transition-colors">
                  Photographers
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 mb-4">Company</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><a href="#" class="hover:text-rose-600 transition-colors">About Us</a></li>
              <li><a href="#" class="hover:text-rose-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 mb-4">Join the list</h4>
            <p class="text-xs text-slate-500 mb-3">Get the best vendors delivered to your inbox monthly.</p>
            <div class="flex gap-2">
              <input type="email" placeholder="Email address"
                     class="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm border border-slate-200 focus:outline-none focus:border-rose-300"/>
              <button class="bg-slate-900 text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-800">Go
              </button>
            </div>
          </div>
        </div>
        <div
            class="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; {{ new Date().getFullYear() }} Stage &amp; Bloom. Made with ♥ in Accra.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-slate-600">Privacy Policy</a>
            <a href="#" class="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRouter, useAsyncData} from '#imports'
import {useFeaturedVendors} from '~/composables/useFeaturedVendors'

const router = useRouter()
const selectedCountry = ref<'gh' | 'ke' | 'za'>('gh')

// --- Search State ---
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

const eventTypes = [
  {
    slug: 'wedding',
    kicker: 'For your special day',
    name: 'Weddings',
    description: 'Build a dream team for engagements, white weddings and receptions.',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg'
  },
  {
    slug: 'party',
    kicker: 'Celebrate in style',
    name: 'Parties',
    description: 'Birthdays, baby showers and house parties that feel curated.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'
  },
  {
    slug: 'corporate',
    kicker: 'Professional events',
    name: 'Corporate',
    description: 'Offsites, launches, townhalls and mixers for teams and brands.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
  },
  {
    slug: 'other',
    kicker: 'Gatherings',
    name: 'Other Events',
    description: 'Church events, graduations, open mics and everything in between.',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'
  }
]

// --- DATA FETCHING (FEATURED VENDORS) ---
const {data: featuredVendors, pending} = await useAsyncData(
    'featured-vendors',
    () => useFeaturedVendors()
)

const vendors = computed(() => featuredVendors.value || [])

const fallbackImage = 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800'

const getStartingPrice = (vendor: any) => {
  return vendor.starting_price || vendor.price_range_min || 0
}

const toWhatsappLink = (vendor: any) => {
  if (!vendor.whatsapp_number) return '#'
  const text = encodeURIComponent(`Hi ${vendor.display_name}, I saw your profile on Stage & Bloom.`)
  return `https://wa.me/${vendor.whatsapp_number.replace('+', '')}?text=${text}`
}

// --- ACTIONS ---
// Update the runFilterSearch function
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
  // We don't set isSearching = false because the page will navigate away
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

<style>
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