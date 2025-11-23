<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen selection:bg-rose-100 selection:text-rose-900">
    <header class="fixed top-0 w-full z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
              class="relative flex items-center justify-center h-10 w-10 bg-rose-600 text-white font-serif font-bold text-xl rounded-xl shadow-lg shadow-rose-200 group-hover:scale-105 transition-transform"
          >
            SB
          </div>
          <div class="leading-none">
            <h1 class="font-serif font-bold text-xl text-slate-900 tracking-tight">Stage &amp; Bloom</h1>
            <p class="text-[10px] uppercase tracking-widest text-slate-500 mt-1">The Event Collective</p>
          </div>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <NuxtLink to="/" class="hover:text-rose-600 transition-colors">Home</NuxtLink>
          <NuxtLink to="/vendors/search" class="hover:text-rose-600 transition-colors">Search</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="pt-32 pb-24">
      <section v-if="pending"
               class="max-w-7xl mx-auto px-4 sm:px-6 min-h-[50vh] flex flex-col items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mb-4"></div>
        <p class="text-slate-500 text-sm">Loading vendor details...</p>
      </section>

      <section v-else-if="error || !vendor" class="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div class="mx-auto h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-2xl">
          😕
        </div>
        <h2 class="text-2xl font-serif font-semibold text-slate-900 mb-2">
          Vendor not found
        </h2>
        <p class="text-slate-500 mb-8">The vendor you are looking for might have been removed or the link is
          incorrect.</p>
        <NuxtLink
            to="/"
            class="inline-flex items-center justify-center px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-rose-600 transition-colors"
        >
          ← Return to Home
        </NuxtLink>
      </section>

      <section v-else class="max-w-7xl mx-auto px-4 sm:px-6 animate-fade-in">

        <nav class="flex items-center text-sm text-slate-500 mb-8">
          <NuxtLink to="/" class="hover:text-slate-900 transition-colors">Home</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-slate-900 font-medium truncate">{{ vendor.display_name }}</span>
        </nav>

        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">

          <div class="lg:col-span-7 space-y-8">

            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-3">
                <span
                    class="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  {{ vendor.vendor_categories?.name || 'Event Vendor' }}
                </span>
                <span
                    v-if="vendor.is_verified"
                    class="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100"
                >
                  <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd"
                                                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                              clip-rule="evenodd"/></svg>
                  Verified
                </span>
              </div>

              <h1 class="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                {{ vendor.display_name }}
              </h1>

              <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm">
                <div class="flex items-center gap-2 text-slate-500">
                  <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{{ vendor.area || 'Accra' }}, {{ vendor.city || 'Ghana' }}</span>
                </div>

                <a
                    v-if="vendor.instagram_url"
                    :href="vendor.instagram_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-rose-600 font-medium hover:text-rose-800 hover:underline transition-all"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468.93c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clip-rule="evenodd"/>
                  </svg>
                  <span>@{{ vendor.instagram_handle || 'Instagram' }}</span>
                </a>
              </div>
            </div>

            <div class="prose prose-slate prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
              <p>{{ vendor.short_bio || 'This vendor has not provided a bio yet.' }}</p>
            </div>

            <div
                class="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p class="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Starting from</p>
                <div class="flex items-baseline gap-1">
                  <span v-if="startingFrom > 0" class="text-2xl font-serif font-bold text-slate-900">GH₵ {{
                      startingFrom.toLocaleString()
                    }}</span>
                  <span v-else class="text-xl font-serif font-bold text-slate-900">Contact for Pricing</span>

                  <span class="text-sm text-slate-500 font-medium" v-if="startingFrom > 0 && rates[0]?.pricing_model">/ {{
                      pricingModel(rates[0])
                    }}</span>
                </div>
              </div>

              <VendorActions :vendor-id="vendor.id" class="w-full sm:w-auto"/>
            </div>

            <div v-if="rates.length" class="pt-8 border-t border-slate-100">
              <h3 class="font-serif text-xl font-bold text-slate-900 mb-6">Packages &amp; Services</h3>
              <div class="grid gap-4">
                <div
                    v-for="r in rates"
                    :key="r.id"
                    class="group bg-white p-5 rounded-xl border border-slate-200 hover:border-rose-200 hover:shadow-sm transition-all"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-medium text-slate-900">{{ r.service_name || 'Service Package' }}</h4>
                      <p class="text-xs text-slate-500 mt-1">{{ pricingModel(r) }} based pricing</p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-bold text-slate-900" v-if="r.starting_from_amount">GH₵
                        {{ r.starting_from_amount.toLocaleString() }}</p>
                      <p class="text-sm font-bold text-slate-500 italic" v-else>On Request</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="lg:col-span-5 space-y-6">
            <div class="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
              <div class="absolute inset-0 bg-slate-200 animate-pulse" v-if="!heroImage"></div>
              <img
                  v-else
                  :src="heroImage"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  :alt="vendor.display_name"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
            </div>

            <div v-if="galleryPhotos.length" class="grid grid-cols-3 gap-3">
              <div
                  v-for="photo in galleryPhotos.slice(0, 3)"
                  :key="photo.id"
                  @click="setActiveImage(photo.image_url)"
                  class="aspect-square rounded-xl overflow-hidden border border-slate-100 cursor-pointer hover:opacity-90 hover:border-rose-300 transition-all"
                  :class="{ 'ring-2 ring-rose-500': heroImage === photo.image_url }"
              >
                <img :src="photo.image_url" class="w-full h-full object-cover" alt="Gallery photo"/>
              </div>
              <div v-if="galleryPhotos.length > 3"
                   class="aspect-square rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-medium border border-slate-200">
                +{{ galleryPhotos.length - 3 }} more
              </div>
            </div>

            <div class="bg-rose-50/50 rounded-2xl p-6 border border-rose-100 mt-6">
              <h4 class="font-serif text-lg font-bold text-rose-900 mb-2">Why book on Stage &amp; Bloom?</h4>
              <ul class="space-y-3">
                <li class="flex items-start gap-3 text-sm text-rose-800/80">
                  <svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Verified vendors vetted for quality and reliability.</span>
                </li>
                <li class="flex items-start gap-3 text-sm text-rose-800/80">
                  <svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <span>Secure connection directly via WhatsApp.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </main>

    <footer class="bg-white border-t border-slate-100 py-10 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-2">
          <div
              class="h-6 w-6 bg-slate-900 text-white font-serif font-bold flex items-center justify-center rounded text-xs">
            SB
          </div>
          <span class="font-serif font-bold text-slate-900">Stage &amp; Bloom</span>
        </div>
        <p class="text-xs text-slate-500">© {{ new Date().getFullYear() }} Stage &amp; Bloom. Made with ♥ in Accra.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useRoute, useAsyncData, useSupabaseClient} from '#imports'
