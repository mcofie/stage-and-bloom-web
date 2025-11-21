<template>
  <div class="min-h-screen bg-[#F3F2EC] text-slate-900">
    <!-- Top bar / Navigation -->
    <header class="border-b border-slate-200/60 bg-white/90 backdrop-blur sticky top-0 z-30">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <!-- Logo / Brand -->
        <div class="flex items-center gap-2">
          <div
              class="h-9 w-9 rounded-full flex items-center justify-center font-bold text-white text-xl"
              style="background:#E62727;"
          >
            SB
          </div>
          <div class="leading-tight">
            <div class="font-semibold tracking-tight text-lg">Stage &amp; Bloom</div>
            <p class="text-[11px] text-slate-500">Event vendors, all in one place.</p>
          </div>
        </div>

        <!-- Center Nav -->
        <nav class="hidden md:flex items-center gap-6 text-sm">
          <a href="#vendors" class="hover:text-stage-red transition-colors">
            Browse vendors
          </a>
          <a href="#why-exists" class="hover:text-stage-red transition-colors">
            Why it exists
          </a>
          <a href="#how-it-works" class="hover:text-stage-red transition-colors">
            How it works
          </a>
        </nav>

        <!-- Right side: CTA + Country selector -->
        <div class="flex items-center gap-3">
          <!-- Country selector -->
          <div class="hidden sm:block">
            <select
                v-model="selectedCountry"
                class="text-xs border-slate-200/80 bg-white px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-stage-red/30"
            >
              <option value="gh">🇬🇭 Ghana</option>
              <option value="ke">🇰🇪 Kenya</option>
              <option value="za">🇿🇦 South Africa</option>
            </select>
          </div>

          <!-- Primary CTA -->
          <button
              class="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white border border-transparent bg-red-700 hover:bg-[#c02121] transition-colors"
          >
            List your services
          </button>
        </div>
      </div>
    </header>


    <!-- Main -->
    <main class="max-w-6xl mx-auto px-4 pt-10 pb-16 space-y-16">
      <!-- HERO -->
      <section class="grid lg:grid-cols-2 gap-10 items-center">
        <!-- Left: Copy -->
        <div class="space-y-5">
          <p class="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500">
            <span class="h-1.5 w-1.5 rounded-full" style="background:#E62727;"></span>
            Event vendor marketplace
          </p>

          <h1 class="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight">
            Find trusted <span class="text-stage-red">event vendors</span> for your next
            celebration in minutes.
          </h1>

          <p class="text-sm md:text-base text-slate-600 max-w-lg">
            Browse decorators, caterers, photographers, DJs, MCs and more – all plugged
            into the Instagram and WhatsApp flows vendors already use.
          </p>

          <!-- Quick chips -->
          <div class="flex flex-wrap gap-2.5 text-[11px]">
            <span
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/70"
            >
              🎉 Birthdays &amp; baby showers
            </span>
            <span
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/70"
            >
              💍 Weddings &amp; engagements
            </span>
            <span
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/70"
            >
              🏢 Corporate &amp; brand events
            </span>
          </div>

          <!-- Trust / explainer row -->
          <div class="flex flex-wrap gap-4 text-[11px] text-slate-500">
            <div class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Contact vendors directly on WhatsApp
            </div>
            <div class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-stage-teal"></span>
              Real rate hints &amp; ballpark pricing
            </div>
          </div>
        </div>

        <!-- Right: Search card -->
        <div
            id="search"
            class="bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] border border-slate-200/60 overflow-hidden rounded-none"
        >
          <!-- Header strip -->
          <div class="px-5 pt-4 pb-3 border-b border-slate-200/60 bg-[#F9F8F4]">
            <p class="text-xs font-medium text-slate-800">Tell us what you’re planning</p>
            <p class="text-[11px] text-slate-500 mt-0.5">
              We’ll help you find the right mix of vendors for your event.
            </p>
          </div>

          <div class="p-4 md:p-5 space-y-4">
            <!-- Mode toggle -->
            <div
                class="grid grid-cols-2 gap-2 text-xs font-medium bg-[#F3F2EC] rounded-full p-1"
            >
              <button
                  type="button"
                  class="rounded-full py-2 text-center transition-all"
                  :class="
                  mode === 'filters'
                    ? 'bg-white shadow-sm text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                "
                  @click="mode = 'filters'"
              >
                Quick filters
              </button>
              <button
                  type="button"
                  class="rounded-full py-2 text-center transition-all"
                  :class="
                  mode === 'ai'
                    ? 'bg-white shadow-sm text-slate-900'
                    : 'text-slate-500 hover:text-slate-800'
                "
                  @click="mode = 'ai'"
              >
                Ask Stage &amp; Bloom AI
              </button>
            </div>

            <!-- Filters mode -->
            <div v-if="mode === 'filters'" class="space-y-3">
              <div class="grid md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-700 mb-1">
                    What do you need?
                  </label>
                  <select
                      v-model="selectedCategory"
                      class="w-full text-sm rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-stage-red/30"
                  >
                    <option value="">Any vendor type</option>
                    <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
                      {{ cat.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-medium text-slate-700 mb-1">
                    City / Area
                  </label>
                  <input
                      v-model="location"
                      type="text"
                      placeholder="e.g. East Legon, Osu"
                      class="w-full text-sm rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-stage-red/30"
                  />
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-700 mb-1">
                    Number of guests
                  </label>
                  <input
                      v-model.number="guestCount"
                      type="number"
                      min="1"
                      placeholder="e.g. 50"
                      class="w-full text-sm rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-stage-red/30"
                  />
                </div>
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="block text-xs font-medium text-slate-700">
                      Approx. budget per vendor (GHS)
                    </label>
                    <span class="text-[11px] text-slate-500">
                      Up to {{ budgetPerVendor || '—' }}
                    </span>
                  </div>
                  <input
                      v-model.number="budgetPerVendor"
                      type="range"
                      min="500"
                      max="20000"
                      step="500"
                      class="w-full accent-stage-red"
                  />
                </div>
              </div>

              <button
                  type="button"
                  @click="runFilterSearch"
                  class="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow bg-red-700 hover:bg-[#c02121]"
              >
                Search vendors
                <span class="text-xs opacity-80">
                  ({{ filteredVendors.length }} found)
                </span>
              </button>
            </div>

            <!-- AI mode -->
            <div v-else class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">
                  Describe your event
                </label>
                <textarea
                    v-model="aiPrompt"
                    rows="4"
                    placeholder="e.g. Small 50-person birthday in Osu next month, budget about 10k. Need decor, food, cake and a DJ."
                    class="w-full text-sm rounded-2xl border border-slate-200/80 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-stage-red/30 resize-none"
                />
              </div>

              <p class="text-[11px] text-slate-500">
                We’ll turn this into filters (guest count, budget, vendor types) and show
                matching vendors you can contact on WhatsApp.
              </p>

              <button
                  type="button"
                  @click="runAISearch"
                  class="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow bg-red-700 hover:bg-[#c02121]"
              >
                Ask the AI planner
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- BROWSE BY EVENT TYPE -->
      <section class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 class="text-xl md:text-2xl font-semibold">Browse by event type</h2>
            <p class="text-xs md:text-sm text-slate-500 max-w-md">
              Not sure where to start? Choose the kind of event you’re planning and explore
              typical vendor needs.
            </p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <article
              v-for="event in eventTypes"
              :key="event.slug"
              class="bg-white border border-slate-200/70 p-4 flex flex-col justify-between rounded-none"
          >
            <div class="space-y-1.5">
              <p class="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                {{ event.kicker }}
              </p>
              <h3 class="font-semibold text-sm md:text-base">{{ event.name }}</h3>
              <p class="text-xs text-slate-600">
                {{ event.description }}
              </p>
            </div>

            <div class="mt-3 space-y-2">
              <label class="block text-[11px] font-medium text-slate-600">
                Focus on
              </label>
              <select
                  v-model="selectedSubcategories[event.slug]"
                  class="w-full text-xs rounded-md border border-slate-200/80 bg-white px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-stage-red/30"
              >
                <option :value="''">Any vendor type</option>
                <option
                    v-for="sub in event.subcategories"
                    :key="sub.slug"
                    :value="sub.slug"
                >
                  {{ sub.name }}
                </option>
              </select>
            </div>
          </article>
        </div>
      </section>

      <!-- FEATURED VENDORS -->
      <section id="vendors" class="space-y-5">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl md:text-2xl font-semibold">Featured vendors</h2>
            <p class="text-xs md:text-sm text-slate-500">
              Showing {{ filteredVendors.length }} of {{ vendors.length }} sample vendors
              (mock data for now).
            </p>
          </div>
          <div class="hidden md:flex text-[11px] items-center gap-2 text-slate-500">
            <span
                class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-slate-200/70"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Available
            </span>
          </div>
        </div>

        <div v-if="filteredVendors.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <article
              v-for="vendor in filteredVendors"
              :key="vendor.id"
              class="bg-white/95 border border-slate-200/60 overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all rounded-none"
          >
            <div class="relative">
              <div class="aspect-[4/3] bg-slate-200">
                <img
                    v-if="vendor.coverImage"
                    :src="vendor.coverImage"
                    :alt="vendor.name"
                    class="h-full w-full object-cover"
                />
              </div>
              <div
                  class="absolute top-2 left-2 text-[10px] px-2 py-1 rounded-full bg-white/90 border border-slate-200/70 flex items-center gap-1"
              >
                <span
                    class="inline-block h-1.5 w-1.5 rounded-full"
                    :class="vendor.verified ? 'bg-emerald-500' : 'bg-slate-400'"
                ></span>
                {{ vendor.categoryLabel }}
              </div>
            </div>

            <div class="p-3.5 flex-1 flex flex-col gap-2 text-sm">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 class="font-semibold text-[15px] leading-snug">
                    {{ vendor.name }}
                  </h3>
                  <p class="text-[11px] text-slate-500">
                    {{ vendor.city }} • {{ vendor.area }}
                  </p>
                </div>
                <div
                    v-if="vendor.instagram"
                    class="text-[11px] text-slate-500 flex flex-col items-end"
                >
                  <span class="uppercase tracking-[0.16em] mb-0.5 text-[10px]">
                    Instagram
                  </span>
                  <a
                      :href="vendor.instagram"
                      target="_blank"
                      rel="noreferrer"
                      class="text-stage-teal hover:underline"
                  >
                    View profile
                  </a>
                </div>
              </div>

              <p class="text-xs text-slate-600 line-clamp-3">
                {{ vendor.description }}
              </p>

              <div class="flex items-center justify-between mt-1">
                <div class="text-xs">
                  <div class="text-slate-500">From</div>
                  <div class="font-semibold text-[13px] text-slate-800">
                    GHS {{ vendor.startingFrom.toLocaleString() }}
                    <span class="text-[10px] text-slate-500">
                      {{ vendor.pricingNote }}
                    </span>
                  </div>
                </div>
                <div class="text-[11px] text-slate-500 text-right">
                  <div>Typical events</div>
                  <div class="font-medium text-[11px] text-slate-700">
                    {{ vendor.tags.join(', ') }}
                  </div>
                </div>
              </div>
            </div>

            <div class="px-3.5 pb-3.5 pt-1 flex gap-2">
              <a
                  :href="toWhatsappLink(vendor)"
                  target="_blank"
                  rel="noreferrer"
                  class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-sm hover:shadow-md transition-shadow bg-red-700 hover:bg-[#c02121]"
              >
                Contact on WhatsApp
              </a>
              <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-medium text-black shadow-sm hover:shadow-md transition-shadow border-gray-400 hover:bg-[#c02121]"
              >
                View details
              </button>
            </div>
          </article>
        </div>

        <div
            v-else
            class="mt-6 border border-dashed border-slate-200/70 bg-white/80 p-6 text-sm text-center text-slate-600 rounded-none"
        >
          No vendors match your filters just yet. Try clearing your filters or switching
          to the AI planner to describe your event in your own words.
        </div>
      </section>

      <!-- WHY + HOW -->
      <section id="why-exists" class="mt-4 md:mt-6">
        <div class="grid md:grid-cols-2 gap-8 items-start">
          <div class="space-y-3">
            <h2 class="text-xl md:text-2xl font-semibold">
              Why Stage &amp; Bloom exists
            </h2>
            <div class="space-y-3 text-sm md:text-base text-slate-600 leading-relaxed">
              <p>
                Planning an event in Ghana often means hopping between Instagram profiles,
                WhatsApp chats, and random recommendations from friends. Prices are hidden,
                it’s hard to compare vendors, and you don’t always know who actually fits
                your vibe and budget.
              </p>
              <p>
                Stage &amp; Bloom brings everything into one place. We index vendors who
                already live on Instagram and WhatsApp, add simple profiles with rate
                cards, and use an assistant to help you figure out the exact mix of vendors
                you need for your guest count, budget, and event type.
              </p>
              <p>No stress. No 50 open tabs. Just the right people for your day.</p>
            </div>
          </div>

          <div
              id="how-it-works"
              class="bg-white/95 border border-slate-200/60 p-4 md:p-5 text-sm space-y-3 shadow-sm rounded-none"
          >
            <h3 class="font-semibold mb-1">How it works</h3>
            <ol class="space-y-2 list-decimal list-inside text-slate-600">
              <li>
                <span class="font-medium text-slate-800">Describe your event</span> – use
                the quick filters or tell the AI planner what you’re organising.
              </li>
              <li>
                <span class="font-medium text-slate-800">See matching vendors</span> –
                browse decorators, photographers, caterers, DJs, MCs and more, with real
                ballpark pricing.
              </li>
              <li>
                <span class="font-medium text-slate-800">Contact on WhatsApp</span> – tap
                to start a pre-filled chat and handle payments and details the way you
                already do.
              </li>
            </ol>

            <div
                class="mt-3 border border-dashed border-stage-teal/25 bg-stage-teal/5 px-3 py-3 flex items-start gap-3 rounded-none"
            >
              <div
                  class="h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                  style="background:#1E93AB;"
              >
                ℹ️
              </div>
              <p class="text-xs md:text-sm text-slate-700">
                Vendors don’t need to learn another system. Stage &amp; Bloom plugs into
                the Instagram and WhatsApp flows they already use, and simply makes them
                easier to discover and compare.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Expanded Footer -->
    <footer class="bg-[#0B1020] text-slate-300 mt-16">
      <div class="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <div
                class="h-8 w-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style="background:#E62727;"
            >
              SB
            </div>
            <span class="font-semibold text-sm">Stage &amp; Bloom</span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            A calm way to discover decorators, caterers, photographers, DJs and more – all
            in one place, all just a WhatsApp tap away.
          </p>
          <p class="text-[11px] text-slate-500">
            Built in Accra for people who love good events.
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3">
            Product
          </h4>
          <ul class="space-y-2 text-xs text-slate-300">
            <li><a href="#search" class="hover:text-white transition-colors">Plan an event</a></li>
            <li><a href="#vendors" class="hover:text-white transition-colors">Browse vendors</a></li>
            <li><a href="#how-it-works" class="hover:text-white transition-colors">How it works</a></li>
            <li><a href="#why-exists" class="hover:text-white transition-colors">Why it exists</a></li>
          </ul>
        </div>

        <!-- Event types -->
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3">
            Event types
          </h4>
          <ul class="space-y-2 text-xs text-slate-300">
            <li>Weddings &amp; engagements</li>
            <li>Birthdays &amp; baby showers</li>
            <li>Corporate &amp; brand events</li>
            <li>Bridal &amp; pre-wedding shoots</li>
          </ul>
        </div>

        <!-- Locations -->
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3">
            Popular areas
          </h4>
          <div class="flex flex-wrap gap-2 text-[11px]">
            <span class="px-2 py-1 rounded-full bg-white/5 border border-white/10">
              East Legon
            </span>
            <span class="px-2 py-1 rounded-full bg-white/5 border border-white/10">
              Osu
            </span>
            <span class="px-2 py-1 rounded-full bg-white/5 border border-white/10">
              Airport
            </span>
            <span class="px-2 py-1 rounded-full bg-white/5 border border-white/10">
              Spintex
            </span>
            <span class="px-2 py-1 rounded-full bg-white/5 border border-white/10">
              Tema
            </span>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-800/80">
        <div
            class="max-w-6xl mx-auto px-4 py-4 text-[11px] text-slate-500 flex flex-wrap gap-3 justify-between items-center"
        >
          <p>
            &copy; {{ new Date().getFullYear() }} Stage &amp; Bloom. All rights reserved.
          </p>
          <p class="flex items-center gap-1">
            <span class="h-1.5 w-1.5 rounded-full" style="background:#E62727;"></span>
            Soft launch – vendor data is sample/mock for now.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

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

const mode = ref<'filters' | 'ai'>('filters')

const categories: VendorCategory[] = [
  {slug: 'decorator', name: 'Decor & Styling'},
  {slug: 'caterer', name: 'Caterers & Food'},
  {slug: 'photographer', name: 'Photographers'},
  {slug: 'dj', name: 'DJs & Music'},
  {slug: 'mc', name: 'MCs & Hosts'},
  {slug: 'baker', name: 'Cakes & Desserts'}
]

const eventTypes = ref<EventType[]>([
  {
    slug: 'wedding',
    kicker: 'For your day',
    name: 'Weddings',
    description: 'Build a team for engagements, white weddings and receptions.',
    subcategories: [
      {slug: 'decorator', name: 'Decor & styling'},
      {slug: 'photographer', name: 'Photography & video'},
      {slug: 'caterer', name: 'Catering & drinks'},
      {slug: 'mc', name: 'MCs & hosts'},
      {slug: 'dj', name: 'DJs & live music'}
    ]
  },
  {
    slug: 'party',
    kicker: 'For good vibes',
    name: 'Parties',
    description: 'Birthdays, baby showers and house parties that actually feel curated.',
    subcategories: [
      {slug: 'decorator', name: 'Decor & backdrops'},
      {slug: 'baker', name: 'Cakes & desserts'},
      {slug: 'dj', name: 'DJs & playlists'},
      {slug: 'caterer', name: 'Finger foods & bites'}
    ]
  },
  {
    slug: 'corporate',
    kicker: 'For the team',
    name: 'Corporate',
    description: 'Offsites, launches, townhalls and mixers for teams and brands.',
    subcategories: [
      {slug: 'caterer', name: 'Corporate catering'},
      {slug: 'decorator', name: 'Brand & stage design'},
      {slug: 'photographer', name: 'Photo & video recap'},
      {slug: 'mc', name: 'Professional hosts'}
    ]
  },
  {
    slug: 'other',
    kicker: 'Everything else',
    name: 'Other events',
    description: 'Church events, graduations, open mics and everything in between.',
    subcategories: [
      {slug: 'decorator', name: 'General decor'},
      {slug: 'photographer', name: 'Event coverage'},
      {slug: 'dj', name: 'Sound & music'},
      {slug: 'caterer', name: 'Food & drinks'}
    ]
  }
])

const selectedSubcategories = ref<Record<string, string>>({
  wedding: '',
  party: '',
  corporate: '',
  other: ''
})

const vendors = ref<Vendor[]>([
  {
    id: 1,
    name: 'Bloom & Lace Events',
    category: 'decorator',
    categoryLabel: 'Decor & Styling',
    city: 'Accra',
    area: 'East Legon',
    description:
        'Soft, modern decor for intimate parties, bridal showers, and chic weddings. Known for clean setups and floral details.',
    startingFrom: 2500,
    pricingNote: 'per event (intimate setups)',
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
    categoryLabel: 'Caterers & Food',
    city: 'Accra',
    area: 'Airport',
    description:
        'Buffet and plated menus for Ghanaian and continental tastes. Great for corporate events and family celebrations.',
    startingFrom: 90,
    pricingNote: 'per person (min. 40 guests)',
    tags: ['Corporate', 'Traditional'],
    verified: true,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    maxBudgetHint: 20000,
    whatsappNumber: '+233200000002'
  },
  {
    id: 3,
    name: 'Lens & Love Studio',
    category: 'photographer',
    categoryLabel: 'Photographers',
    city: 'Accra',
    area: 'Spintex',
    description:
        'Documentary-style photography that captures emotions and candid moments. Perfect for weddings and milestone birthdays.',
    startingFrom: 1800,
    pricingNote: 'per event (within Accra)',
    tags: ['Weddings', 'Milestone birthdays'],
    verified: true,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/1963622/pexels-photo-1963622.jpeg',
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
    description:
        'High-energy mixes across Afrobeats, Amapiano, and old-school favourites. Great for parties and lively receptions.',
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
    categoryLabel: 'Cakes & Desserts',
    city: 'Accra',
    area: 'Tema',
    description:
        'Custom cakes and dessert tables for kids’ birthdays, bridal showers, and launches. Buttercream, fondant & minimalist styles.',
    startingFrom: 800,
    pricingNote: 'for 2-tier cakes',
    tags: ['Kids parties', 'Showers'],
    verified: true,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    maxBudgetHint: 6000,
    whatsappNumber: '+233200000005'
  },
  {
    id: 6,
    name: 'Host Kweku',
    category: 'mc',
    categoryLabel: 'MCs & Hosts',
    city: 'Accra',
    area: 'Dansoman',
    description:
        'Engaging MC who blends humour with structure. Available for weddings, corporate events, and church functions.',
    startingFrom: 2000,
    pricingNote: 'per event (within Accra)',
    tags: ['Weddings', 'Corporate'],
    verified: false,
    instagram: 'https://instagram.com',
    coverImage: 'https://images.pexels.com/photos/2306279/pexels-photo-2306279.jpeg',
    maxBudgetHint: 12000,
    whatsappNumber: '+233200000006'
  }
])

const selectedCategory = ref<string>('')
const location = ref<string>('')
const guestCount = ref<number | null>(50)
const budgetPerVendor = ref<number | null>(5000)
const aiPrompt = ref<string>('')

const filteredVendors = computed(() => {
  let list = [...vendors.value]

  if (selectedCategory.value) {
    list = list.filter((v) => v.category === selectedCategory.value)
  }

  if (location.value.trim()) {
    const needle = location.value.trim().toLowerCase()
    list = list.filter(
        (v) =>
            v.city.toLowerCase().includes(needle) ||
            v.area.toLowerCase().includes(needle)
    )
  }

  if (budgetPerVendor.value) {
    list = list.filter((v) => {
      if (!v.maxBudgetHint) return true
      return budgetPerVendor.value! <= v.maxBudgetHint
    })
  }

  return list
})

const toWhatsappLink = (vendor: Vendor): string => {
  const base = 'https://wa.me/'
  const number = vendor.whatsappNumber.replace(/[^+\d]/g, '')
  const msg = [
    `Hi ${vendor.name}, I found you on Stage & Bloom.`,
    '',
    'I’m planning an event and would love to know your availability and pricing:',
    `• Vendor type: ${vendor.categoryLabel}`,
    guestCount.value ? `• Approx. guests: ${guestCount.value}` : '',
    budgetPerVendor.value
        ? `• Budget per vendor: GHS ${budgetPerVendor.value?.toLocaleString()}`
        : ''
  ]
      .filter(Boolean)
      .join('\n')

  const encoded = encodeURIComponent(msg)
  return `${base}${encodeURIComponent(number)}?text=${encoded}`
}

const runFilterSearch = () => {
  console.info('Running filter search with:', {
    selectedCategory: selectedCategory.value,
    location: location.value,
    guestCount: guestCount.value,
    budgetPerVendor: budgetPerVendor.value
  })
}

const runAISearch = () => {
  const text = aiPrompt.value.toLowerCase()

  if (text.includes('decor')) {
    selectedCategory.value = 'decorator'
  } else if (text.includes('food') || text.includes('cater')) {
    selectedCategory.value = 'caterer'
  } else if (text.includes('photo')) {
    selectedCategory.value = 'photographer'
  } else {
    selectedCategory.value = ''
  }

  if (text.includes('osu')) {
    location.value = 'Osu'
  } else if (text.includes('east legon')) {
    location.value = 'East Legon'
  }

  const guestsMatch = text.match(/\b(\d{2,3})\b/)
  if (guestsMatch) {
    const num = Number(guestsMatch[1])
    if (!Number.isNaN(num)) {
      guestCount.value = num
    }
  }

  if (text.includes('10k') || text.includes('10000')) {
    budgetPerVendor.value = 5000
  }

  mode.value = 'filters'
}
</script>