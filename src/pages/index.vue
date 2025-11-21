<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen selection:bg-rose-100 selection:text-rose-900">
    <component :is="'style'">
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
      .font-serif { font-family: 'Playfair Display', serif; }
      .font-sans { font-family: 'Inter', sans-serif; }
    </component>

    <header class="fixed top-0 w-full z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="#" class="flex items-center gap-3 group">
          <div class="relative flex items-center justify-center h-10 w-10 bg-rose-600 text-white font-serif font-bold text-xl rounded-xl shadow-lg shadow-rose-200 group-hover:scale-105 transition-transform">
            SB
          </div>
          <div class="leading-none">
            <h1 class="font-serif font-bold text-xl text-slate-900 tracking-tight">Stage &amp; Bloom</h1>
            <p class="text-[10px] uppercase tracking-widest text-slate-500 mt-1">The Event Collective</p>
          </div>
        </a>

        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#vendors" class="hover:text-rose-600 transition-colors">Find Vendors</a>
          <a href="#how-it-works" class="hover:text-rose-600 transition-colors">How it Works</a>
          <a href="#inspiration" class="hover:text-rose-600 transition-colors">Inspiration</a>
        </nav>

        <div class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2 bg-slate-100/80 rounded-full px-3 py-1.5 border border-slate-200">
            <span class="text-lg">🇬🇭</span>
            <select v-model="selectedCountry" class="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer">
              <option value="gh">Ghana</option>
              <option value="ke">Kenya</option>
              <option value="za">South Africa</option>
            </select>
          </div>
          <button class="hidden sm:inline-flex rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-slate-800 hover:shadow-lg transition-all">
            List your business
          </button>
        </div>
      </div>
    </header>

    <main class="pt-24 pb-20 space-y-24">

      <section class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid lg:grid-cols-12 gap-12 items-center">

          <div class="lg:col-span-6 space-y-8 relative z-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-medium tracking-wide">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              The curated marketplace for events
            </div>

            <h1 class="font-serif text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.1] font-medium text-slate-900">
              Curate your <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500 italic pr-2">perfect moment.</span>
            </h1>

            <p class="text-lg text-slate-600 leading-relaxed max-w-lg">
              Discover Accra’s finest decorators, caterers, and creatives.
              Plugged directly into WhatsApp for seamless planning.
            </p>

            <div class="flex items-center gap-6 pt-2">
              <div class="flex -space-x-3">
                <img class="h-10 w-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img class="h-10 w-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img class="h-10 w-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="User" />
                <div class="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">+2k</div>
              </div>
              <div class="text-sm">
                <p class="font-bold text-slate-900">Trusted by planners</p>
                <div class="flex text-yellow-400 text-xs">★★★★★</div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 relative">
            <div class="absolute -inset-4 bg-gradient-to-tr from-rose-200 to-orange-100 rounded-[3rem] blur-2xl opacity-60 -z-10"></div>

            <div class="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">


              <div class="flex border-b border-slate-100">
                <button
                    @click="mode = 'filters'"
                    class="flex-1 py-4 text-sm font-medium transition-colors relative"
                    :class="mode === 'filters' ? 'text-rose-600 bg-rose-50/50' : 'text-slate-500 hover:bg-slate-50'"
                >
                  Quick Search
                  <div v-if="mode === 'filters'" class="absolute bottom-0 inset-x-0 h-0.5 bg-rose-600"></div>
                </button>
                <button
                    @click="mode = 'ai'"
                    class="flex-1 py-4 text-sm font-medium transition-colors relative flex items-center justify-center gap-2"
                    :class="mode === 'ai' ? 'text-purple-600 bg-purple-50/50' : 'text-slate-500 hover:bg-slate-50'"
                >
                  <span class="text-lg">✨</span> AI Planner
                  <div v-if="mode === 'ai'" class="absolute bottom-0 inset-x-0 h-0.5 bg-purple-600"></div>
                </button>
              </div>

              <div class="p-6 md:p-8">
                <div v-if="mode === 'filters'" class="space-y-5">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Service</label>
                      <select v-model="selectedCategory" class="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-rose-500/20 transition-shadow cursor-pointer">
                        <option value="">All Vendors</option>
                        <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
                      </select>
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Location</label>
                      <input v-model="location" type="text" placeholder="e.g. East Legon" class="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500/20 transition-shadow" />
                    </div>
                  </div>

                  <div class="space-y-3 pt-2">
                    <div class="flex justify-between text-xs font-medium">
                      <span class="text-slate-500">Budget Range (GHS)</span>
                      <span class="text-rose-600">Up to {{ budgetPerVendor.toLocaleString() }}</span>
                    </div>
                    <input v-model.number="budgetPerVendor" type="range" min="500" max="20000" step="500" class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600" />
                  </div>

                  <button @click="runFilterSearch" class="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-rose-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
                    Show {{ filteredVendors.length }} Vendors
                  </button>
                </div>

                <div v-else class="space-y-5">
                  <div class="space-y-1.5">
                    <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Describe your dream event</label>
                    <textarea
                        v-model="aiPrompt"
                        rows="3"
                        class="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/20 transition-shadow resize-none"
                        placeholder="I need a photographer and cake for a baby shower in Osu next Saturday. Budget is around 5000 GHS."
                    ></textarea>
                  </div>
                  <button @click="runAISearch" class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-purple-200 transition-all hover:-translate-y-0.5">
                    Generate Plan with AI
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
          <div v-for="event in eventTypes" :key="event.slug" class="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer">
            <div class="absolute inset-0 bg-slate-200 transition-transform duration-700 group-hover:scale-110">
              <img v-if="event.slug === 'wedding'" src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg" class="h-full w-full object-cover opacity-90" alt="Wedding" />
              <img v-if="event.slug === 'party'" src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg" class="h-full w-full object-cover opacity-90" alt="Party" />
              <img v-if="event.slug === 'corporate'" src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" class="h-full w-full object-cover opacity-90" alt="Corporate" />
              <img v-if="event.slug === 'other'" src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg" class="h-full w-full object-cover opacity-90" alt="Other" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p class="text-[10px] uppercase tracking-widest font-medium text-white/80 mb-2">{{ event.kicker }}</p>
              <h3 class="font-serif text-2xl font-medium mb-1">{{ event.name }}</h3>
              <p class="text-sm text-white/80 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">{{ event.description }}</p>
              <div class="flex items-center gap-2 text-xs font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Explore Vendors <span class="text-lg">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vendors" class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="font-serif text-3xl font-bold text-slate-900">Featured Talent</h2>
            <p class="text-slate-500 mt-2">Hand-picked vendors available for your dates.</p>
          </div>
          <button class="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1">
            View all vendors <span>→</span>
          </button>
        </div>

        <div v-if="filteredVendors.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
              v-for="vendor in filteredVendors"
              :key="vendor.id"
              class="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img :src="vendor.coverImage" :alt="vendor.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

              <div class="absolute top-3 left-3 flex flex-wrap gap-2">
                <span class="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                  {{ vendor.categoryLabel }}
                </span>
              </div>
              <button class="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
                ♥
              </button>
            </div>

            <div class="p-5 flex-1 flex flex-col">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="font-serif text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {{ vendor.name }}
                  </h3>
                  <p class="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <svg class="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {{ vendor.area }}, {{ vendor.city }}
                  </p>
                </div>
                <div v-if="vendor.verified" class="text-emerald-500" title="Verified Vendor">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                </div>
              </div>

              <p class="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                {{ vendor.description }}
              </p>

              <div class="flex flex-wrap gap-1.5 mb-4">
                <span v-for="tag in vendor.tags.slice(0,3)" :key="tag" class="px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-[10px] font-medium text-slate-600">
                  {{ tag }}
                </span>
              </div>

              <div class="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Starting from</p>
                  <p class="text-slate-900 font-semibold">GH₵ {{ vendor.startingFrom.toLocaleString() }}</p>
                </div>
                <a
                    :href="toWhatsappLink(vendor)"
                    target="_blank"
                    class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <span>Message</span>
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <div class="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-3xl">🕵️‍♀️</div>
          <h3 class="text-lg font-semibold text-slate-900">No vendors found</h3>
          <p class="text-slate-500 max-w-md mx-auto mt-2">We couldn't find anyone matching those exact filters. Try adjusting your budget or location, or let our AI suggest someone.</p>
          <button @click="resetFilters" class="mt-6 text-rose-600 font-medium hover:underline">Clear all filters</button>
        </div>
      </section>

      <section class="bg-slate-900 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div class="space-y-6">
            <div class="inline-block p-3 rounded-xl bg-white/10 backdrop-blur">
              <svg class="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 class="font-serif text-4xl font-bold leading-tight">Vendor booking, <br/>simplified.</h2>
            <div class="space-y-4 text-slate-300 text-lg">
              <p>Stop drowning in Instagram DMs and screenshots. Stage &amp; Bloom brings structure to the chaos of event planning.</p>
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


            [Image of a happy couple at a wedding reception]

          </div>
        </div>
      </section>

    </main>

    <footer class="bg-white border-t border-slate-100 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-2 mb-6">
              <div class="h-8 w-8 bg-slate-900 text-white font-serif font-bold flex items-center justify-center rounded-lg">SB</div>
              <span class="font-serif font-bold text-lg">Stage &amp; Bloom</span>
            </div>
            <p class="text-sm text-slate-500 leading-relaxed mb-6">
              Reimagining how events are planned in Africa. Beautifully simple, reliably curated.
            </p>
            <div class="flex gap-4">
              <div class="h-8 w-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer">📷</div>
              <div class="h-8 w-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer">🐦</div>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-slate-900 mb-4">Discover</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><a href="#" class="hover:text-rose-600 transition-colors">Wedding Vendors</a></li>
              <li><a href="#" class="hover:text-rose-600 transition-colors">Corporate Events</a></li>
              <li><a href="#" class="hover:text-rose-600 transition-colors">Party Rentals</a></li>
              <li><a href="#" class="hover:text-rose-600 transition-colors">Photographers</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-slate-900 mb-4">Company</h4>
            <ul class="space-y-3 text-sm text-slate-500">
              <li><a href="#" class="hover:text-rose-600 transition-colors">About Us</a></li>
              <li><a href="#" class="hover:text-rose-600 transition-colors">For Vendors</a></li>
              <li><a href="#" class="hover:text-rose-600 transition-colors">Pricing</a></li>
              <li><a href="#" class="hover:text-rose-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-slate-900 mb-4">Join the list</h4>
            <p class="text-xs text-slate-500 mb-3">Get the best vendors delivered to your inbox monthly.</p>
            <div class="flex gap-2">
              <input type="email" placeholder="Email address" class="w-full bg-slate-50 rounded-lg px-3 py-2 text-sm border border-slate-200 focus:outline-none focus:border-rose-300" />
              <button class="bg-slate-900 text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-800">Go</button>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
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
import { computed, ref } from 'vue'