import VendorActions from '~/components/VendorActions.vue'

// --- Types ---
type VendorRate = {
  id: string
  service_name: string | null
  pricing_model: string | null
  starting_from_amount: number | null
}

type VendorPhoto = {
  id: string
  image_url: string
  is_cover: boolean
  sort_order: number | null
}

type VendorRow = {
  id: string
  slug: string
  display_name: string
  city: string | null
  area: string | null
  short_bio: string | null
  is_verified: boolean
  starting_price: number | null
  price_range_min: number | null
  price_range_max: number | null
  instagram_url?: string | null
  instagram_handle?: string | null
  cover_image_url?: string | null
  vendor_categories: { name: string } | null
  vendor_rates: VendorRate[]
  vendor_photos: VendorPhoto[]
}

const route = useRoute()
const supabase = useSupabaseClient()
const slug = computed(() => route.params.slug as string)

// --- Data Fetching ---
const {data, pending, error} = await useAsyncData<VendorRow | null>(
    () => `vendor-${slug.value}`,
    async () => {
      const {data, error} = await supabase
          .schema('stagebloom')
          .from('vendors')
          .select(`
        id, slug, display_name, city, area, short_bio, is_verified,
        starting_price, price_range_min, price_range_max, instagram_url, instagram_handle, cover_image_url,
        vendor_categories:vendor_categories ( name ),
        vendor_rates:vendor_rates ( id, service_name, starting_from_amount, pricing_model ),
        vendor_photos:vendor_photos ( id, image_url, is_cover, sort_order )
      `)
          .eq('slug', slug.value)
          .maybeSingle()

      if (error) {
        console.error('Error loading vendor', error)
        return null
      }
      return (data as VendorRow) || null
    }
)

// --- Computed Properties ---
const vendor = computed(() => data.value)
const rates = computed(() => vendor.value?.vendor_rates || [])

const sortedPhotos = computed(() => {
  const arr = vendor.value?.vendor_photos || []
  return arr.slice().sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999))
})

// Image Logic
const activeImage = ref('')

const setActiveImage = (url: string) => {
  activeImage.value = url
}

// Updated Hero Image Logic
const heroImage = computed(() => {
  if (activeImage.value) return activeImage.value

  // 1. Use explicit cover from main record if available
  if (vendor.value?.cover_image_url) return vendor.value.cover_image_url

  // 2. Fallback to photos marked as cover
  const cover = sortedPhotos.value.find((p) => p.is_cover)

  // 3. Fallback to first photo or empty string
  return cover?.image_url || sortedPhotos.value[0]?.image_url || ''
})

const galleryPhotos = computed(() => sortedPhotos.value)

const startingFrom = computed(() => {
  if (!vendor.value) return 0
  return vendor.value.starting_price || vendor.value.price_range_min || rates.value[0]?.starting_from_amount || 0
})

const pricingModel = (r: VendorRate) => {
  if (r.pricing_model === 'per_guest') return 'Per guest'
  if (r.pricing_model === 'per_event') return 'Per event'
  return 'Flexible'
}
</script>

<style scoped>
/* Simple fade animation for page load */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
</style>