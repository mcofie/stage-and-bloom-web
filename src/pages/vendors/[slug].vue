<template>
  <div
      class="font-sans bg-white text-slate-900 min-h-screen selection:bg-rose-200 selection:text-rose-900 relative overflow-x-hidden">

    <SiteNavbar/>

    <main class="pt-24 pb-24 relative">

      <section v-if="pending" class="min-h-[50vh] flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
      </section>

      <section v-else-if="error || !vendor"
               class="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <div class="h-16 w-16 bg-rose-50 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm">😕</div>
        <h2 class="text-xl font-bold text-slate-900">Vendor not found</h2>
        <NuxtLink to="/" class="mt-4 text-sm font-medium text-rose-600 hover:underline">Back to home</NuxtLink>
      </section>

      <div v-else class="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">

        <section class="mb-10">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-3 mb-4 text-sm">
                 <span
                     class="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider border border-rose-100 shadow-sm">
                      {{ vendor.vendor_categories?.name || 'Vendor' }}
                </span>
                <span v-if="vendor.is_verified"
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100 shadow-sm">
                    <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor"><path
                        fill-rule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.45 10.303a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l2.47 2.47 5.47-5.47a.75.75 0 00-1.06-1.06l-6 6z"
                        clip-rule="evenodd"/></svg>
                    Verified
                 </span>
              </div>
              <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                {{ vendor.display_name }}</h1>

              <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600 font-medium">
                  <span class="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    {{ vendor.area || 'Accra' }}, {{ vendor.city || 'Ghana' }}
                  </span>
                <a v-if="vendor.instagram_url" :href="vendor.instagram_url" target="_blank"
                   class="flex items-center gap-1.5 hover:text-rose-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <svg class="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span class="underline decoration-rose-200 underline-offset-4">@{{ vendor.instagram_handle }}</span>
                </a>
              </div>
            </div>

            <div class="hidden md:flex items-center gap-3">
              <button
                  class="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
              </button>
              <button
                  class="p-2.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>
          </div>

          <div
              class="grid grid-cols-1 sm:grid-cols-4 gap-3 h-[320px] sm:h-[450px] rounded-3xl overflow-hidden mb-10 shadow-xl shadow-slate-200/40 border border-slate-100 bg-white">
            <div class="sm:col-span-2 sm:row-span-2 relative bg-slate-50 group cursor-pointer"
                 @click="setActiveImage(heroImage)">
              <img :src="heroImage"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   alt="Main view"/>
            </div>
            <div v-for="(photo, index) in galleryPhotos.slice(0, 2)" :key="photo.id"
                 class="relative bg-slate-50 hidden sm:block group cursor-pointer"
                 @click="setActiveImage(photo.image_url)">
              <img :src="photo.image_url"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   alt="Detail view"/>
            </div>
            <div class="hidden sm:grid grid-rows-2 gap-3">
              <div v-if="galleryPhotos[2]" class="relative bg-slate-50 group cursor-pointer"
                   @click="setActiveImage(galleryPhotos[2].image_url)">
                <img :src="galleryPhotos[2].image_url"
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     alt="Detail view"/>
              </div>
              <div v-if="galleryPhotos[3]" class="relative bg-slate-50 group cursor-pointer"
                   @click="setActiveImage(galleryPhotos[3].image_url)">
                <img :src="galleryPhotos[3].image_url"
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     alt="Detail view"/>
                <div v-if="galleryPhotos.length > 4"
                     class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center text-white font-medium text-sm transition-colors hover:bg-slate-900/80">
                  More photos
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8 lg:gap-12 relative">

          <div class="lg:col-span-2 space-y-10">

            <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <h3 class="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                <span class="w-1 h-6 bg-rose-500 rounded-full"></span>
                About this vendor
              </h3>
              <div class="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                <p>{{ vendor.short_bio || 'No biography provided yet.' }}</p>
              </div>
            </div>

            <div v-if="rates.length">
              <h3 class="font-bold text-xl text-slate-900 mb-6 pl-2">Packages & Rates</h3>
              <div class="space-y-4">
                <div v-for="r in rates" :key="r.id"
                     class="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-rose-200 hover:shadow-md transition-all group overflow-hidden">
                  <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 class="font-bold text-slate-900 text-lg group-hover:text-rose-700 transition-colors">
                        {{ r.service_name || 'Service Package' }}</h4>
                      <p class="text-sm text-slate-500 mt-1">Based on {{ pricingModel(r) }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-xs text-slate-400 uppercase font-bold tracking-wide mb-1">Starts from</p>
                      <p class="text-2xl font-serif font-bold text-slate-900" v-if="r.starting_from_amount">GH₵
                        {{ r.starting_from_amount.toLocaleString() }}</p>
                      <p class="text-lg font-bold text-slate-400 italic" v-else>Custom Quote</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-8 shadow-sm">
              <div class="flex items-start gap-4">
                <div class="p-3 bg-white rounded-xl shadow-sm text-rose-500 ring-1 ring-slate-100 hidden sm:block">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900 text-sm mb-1">Book with confidence</h4>
                  <p class="text-sm text-slate-600 leading-relaxed">
                    Vendors on Stage & Bloom are verified for identity and portfolio authenticity.
                    Secure payments and reliable service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="lg:sticky lg:top-24 space-y-6">

              <div
                  class="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 p-6 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-orange-400"></div>

                <div class="flex items-baseline justify-between mb-8 pb-6 border-b border-slate-100">
                      <span class="text-3xl font-serif font-bold text-slate-900">
                        <span v-if="startingFrom > 0">GH₵ {{ startingFrom.toLocaleString() }}</span>
                        <span v-else>Contact</span>
                      </span>
                  <span
                      class="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">Starting</span>
                </div>

                <div class="flex flex-col gap-3 relative z-10">
                  <VendorActions
                      :vendor-id="vendor.id"
                      :whatsapp-number="vendor?.whatsapp_number"
                      :vendor-name="vendor.display_name"
                  />
                </div>

                <div class="mt-6 pt-4 border-t border-slate-50 flex justify-center">
                  <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <span class="relative flex h-2 w-2">
                          <span
                              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    Responds quickly
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>

    <footer class="bg-white border-t border-slate-100 py-10 mt-auto relative z-10">
      <div
          class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <div class="flex items-center gap-2">
          <span class="font-serif font-bold text-slate-900">Stage &amp; Bloom</span>
          <span>&copy; {{ new Date().getFullYear() }}</span>
        </div>
        <div class="flex gap-6">
          <a href="#" class="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useRoute, useAsyncData, useSupabaseClient} from '#imports'
import VendorActions from '~/components/VendorActions.vue'

// Types
type VendorRate = {
  id: string;
  service_name: string | null;
  pricing_model: string | null;
  starting_from_amount: number | null
}
type VendorPhoto = { id: string; image_url: string; is_cover: boolean; sort_order: number | null }
type VendorRow = {
  id: string; slug: string; display_name: string; city: string | null; area: string | null;
  short_bio: string | null; is_verified: boolean; starting_price: number | null;
  price_range_min: number | null; price_range_max: number | null;
  instagram_url?: string | null; instagram_handle?: string | null; cover_image_url?: string | null;
  vendor_categories: { name: string } | null;
  whatsapp_number: string | null;
  vendor_rates: VendorRate[]; vendor_photos: VendorPhoto[]
}

const route = useRoute()
const supabase = useSupabaseClient()
const slug = computed(() => route.params.slug as string)

const {data, pending, error} = await useAsyncData<VendorRow | null>(
    () => `vendor-${slug.value}`,
    async () => {
      const {data, error} = await supabase.schema('stagebloom').from('vendors')
          .select(`
        id, slug, display_name, city, area, short_bio, is_verified, starting_price, price_range_min, price_range_max, instagram_url, instagram_handle, whatsapp_number, cover_image_url,
        vendor_categories:vendor_categories ( name ),
        vendor_rates:vendor_rates ( id, service_name, starting_from_amount, pricing_model ),
        vendor_photos:vendor_photos ( id, image_url, is_cover, sort_order )
      `)
          .eq('slug', slug.value).maybeSingle()

      if (error) return null
      return (data as VendorRow) || null
    }
)

const vendor = computed(() => data.value)
const rates = computed(() => vendor.value?.vendor_rates || [])
const sortedPhotos = computed(() => {
  const arr = vendor.value?.vendor_photos || []
  return arr.slice().sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999))
})

const activeImage = ref('')
const setActiveImage = (url: string) => {
  activeImage.value = url
}

const heroImage = computed(() => {
  if (activeImage.value) return activeImage.value
  if (vendor.value?.cover_image_url) return vendor.value.cover_image_url
  const cover = sortedPhotos.value.find((p) => p.is_cover)
  return cover?.image_url || sortedPhotos.value[0]?.image_url || ''
})

// Get photos excluding the hero if needed, or just all for grid
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
  animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>