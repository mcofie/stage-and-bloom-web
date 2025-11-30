<template>
  <div class="font-sans bg-white dark:bg-slate-900 text-slate-900 dark:text-white min-h-screen relative">
    <SiteNavbar/>

    <Transition name="fade">
      <div
v-if="isLightboxOpen"
           class="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
           @click="isLightboxOpen = false">
        <button
            class="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img
            :src="activeImage || heroImage"
            class="max-h-[90vh] max-w-full rounded-sm shadow-2xl object-contain"
            @click.stop
        >
      </div>
    </Transition>

    <main class="pt-24 pb-24">

      <section v-if="pending" class="min-h-[50vh] flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"/>
      </section>

      <section
v-else-if="error || !vendor"
               class="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Vendor not found</h2>
        <NuxtLink to="/" class="mt-4 text-rose-600 underline underline-offset-4">Return Home</NuxtLink>
      </section>

      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 animate-fade-in">

        <header class="mb-6">
          <h1 class="font-serif text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            {{ vendor.display_name }}
          </h1>

          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <span
                  class="inline-flex items-center gap-1 font-bold text-slate-900 dark:text-white underline decoration-slate-200 dark:decoration-slate-700 underline-offset-4">
                {{ vendor.vendor_categories?.name || 'Vendor' }}
              </span>
              <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"/>
              <span class="flex items-center gap-1">
                {{ vendor.area || 'Accra' }}, {{ vendor.city || 'Ghana' }}
              </span>
              <span v-if="vendor.is_verified" class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 ml-2">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"/>
                </svg>
                Verified
              </span>
            </div>

            <div class="hidden sm:flex items-center gap-2">
              <button
                  class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium underline underline-offset-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
                Share
              </button>
              <button
                  class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium underline underline-offset-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                Save
              </button>
            </div>
          </div>
        </header>

        <section class="mb-12">
          <div
              class="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">

            <div