const selectedCountry = ref<'gh' | 'ke' | 'za'>('gh')

type VendorCategory = {
  slug: string
  name: string
}

type Vendor = {
  id: number
  name: string
  category: string
  categoryLabel: string
  city: string
  area: string
  description: string
  startingFrom: number
  pricingNote: string
  tags: string[]
  verified: boolean
  instagram?: string
  coverImage?: string
  maxBudgetHint?: number
  whatsappNumber: string
}

type EventType = {
  slug: string
  name: string
  kicker: string
  description: string
  subcategories: { slug: string; name: string }[]
}

// Search State
const mode = ref<'filters' | 'ai'>('filters')
const selectedCategory = ref('')
const location = ref('')
const guestCount = ref<number | null>(null)
const budgetPerVendor = ref(5000)
const aiPrompt = ref('')

const categories: VendorCategory[] = [
  { slug: 'decorator', name: 'Decor & Styling' },
  { slug: 'caterer', name: 'Caterers & Food' },
  { slug: 'photographer', name: 'Photographers' },
  { slug: 'dj', name: 'DJs & Music' },
  { slug: 'mc', name: 'MCs & Hosts' },
  { slug: 'baker', name: 'Cakes & Desserts' }
]

const eventTypes = ref<EventType[]>([
  {
    slug: 'wedding',
    kicker: 'For your special day',
    name: 'Weddings',
    description: 'Build a dream team for engagements, white weddings and receptions.',
    subcategories: [
      { slug: 'decorator', name: 'Decor & styling' },
      { slug: 'photographer', name: 'Photography & video' },
      { slug: 'caterer', name: 'Catering & drinks' },
      { slug: 'mc', name: 'MCs & hosts' },
      { slug: 'dj', name: 'DJs & live music' }
    ]
  },
  {
    slug: 'party',
    kicker: 'Celebrate in style',
    name: 'Parties',
    description: 'Birthdays, baby showers and house parties that feel curated.',
    subcategories: [
      { slug: 'decorator', name: 'Decor & backdrops' },
      { slug: 'baker', name: 'Cakes & desserts' },
      { slug: 'dj', name: 'DJs & playlists' },
      { slug: 'caterer', name: 'Finger foods & bites' }
    ]
  },
  {
    slug: 'corporate',
    kicker: 'Professional events',
    name: 'Corporate',
    description: 'Offsites, launches, townhalls and mixers for teams and brands.',
    subcategories: [
      { slug: 'caterer', name: 'Corporate catering' },
      { slug: 'decorator', name: 'Brand & stage design' },
      { slug: 'photographer', name: 'Photo & video recap' },
      { slug: 'mc', name: 'Professional hosts' }
    ]
  },
  {
    slug: 'other',
    kicker: 'Gatherings',
    name: 'Other Events',
    description: 'Church events, graduations, open mics and everything in between.',
    subcategories: [
      { slug: 'decorator', name: 'General decor' },
      { slug: 'photographer', name: 'Event coverage' },
      { slug: 'dj', name: 'Sound & music' },
      { slug: 'caterer', name: 'Food & drinks' }
    ]
  }
])

