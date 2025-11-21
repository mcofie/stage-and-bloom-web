<template>
  <div class="min-h-screen bg-[#F3F2EC] text-slate-900">
    <!-- Top bar / Navigation -->
    <header class="border-b border-stage-grey/20 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div
              class="h-9 w-9 rounded-full flex items-center justify-center font-bold text-white text-xl"
              style="background: #E62727;"
          >
            SB
          </div>
          <div>
            <div class="font-semibold tracking-tight text-lg">Stage &amp; Bloom</div>
          </div>
        </div>

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

        <button
            class="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-stage-red border border-stage-red/0 hover:bg-[#c02121] transition-colors"
        >
          List your services
        </button>
      </div>
    </header>

    <!-- Hero + Primary Filter -->
    <main class="max-w-6xl mx-auto px-4 pt-10 pb-16 space-y-14">
      <section class="space-y-6">
        <!-- Hero copy (short & focused) -->
        <div class="text-center md:text-left space-y-1">
          <p class="uppercase tracking-[0.22em] text-[11px] text-slate-500">
            Event Vendor Marketplace
          </p>
          <h1 class="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight">
            Find trusted <span class="text-stage-red">event vendors</span> for your next
            celebration in minutes.
          </h1>
        </div>

        <!-- Search / Filter panel as main attraction -->
        <div
            id="search"
            class="mt-4 rounded-3xl bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] border-border overflow-hidden"
        >

          <div class="p-4 md:p-5">
            <!-- Mode toggle -->
            <div
                class="grid grid-cols-2 gap-2 text-xs font-medium bg-[#F3F2EC] rounded-full p-1 max-w-xs mx-auto md:mx-0 mb-4"
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

            <div class="grid md:grid-cols-[3fr,2fr] gap-5 items-start">
              <!-- Filters mode -->
              <div v-if="mode === 'filters'" class="space-y-3">
                <div class="grid md:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-slate-700 mb-1">
                      What do you need?
                    </label>
                    <select
                        v-model="selectedCategory"
                        class="w-full text-sm rounded-xl border border-stage-grey/25 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-stage-red/30"
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
                        class="w-full text-sm rounded-xl border border-stage-grey/25 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-stage-red/30"
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
                        class="w-full text-sm rounded-xl border border-stage-grey/25 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-stage-red/30"
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
                    class="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow bg-stage-red hover:bg-[#c02121]"
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
                      placeholder="e.g. I want to organise a small 50-person birthday in Osu next month. Budget is about 10k. I’ll need decor, food, a cake and a DJ."
                      class="w-full text-sm rounded-2xl border border-stage-grey/25 bg-white px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-stage-red/30 resize-none"
                  />
                </div>

                <p class="text-[11px] text-slate-500">
                  We’ll parse this into vendor types, budget hints and guest count, then
                  show matching options you can contact on WhatsApp.
                </p>

                <button
                    type="button"
                    @click="runAISearch"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow bg-stage-red hover:bg-[#c02121]"
                >
                  Ask the AI planner
                </button>
              </div>

              <!-- Side summary -->
              <div class="hidden md:flex flex-col gap-3 text-xs text-slate-600">
                <div
                    class="rounded-2xl bg-[#F9F8F4] px-4 py-3 border border-stage-grey/15"
                >
                  <p class="font-semibold text-slate-800 text-sm mb-1">
                    Get a mini vendor shortlist
                  </p>
                  <p>
                    Use filters or a short description and we’ll help you narrow down to a
                    few decorators, caterers, photographers, DJs and more.
                  </p>
                </div>
                <div
                    class="rounded-2xl bg-white px-4 py-3 border border-dashed border-stage-grey/25"
                >
                  <p class="font-semibold text-slate-800 text-sm mb-1">
                    Built around Instagram &amp; WhatsApp
                  </p>
                  <p>
                    Vendors keep using the tools they already know. You simply discover and
                    compare them faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured vendors -->
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
                class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-stage-grey/20"
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
              class="bg-white/95 border border-stage-grey/15 rounded-2xl overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
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
                  class="absolute top-2 left-2 text-[10px] px-2 py-1 rounded-full bg-white/90 border border-stage-grey/20 flex items-center gap-1"
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
                  class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-sm hover:shadow-md transition-shadow bg-stage-red hover:bg-[#c02121]"
              >
                Contact on WhatsApp
              </a>
              <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl px-3 py-2 text-[11px] font-medium border border-stage-grey/20 text-slate-700 bg-white hover:bg-[#F3F2EC] transition-colors"
              >
                View details
              </button>
            </div>
          </article>
        </div>

        <div
            v-else
            class="mt-6 rounded-2xl border border-dashed border-stage-grey/25 bg-white/80 p-6 text-sm text-center text-slate-600"
        >
          No vendors match your filters just yet. Try clearing your filters or switching
          to the AI planner to describe your event in your own words.
        </div>
      </section>

      <!-- Why it exists + How it works -->
      <section id="why-exists" class="mt-6 md:mt-8">
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
              class="bg-white/90 border border-stage-grey/15 rounded-2xl p-4 md:p-5 text-sm space-y-3 shadow-sm"
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
                class="mt-3 rounded-xl border border-dashed border-stage-teal/25 bg-stage-teal/5 px-3 py-3 flex items-start gap-3"
            >
              <div
                  class="h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                  style="background: #1E93AB;"
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

    <!-- Footer -->
    <footer class="border-t border-stage-grey/20 bg-white/80 mt-10">
      <div
          class="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-500 flex flex-wrap gap-3 justify-between items-center"
      >
        <p>
          &copy; {{ new Date().getFullYear() }} Stage &amp; Bloom. Built for people who
          love good events and calm planning.
        </p>
        <p class="flex items-center gap-1">
          <span class="h-1.5 w-1.5 rounded-full" style="background: #E62727;"></span>
          Soft launch – vendor data is sample/mock for now.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'

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

const mode = ref<'filters' | 'ai'>('filters')

const categories: VendorCategory[] = [
  {slug: 'decorator', name: 'Decor & Styling'},
  {slug: 'caterer', name: 'Caterers & Food'},
  {slug: 'photographer', name: 'Photographers'},
  {slug: 'dj', name: 'DJs & Music'},
  {slug: 'mc', name: 'MCs & Hosts'},
  {slug: 'baker', name: 'Cakes & Desserts'}
]

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

// Filter search state
const selectedCategory = ref<string>('')
const location = ref<string>('')
const guestCount = ref<number | null>(50)
const budgetPerVendor = ref<number | null>(5000)

// AI mode state
const aiPrompt = ref<string>('')

// Derived list based on filters / AI interpretation
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

// Simple WhatsApp link builder with a prefilled message
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