class="col-span-2 md:col-span-2 md:row-span-2 relative cursor-pointer group"
                 @click="openLightbox(heroImage)">
              <img
                  :src="heroImage"
                  class="w-full h-full object-cover group-hover:brightness-95 transition-all"
                  alt="Main view"
              >
            </div>

            <div
                v-for="photo in galleryPhotos.slice(0, 4)"
                :key="photo.id"
                class="relative cursor-pointer group"
                @click="openLightbox(photo.image_url)"
            >
              <img
                  :src="photo.image_url"
                  class="w-full h-full object-cover group-hover:brightness-95 transition-all"
                  alt="Detail view"
              >
            </div>

            <button
                class="absolute bottom-4 right-4 bg-white dark:bg-slate-800 border border-slate-900/10 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:scale-105 transition-transform flex items-center gap-2"
                @click="openLightbox(heroImage)"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M7 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                />
              </svg>
              Show all photos
            </button>
          </div>
        </section>
        <div class="flex flex-col lg:grid lg:grid-cols-12 gap-12 relative">

          <div class="lg:col-span-7 xl:col-span-8 space-y-10">
            <div class="border-b border-slate-200 dark:border-slate-700 pb-10">
              <h2 class="font-bold text-2xl text-slate-900 dark:text-white mb-4">About this vendor</h2>
              <div class="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                <p>{{ vendor.short_bio || 'No biography provided yet.' }}</p>
              </div>
            </div>

            <div class="border-b border-slate-200 dark:border-slate-700 pb-10">
              <h2 class="font-bold text-2xl text-slate-900 dark:text-white mb-6">Services & Rates</h2>
              <div class="space-y-4">
                <div
                    v-for="r in rates"
                    :key="r.id"
                    class="flex flex-col sm:flex-row sm:items-start justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <div>
                    <h4 class="font-bold text-slate-900 dark:text-white text-lg">
                      {{ r.service_name || 'Standard Package' }}
                    </h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Pricing model: {{ pricingModel(r) }}</p>
                  </div>
                  <div class="mt-4 sm:mt-0 sm:text-right">
                    <span class="block text-xl font-bold text-slate-900 dark:text-white">
                      {{ r.starting_from_amount ? `GH₵ ${r.starting_from_amount.toLocaleString()}` : 'Custom' }}
                    </span>
                    <span v-if="r.starting_from_amount" class="text-xs text-slate-500 dark:text-slate-400">starts from</span>
                  </div>
                </div>

                <div v-if="!rates.length" class="text-slate-500 dark:text-slate-400 italic">
                  No specific packages listed. Contact for custom quote.
                </div>
              </div>
            </div>

            <div v-if="vendor.instagram_handle" class="border-b border-slate-200 dark:border-slate-700 pb-10">
              <h2 class="font-bold text-2xl text-slate-900 dark:text-white mb-6">Portfolio</h2>
              <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-rose-500 shadow-sm">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 dark:text-white">@{{ vendor.instagram_handle }}</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400">See more work on Instagram</div>
                  </div>
                </div>
                <a
                    :href="vendor.instagram_url || '#'"
                    target="_blank"
                    class="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:border-slate-400 dark:hover:border-slate-500 text-slate-900 dark:text-white transition-colors"
                >
                  Visit Profile
                </a>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 xl:col-span-4 relative">
            <div class="sticky top-24">
              <div
                  class="bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 shadow-2xl shadow-slate-900/20 dark:shadow-slate-900/50 text-white relative overflow-hidden"
              >

                <div class="flex items-baseline justify-between mb-8 pb-8 border-b border-white/10">
                  <div>
                    <span class="text-3xl font-serif font-bold text-white">
                      {{ startingFrom > 0 ? `GH₵ ${startingFrom.toLocaleString()}` : 'Contact' }}
                    </span>
                    <span v-if="startingFrom > 0" class="text-sm text-slate-400 font-light">
                      starting price
                    </span>
                  </div>
                </div>

                <div class="space-y-4">
                  <VendorActions
                      :vendor-id="vendor.id"
                      :whatsapp-number="vendor?.whatsapp_number || undefined"
                      :vendor-name="vendor.display_name"
                  />
                </div>

                <div class="mt-8 pt-6 border-t border-white/10 space-y-4 text-center">
                  <div
                      class="flex items-center justify-center gap-2 text-xs text-emerald-300 font-bold bg-white/5 py-2.5 rounded-lg border border-white/5"
                  >
                    <span class="relative flex h-2 w-2">
                      <span
                          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                      />
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"/>
                    </span>
                    Responds within 2 hours
                  </div>
                  <div class="text-xs text-slate-400 font-medium">
                    Verified Vendor • No booking fees
                  </div>
                </div>
              </div>

              <div class="mt-6 text-center">
                <a
                    href="#"
                    class="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 uppercase tracking-widest"
                >
                  Report this vendor
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>

    <footer class="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-8 mt-auto relative overflow-hidden">

      <div class="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"/>
      <div
          class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"/>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          <div class="md:col-span-4 space-y-6">
            <div class="flex items-center gap-2">
              <div
                  class="h-8 w-8 bg-rose-600 rounded-lg flex items-center justify-center font-serif font-bold text-white shadow-lg shadow-rose-900/50">
                SB
              </div>
              <span class="font-serif text-xl font-bold tracking-tight">Stage & Bloom</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
              Reimagining events in Africa. We curate the finest vendors so you can plan with confidence and style.
            </p>
            <div class="flex gap-4">
              <a
href="#"
                 class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a
href="#"
                 class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="md:col-span-2 md:col-start-6">
            <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Explore</h4>
            <ul class="space-y-3 text-sm text-slate-400">
              <li>
                <NuxtLink
to="/vendors/search?categorySlug=wedding"
                          class="hover:text-white hover:translate-x-1 transition-all inline-block">Weddings
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
to="/vendors/search?categorySlug=party"
                          class="hover:text-white hover:translate-x-1 transition-all inline-block">Parties
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
to="/vendors/search?categorySlug=corporate"
                          class="hover:text-white hover:translate-x-1 transition-all inline-block">Corporate
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/vendors/search" class="hover:text-white hover:translate-x-1 transition-all inline-block">
                  Browse All
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="md:col-span-2">
            <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Company</h4>
            <ul class="space-y-3 text-sm text-slate-400">
              <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</a></li>
              <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">For Vendors</a>
              </li>
              <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">Contact</a></li>
              <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">Privacy
                Policy</a></li>
            </ul>
          </div>

          <div class="md:col-span-3">
            <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Stay in the loop</h4>
            <p class="text-xs text-slate-400 mb-4">Get the latest vendor spotlights and planning tips delivered to your
              inbox.</p>
            <div class="flex flex-col gap-2">
              <input