// Data
const vendors = ref<Vendor[]>([
  {
    id: 1,
    name: 'Bloom & Lace Events',
    category: 'decorator',
    categoryLabel: 'Decor & Styling',
    city: 'Accra',
    area: 'East Legon',
    description: 'Soft, modern decor for intimate parties, bridal showers, and chic weddings. Known for clean setups and floral details.',
    startingFrom: 2500,
    pricingNote: 'per event',
    tags: ['Birthdays', 'Bridal showers'],
    verified: true,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg',
    maxBudgetHint: 10000,
    whatsappNumber: '+233200000001'
  },
  {
    id: 2,
    name: 'Taste & Serve Catering',
    category: 'caterer',
    categoryLabel: 'Caterers',
    city: 'Accra',
    area: 'Airport',
    description: 'Buffet and plated menus for Ghanaian and continental tastes. Great for corporate events and family celebrations.',
    startingFrom: 90,
    pricingNote: 'per person',
    tags: ['Corporate', 'Traditional'],
    verified: true,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxBudgetHint: 20000,
    whatsappNumber: '+233200000002'
  },
  {
    id: 3,
    name: 'Lens & Love Studio',
    category: 'photographer',
    categoryLabel: 'Photography',
    city: 'Accra',
    area: 'Spintex',
    description: 'Documentary-style photography that captures emotions and candid moments. Perfect for weddings and milestone birthdays.',
    startingFrom: 1800,
    pricingNote: 'per event',
    tags: ['Weddings', 'Milestones'],
    verified: true,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxBudgetHint: 15000,
    whatsappNumber: '+233200000003'
  },
  {
    id: 4,
    name: 'DJ VibesOnly',
    category: 'dj',
    categoryLabel: 'DJs & Music',
    city: 'Accra',
    area: 'Osu',
    description: 'High-energy mixes across Afrobeats, Amapiano, and old-school favourites. Great for parties and lively receptions.',
    startingFrom: 1500,
    pricingNote: 'up to 4 hours',
    tags: ['Birthdays', 'Weddings'],
    verified: false,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/1647161/pexels-photo-1647161.jpeg',
    maxBudgetHint: 8000,
    whatsappNumber: '+233200000004'
  },
  {
    id: 5,
    name: 'Sweet Crumbs Bakery',
    category: 'baker',
    categoryLabel: 'Cakes',
    city: 'Accra',
    area: 'Tema',
    description: 'Custom cakes and dessert tables for kids’ birthdays, bridal showers, and launches.',
    startingFrom: 800,
    pricingNote: '2-tier cakes',
    tags: ['Kids parties', 'Showers'],
    verified: true,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxBudgetHint: 6000,
    whatsappNumber: '+233200000005'
  },
  {
    id: 6,
    name: 'Host Kweku',
    category: 'mc',
    categoryLabel: 'MCs',
    city: 'Accra',
    area: 'Dansoman',
    description: 'Engaging MC who blends humour with structure. Available for weddings, corporate events, and church functions.',
    startingFrom: 2000,
    pricingNote: 'per event',
    tags: ['Weddings', 'Corporate'],
    verified: true,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxBudgetHint: 7000,
    whatsappNumber: '+233200000006'
  }
])

// Logic
const filteredVendors = computed(() => {
  return vendors.value.filter(vendor => {
    // Filter by Category
    if (selectedCategory.value && vendor.category !== selectedCategory.value) {
      return false
    }
    // Filter by Location (simple includes check)
    if (location.value) {
      const search = location.value.toLowerCase()
      const matches = vendor.city.toLowerCase().includes(search) ||
          vendor.area.toLowerCase().includes(search)
      if (!matches) return false
    }
    // Filter by Budget (show vendors whose starting price is within budget)
    if (budgetPerVendor.value && vendor.startingFrom > budgetPerVendor.value) {
      return false
    }
    return true
  })
})

const runFilterSearch = () => {
  document.getElementById('vendors')?.scrollIntoView({ behavior: 'smooth' })
}

const resetFilters = () => {
  selectedCategory.value = ''
  location.value = ''
  budgetPerVendor.value = 10000
}

const runAISearch = () => {
  // Simulate AI processing
  alert('This would trigger the AI Agent to process: ' + aiPrompt.value)
}

const toWhatsappLink = (vendor: Vendor) => {
  const text = encodeURIComponent(`Hi ${vendor.name}, I saw your profile on Stage & Bloom and would like to enquire about your services.`)
  return `https://wa.me/${vendor.whatsappNumber.replace('+', '')}?text=${text}`
}
</script>

<style>
/* Custom scrollbar for better aesthetic */
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