type="email" placeholder="Email address"
                     class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors">
              <button
                  class="bg-white text-slate-900 hover:bg-rose-50 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors shadow-lg shadow-white/10">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div
            class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {{ new Date().getFullYear() }} Stage & Bloom. Crafted in Accra 🇬🇭</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-white transition-colors">Privacy</a>
            <a href="#" class="hover:text-white transition-colors">Terms</a>
            <a href="#" class="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute, useAsyncData, useSupabaseClient, useSeoMeta} from '#imports'
import VendorActions from '~/components/VendorActions.vue'

// --- Lightbox ---
const isLightboxOpen = ref(false)
const activeImage = ref('')
const openLightbox = (url: string) => {
  activeImage.value = url
  isLightboxOpen.value = true
}

// --- Types ---
type VendorRate = {
  id: string
  service_name: string | null
  pricing_model: string | null
  starting_from_amount: number | null
  is_active: boolean
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
  whatsapp_number: string | null
  vendor_rates: VendorRate[]
  vendor_photos: VendorPhoto[]
}

// --- Fetch Data ---
const route = useRoute()
const supabase = useSupabaseClient()
const slug = computed(() => route.params.slug as string)

const {data, pending, error} = await useAsyncData<VendorRow | null>(
    () => `vendor-${slug.value}`,
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const {data, error} = await (supabase as any)
          .schema('stagebloom')
          .from('vendors')
          .select(`
        id, slug, display_name, city, area, short_bio, is_verified, starting_price, price_range_min, price_range_max, instagram_url, instagram_handle, whatsapp_number, cover_image_url,
        vendor_categories:vendor_categories ( name ),
        vendor_rates:vendor_rates ( id, service_name, starting_from_amount, pricing_model, is_active ),
        vendor_photos:vendor_photos ( id, image_url, is_cover, sort_order )
      `)
          .eq('slug', slug.value)
          .maybeSingle()

      if (error || !data) return null
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vendor = data as any
      if (Array.isArray(vendor.vendor_categories)) {
        vendor.vendor_categories = vendor.vendor_categories[0]
      }
      
      return vendor as VendorRow
    }
)

const vendor = computed(() => data.value)

useSeoMeta({
  title: computed(() => vendor.value ? `${vendor.value.display_name} - ${vendor.value.vendor_categories?.name || 'Vendor'} in ${vendor.value.city || 'Accra'} | Stage & Bloom` : 'Vendor Profile | Stage & Bloom'),
  description: computed(() => vendor.value?.short_bio || 'Book this vendor on Stage & Bloom.'),
  ogTitle: computed(() => vendor.value ? `${vendor.value.display_name} | Stage & Bloom` : 'Vendor Profile'),
  ogDescription: computed(() => vendor.value?.short_bio || 'Book this vendor on Stage & Bloom.'),
  ogImage: computed(() => vendor.value?.cover_image_url || ''),
})

// only active rates
const rates = computed(() => vendor.value?.vendor_rates?.filter(r => r.is_active) || [])

const sortedPhotos = computed(() => {
  const arr = vendor.value?.vendor_photos || []
  return arr.slice().sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999))
})

const heroImage = computed(() => {
  if (vendor.value?.cover_image_url) return vendor.value.cover_image_url
  const cover = sortedPhotos.value.find(p => p.is_cover)
  return cover?.image_url || sortedPhotos.value[0]?.image_url || ''
})

const galleryPhotos = computed(() => sortedPhotos.value.filter(p => p.image_url !== heroImage.value))

const startingFrom = computed(() => {
  if (!vendor.value) return 0
  return (
      vendor.value.starting_price ||
      vendor.value.price_range_min ||
      rates.value[0]?.starting_from_amount ||
      0
  )
})

const pricingModel = (r: VendorRate) => {
  if (r.pricing_model === 'per_guest') return 'Per guest'
  if (r.pricing_model === 'per_event') return 'Per event'
  return 'Flexible'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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