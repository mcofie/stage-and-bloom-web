<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen">
    <!-- Header -->
    <header class="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/admin/vendors" class="flex items-center gap-3 group">
          <div
              class="relative flex items-center justify-center h-9 w-9 bg-rose-600 text-white font-serif font-bold text-lg rounded-xl shadow-md shadow-rose-200 group-hover:scale-105 transition-transform"
          >
            SB
          </div>
          <div class="leading-none">
            <p class="text-[10px] uppercase tracking-[0.2em] text-slate-400">Admin</p>
            <h1 class="font-serif font-semibold text-lg text-slate-900 tracking-tight">
              Edit vendor
            </h1>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-3 text-xs">
          <NuxtLink
              to="/admin/vendors"
              class="text-slate-500 hover:text-rose-600 inline-flex items-center gap-1"
          >
            ← Back to vendors
          </NuxtLink>
          <NuxtLink
              v-if="vendorForm.slug"
              :to="`/vendors/${vendorForm.slug}`"
              class="hidden sm:inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] text-slate-700 hover:border-rose-400 hover:text-rose-700"
              target="_blank"
          >
            View public profile ↗
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <!-- LOADING / ERROR -->
      <section v-if="pending" class="space-y-4">
        <div class="h-8 w-40 bg-slate-100 rounded-xl animate-pulse"/>
        <div class="h-40 bg-slate-100 rounded-2xl animate-pulse"/>
        <div class="h-40 bg-slate-100 rounded-2xl animate-pulse"/>
      </section>

      <section
          v-else-if="loadError || !rawVendor"
          class="bg-white border border-red-100 rounded-2xl p-6 text-sm text-red-700"
      >
        Failed to load vendor.
        <span v-if="(loadError as any)?.message">
          {{ (loadError as any).message }}
        </span>
      </section>

      <section v-else class="space-y-8">
        <!-- Title -->
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Vendor
          </p>
          <h2 class="font-serif text-3xl font-semibold text-slate-900 mb-1">
            {{ vendorForm.display_name || 'Untitled vendor' }}
          </h2>
          <p class="text-xs text-slate-500 max-w-xl">
            Edit the vendor’s details, then manage their rates and photos below.
          </p>

          <div class="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span
                v-if="currentCategoryName"
                class="inline-flex items-center gap-1 rounded-full bg-slate-900 text-white px-3 py-1"
            >
              {{ currentCategoryName }}
              <span class="text-[9px] opacity-70">
                ({{ currentCategorySlug }})
              </span>
            </span>
            <span
                class="inline-flex items-center gap-1 rounded-full px-3 py-1"
                :class="vendorForm.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'"
            >
              <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="vendorForm.is_active ? 'bg-emerald-500' : 'bg-slate-400'"
              />
              {{ vendorForm.is_active ? 'Active' : 'Hidden' }}
            </span>
            <span
                class="inline-flex items-center gap-1 rounded-full px-3 py-1"
                :class="vendorForm.is_verified ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'"
            >
              ✓ {{ vendorForm.is_verified ? 'Verified' : 'Not verified' }}
            </span>
          </div>
        </div>

        <!-- Details form -->
        <section class="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="font-serif text-lg font-semibold text-slate-900">
              Details
            </h3>
            <button
                :disabled="savingDetails"
                class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-1.5 text-xs font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                @click="saveDetails"
            >
              <span v-if="savingDetails">Saving…</span>
              <span v-else>Save changes</span>
            </button>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1.5 md:col-span-2">
              <label class="text-xs font-semibold text-slate-600">Display name</label>
              <input
                  v-model="vendorForm.display_name"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Slug</label>
              <input
                  v-model="vendorForm.slug"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
              <p class="text-[10px] text-slate-400">
                /vendors/{{ vendorForm.slug || 'vendor-slug' }}
              </p>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Category</label>
              <select
                  v-model="vendorForm.category_id"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
                <option
                    v-for="cat in categories"
                    :key="cat.id"
                    :value="cat.id"
                >
                  {{ cat.name }} ({{ cat.slug }})
                </option>
              </select>
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="space-y-1.5 md:col-span-2">
              <label class="text-xs font-semibold text-slate-600">City</label>
              <input
                  v-model="vendorForm.city"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Area</label>
              <input
                  v-model="vendorForm.area"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Starting price (GHS)</label>
              <input
                  v-model.number="vendorForm.starting_price"
                  type="number"
                  min="0"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Price range min</label>
              <input
                  v-model.number="vendorForm.price_range_min"
                  type="number"
                  min="0"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Price range max</label>
              <input
                  v-model.number="vendorForm.price_range_max"
                  type="number"
                  min="0"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">WhatsApp number</label>
              <input
                  v-model="vendorForm.whatsapp_number"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Instagram handle</label>
              <input
                  v-model="vendorForm.instagram_handle"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-600">Cover image URL</label>
            <input
                v-model="vendorForm.cover_image_url"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            >
            <p class="text-[10px] text-slate-400">
              Shown on search cards and vendor profile hero.
            </p>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-600">Short bio</label>
            <textarea
                v-model="vendorForm.short_bio"
                rows="3"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 resize-none"
            />
          </div>

          <div class="flex flex-wrap gap-4 text-xs text-slate-600">
            <label class="inline-flex items-center gap-2">
              <input
                  v-model="vendorForm.is_active"
                  type="checkbox"
                  class="rounded border-slate-300 text-rose-600 focus:ring-rose-500/30"
              >
              Active in search
            </label>
            <label class="inline-flex items-center gap-2">
              <input
                  v-model="vendorForm.is_verified"
                  type="checkbox"
                  class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30"
              >
              Verified vendor
            </label>
          </div>

          <p v-if="detailsError" class="text-xs text-red-600">
            {{ detailsError }}
          </p>
          <p v-if="detailsSuccess" class="text-xs text-emerald-600">
            {{ detailsSuccess }}
          </p>
        </section>

        <!-- RATES -->
        <section class="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-serif text-lg font-semibold text-slate-900">
                Rates
              </h3>
              <p class="text-xs text-slate-500">
                Quick snapshot of what they charge. You can add multiple services.
              </p>
            </div>
          </div>

          <!-- Existing rates -->
          <div v-if="rates.length" class="space-y-2">
            <div
                v-for="rate in rates"
                :key="rate.id"
                class="flex items-start justify-between border border-slate-100 rounded-xl px-3 py-2 text-[11px] bg-slate-50/60"
            >
              <div>
                <div class="font-semibold text-slate-900">
                  {{ rate.service_name }}
                  <span
v-if="rate.is_primary"
                        class="ml-2 rounded-full bg-slate-900 text-white px-2 py-0.5 text-[10px]">
                    Primary
                  </span>
                </div>
                <div class="text-slate-600 mt-0.5">
                  {{ rate.pricing_model === 'per_guest' ? 'Per guest' : 'Per event' }}
                  • GH₵ {{ rate.starting_from_amount.toLocaleString() }}
                  <span v-if="rate.unit_label"> ({{ rate.unit_label }})</span>
                </div>
                <div class="text-slate-400 mt-0.5">
                  <span v-if="rate.min_guests">from {{ rate.min_guests }}</span>
                  <span v-if="rate.min_guests && rate.max_guests"> to </span>
                  <span v-if="rate.max_guests">{{ rate.max_guests }} guests</span>
                </div>
                <div v-if="rate.notes" class="text-slate-500 mt-0.5">
                  {{ rate.notes }}
                </div>
              </div>
              <div class="flex flex-col items-end gap-2 text-[10px]">
                <button
                    class="text-slate-500 hover:text-slate-900"
                    @click="toggleRateActive(rate)"
                >
                  {{ rate.is_active ? 'Deactivate' : 'Activate' }}
                </button>

                <button
                    class="text-red-500 hover:text-red-700"
                    @click="deleteRate(rate)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <p v-else class="text-xs text-slate-500">
            No rates yet.
          </p>

          <!-- Add rate -->
          <div class="mt-4 border-t border-slate-100 pt-4 space-y-3">
            <p class="text-xs font-semibold text-slate-700">
              Add rate
            </p>
            <div class="grid gap-3 md:grid-cols-4">
              <input
                  v-model="newRate.service_name"
                  type="text"
                  placeholder="Service (e.g. Full wedding decor)"
                  class="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
              <select
                  v-model="newRate.pricing_model"
                  class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
                <option value="per_event">Per event</option>
                <option value="per_guest">Per guest</option>
              </select>
              <input
                  v-model.number="newRate.starting_from_amount"
                  type="number"
                  min="0"
                  placeholder="From (GHS)"
                  class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
            <div class="grid gap-3 md:grid-cols-4">
              <input
                  v-model="newRate.unit_label"
                  type="text"
                  placeholder="e.g. up to 200 guests"
                  class="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
              <input
                  v-model.number="newRate.min_guests"
                  type="number"
                  min="0"
                  placeholder="Min guests"
                  class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
              <input
                  v-model.number="newRate.max_guests"
                  type="number"
                  min="0"
                  placeholder="Max guests"
                  class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <p class="text-slate-400">
                Keep it simple; one or two key rates is enough to start.
              </p>
              <button
                  :disabled="savingRate"
                  class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-1.5 text-[11px] font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="addRate"
              >
                <span v-if="savingRate">Adding…</span>
                <span v-else>Add rate</span>
              </button>
            </div>
            <p v-if="rateError" class="text-[11px] text-red-600">
              {{ rateError }}
            </p>
          </div>
        </section>

        <!-- PHOTOS -->
        <section class="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-serif text-lg font-semibold text-slate-900">
                Photos
              </h3>
              <p class="text-xs text-slate-500">
                Add a few images to give a feel for their work. For now, paste image URLs.
              </p>
            </div>
          </div>

          <!-- Existing photos -->
          <div v-if="photos.length" class="grid gap-3 sm:grid-cols-3 md:grid-cols-4">
            <div
                v-for="photo in photos"
                :key="photo.id"
                class="border border-slate-100 rounded-xl overflow-hidden bg-slate-50 flex flex-col"
            >
              <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                    :src="photo.image_url"
                    class="w-full h-full object-cover"
                    :alt="photo.caption || 'Vendor photo'"
                >
              </div>
              <div class="p-2 space-y-1 text-[11px]">
                <p class="font-medium text-slate-800 line-clamp-2">
                  {{ photo.caption || 'No caption' }}
                </p>
                <div class="flex items-center justify-between pt-1">
                  <button
                      class="text-slate-500 hover:text-slate-900"
                      @click="setCoverPhoto(photo)"
                  >
                    {{ photo.is_cover ? 'Cover' : 'Make cover' }}
                  </button>

                  <button
                      class="text-red-500 hover:text-red-700"
                      @click="deletePhoto(photo)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-xs text-slate-500">
            No photos yet.
          </p>

          <!-- Add photo -->
          <div class="mt-4 border-t border-slate-100 pt-4 space-y-3">
            <p class="text-xs font-semibold text-slate-700">
              Add photo
            </p>
            <div class="grid gap-3 md:grid-cols-3">
              <input
                  v-model="newPhoto.image_url"
                  type="text"
                  placeholder="Image URL"
                  class="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
              <input
                  v-model="newPhoto.caption"
                  type="text"
                  placeholder="Caption (optional)"
                  class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <label class="inline-flex items-center gap-2 text-slate-600">
                <input
                    v-model="newPhoto.is_cover"
                    type="checkbox"
                    class="rounded border-slate-300 text-rose-600 focus:ring-rose-500/30"
                >
                Set as cover
              </label>
              <button
                  :disabled="savingPhoto"
                  class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-1.5 text-[11px] font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="addPhoto"
              >
                <span v-if="savingPhoto">Adding…</span>
                <span v-else>Add photo</span>
              </button>
            </div>
            <p v-if="photoError" class="text-[11px] text-red-600">
              {{ photoError }}
            </p>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import type { Database } from '~/types/database.types'

definePageMeta({
  middleware: 'admin'
})

const route = useRoute()
const vendorId = route.params.id as string



const client = useSupabaseClient<Database>()

type VendorRow = {
  id: string
  slug: string
  display_name: string
  category_id: string | null
  city: string | null
  area: string | null
  country_code: string | null
  starting_price: number | null
  price_range_min: number | null
  price_range_max: number | null
  whatsapp_number: string | null
  instagram_handle: string | null
  cover_image_url: string | null
  short_bio: string | null
  is_active: boolean
  is_verified: boolean
  currency_code: string | null
  vendor_categories: { id: string; slug: string; name: string } | null
}

type CategoryRow = {
  id: string
  slug: string
  name: string
}

type RateRow = {
  id: string
  vendor_id: string
  service_name: string
  pricing_model: 'per_event' | 'per_guest'
  unit_label: string | null
  starting_from_amount: number
  currency_code: string | null
  min_guests: number | null
  max_guests: number | null
  is_primary: boolean
  is_active: boolean
  notes: string | null
}

type PhotoRow = {
  id: string
  vendor_id: string
  image_url: string
  caption: string | null
  is_cover: boolean
}

const {
  data,
  pending,
  error: loadError,
  refresh
} = await useAsyncData('admin-vendor-' + vendorId, async () => {
  const [vendorRes, catRes, rateRes, photoRes] = await Promise.all([
    client
        .from('vendors')
        .select(
            `
        id,
        slug,
        display_name,
        category_id,
        city,
        area,
        country_code,
        starting_price,
        price_range_min,
        price_range_max,
        whatsapp_number,
        instagram_handle,
        cover_image_url,
        short_bio,
        is_active,
        is_verified,
        currency_code,
        vendor_categories:vendor_categories!vendors_category_id_fkey (
          id,
          slug,
          name
        )
      `
        )
        .eq('id', vendorId)
        .maybeSingle(),
    client
        .from('vendor_categories')
        .select('id, slug, name')
        .eq('is_active', true)
        .order('sort_order', {ascending: true})
        .order('name', {ascending: true}),
    client
        .from('vendor_rates')
        .select(
            'id, vendor_id, service_name, pricing_model, unit_label, starting_from_amount, currency_code, min_guests, max_guests, is_primary, is_active, notes'
        )
        .eq('vendor_id', vendorId)
        .order('created_at', {ascending: false}),
    client
        .from('vendor_photos')
        .select('id, vendor_id, image_url, caption, is_cover')
        .eq('vendor_id', vendorId)
        .order('is_cover', {ascending: false})
        .order('sort_order', {ascending: true})
        .order('created_at', {ascending: false})
  ])

  if (vendorRes.error) throw vendorRes.error
  if (!vendorRes.data) throw new Error('Vendor not found')

  return {
    vendor: vendorRes.data as VendorRow,
    categories: (catRes.data || []) as CategoryRow[],
    rates: (rateRes.data || []) as RateRow[],
    photos: (photoRes.data || []) as PhotoRow[]
  }
})

const rawVendor = computed(() => data.value?.vendor as VendorRow | undefined)
const categories = computed(() => (data.value?.categories || []) as CategoryRow[])
const rates = ref<RateRow[]>(data.value?.rates || [])
const photos = ref<PhotoRow[]>(data.value?.photos || [])

// Form state
const vendorForm = ref({
  id: rawVendor.value?.id || '',
  slug: rawVendor.value?.slug || '',
  display_name: rawVendor.value?.display_name || '',
  category_id: rawVendor.value?.category_id || '',
  city: rawVendor.value?.city || '',
  area: rawVendor.value?.area || '',
  starting_price: rawVendor.value?.starting_price || null,
  price_range_min: rawVendor.value?.price_range_min || null,
  price_range_max: rawVendor.value?.price_range_max || null,
  whatsapp_number: rawVendor.value?.whatsapp_number || '',
  instagram_handle: rawVendor.value?.instagram_handle || '',
  cover_image_url: rawVendor.value?.cover_image_url || '',
  short_bio: rawVendor.value?.short_bio || '',
  is_active: rawVendor.value?.is_active ?? true,
  is_verified: rawVendor.value?.is_verified ?? false
})

watchEffect(() => {
  if (!rawVendor.value) return
  vendorForm.value = {
    id: rawVendor.value.id,
    slug: rawVendor.value.slug,
    display_name: rawVendor.value.display_name,
    category_id: rawVendor.value.category_id || '',
    city: rawVendor.value.city || '',
    area: rawVendor.value.area || '',
    starting_price: rawVendor.value.starting_price,
    price_range_min: rawVendor.value.price_range_min,
    price_range_max: rawVendor.value.price_range_max,
    whatsapp_number: rawVendor.value.whatsapp_number || '',
    instagram_handle: rawVendor.value.instagram_handle || '',
    cover_image_url: rawVendor.value.cover_image_url || '',
    short_bio: rawVendor.value.short_bio || '',
    is_active: rawVendor.value.is_active,
    is_verified: rawVendor.value.is_verified
  }
})

const currentCategory = computed(() =>
    categories.value.find((c) => c.id === vendorForm.value.category_id)
)
const currentCategoryName = computed(() => currentCategory.value?.name || '')
const currentCategorySlug = computed(() => currentCategory.value?.slug || '')

const savingDetails = ref(false)
const detailsError = ref('')
const detailsSuccess = ref('')

const saveDetails = async () => {
  detailsError.value = ''
  detailsSuccess.value = ''
  savingDetails.value = true
  try {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      slug: vendorForm.value.slug.trim(),
      display_name: vendorForm.value.display_name.trim(),
      category_id: vendorForm.value.category_id || null,
      city: vendorForm.value.city.trim() || null,
      area: vendorForm.value.area.trim() || null,
      starting_price: vendorForm.value.starting_price || null,
      price_range_min: vendorForm.value.price_range_min || null,
      price_range_max: vendorForm.value.price_range_max || null,
      whatsapp_number: vendorForm.value.whatsapp_number.trim() || null,
      instagram_handle: vendorForm.value.instagram_handle.trim() || null,
      cover_image_url: vendorForm.value.cover_image_url.trim() || null,
      short_bio: vendorForm.value.short_bio.trim() || null,
      is_active: vendorForm.value.is_active,
      is_verified: vendorForm.value.is_verified,
      currency_code: 'GHS'
    }

    const {error} = await (client
        .from('vendors') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        .update(payload)
        .eq('id', vendorId)

    if (error) {
      console.error('Update vendor error:', error)
      detailsError.value = error.message
      return
    }

    detailsSuccess.value = 'Saved.'
    await refresh()
  } finally {
    savingDetails.value = false
  }
}

// RATES
const newRate = ref({
  service_name: '',
  pricing_model: 'per_event' as 'per_event' | 'per_guest',
  starting_from_amount: null as number | null,
  unit_label: '',
  min_guests: null as number | null,
  max_guests: null as number | null
})
const savingRate = ref(false)
const rateError = ref('')

const addRate = async () => {
  rateError.value = ''
  if (!newRate.value.service_name || !newRate.value.starting_from_amount) {
    rateError.value = 'Service name and starting amount are required.'
    return
  }

  savingRate.value = true
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      vendor_id: vendorId,
      service_name: newRate.value.service_name.trim(),
      pricing_model: newRate.value.pricing_model,
      starting_from_amount: newRate.value.starting_from_amount,
      unit_label: newRate.value.unit_label.trim() || null,
      min_guests: newRate.value.min_guests || null,
      max_guests: newRate.value.max_guests || null,
      currency_code: 'GHS',
      is_active: true
    }

    const {error, data} = await (client
        .from('vendor_rates') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        .insert(payload)
        .select('*')
        .maybeSingle()

    if (error) {
      console.error('Add rate error:', error)
      rateError.value = error.message
      return
    }

    if (data) {
      rates.value.unshift(data as RateRow)
    }

    newRate.value = {
      service_name: '',
      pricing_model: 'per_event',
      starting_from_amount: null,
      unit_label: '',
      min_guests: null,
      max_guests: null
    }
  } finally {
    savingRate.value = false
  }
}

const toggleRateActive = async (rate: RateRow) => {
  const {error} = await (client
      .from('vendor_rates') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({is_active: !rate.is_active})
      .eq('id', rate.id)

  if (error) {
    alert('Failed to update rate: ' + error.message)
    return
  }

  rate.is_active = !rate.is_active
}

// PHOTOS
const newPhoto = ref({
  image_url: '',
  caption: '',
  is_cover: false
})
const savingPhoto = ref(false)
const photoError = ref('')

const addPhoto = async () => {
  photoError.value = ''
  if (!newPhoto.value.image_url) {
    photoError.value = 'Image URL is required.'
    return
  }

  savingPhoto.value = true
  try {
    // If setting cover, clear existing covers
    if (newPhoto.value.is_cover && photos.value.length) {
      await (client
          .from('vendor_photos') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
          .update({is_cover: false})
          .eq('vendor_id', vendorId)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      vendor_id: vendorId,
      image_url: newPhoto.value.image_url.trim(),
      caption: newPhoto.value.caption.trim() || null,
      is_cover: newPhoto.value.is_cover
    }

    const {error, data} = await (client
        .from('vendor_photos') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        .insert(payload)
        .select('*')
        .maybeSingle()

    if (error) {
      console.error('Add photo error:', error)
      photoError.value = error.message
      return
    }

    if (data) {
      // Put cover first
      if ((data as PhotoRow).is_cover) {
        photos.value = [data as PhotoRow, ...photos.value.map((p) => ({...p, is_cover: false}))]
      } else {
        photos.value.unshift(data as PhotoRow)
      }
    }

    newPhoto.value = {
      image_url: '',
      caption: '',
      is_cover: false
    }
  } finally {
    savingPhoto.value = false
  }
}

const setCoverPhoto = async (photo: PhotoRow) => {
  if (photo.is_cover) return

  const {error} = await (client
      .from('vendor_photos') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({is_cover: false})
      .eq('vendor_id', vendorId)

  if (error) {
    alert('Failed to update cover flag: ' + error.message)
    return
  }

  const {error: error2} = await (client
      .from('vendor_photos') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({is_cover: true})
      .eq('id', photo.id)

  if (error2) {
    alert('Failed to set cover: ' + error2.message)
    return
  }

  photos.value = photos.value.map((p) => ({
    ...p,
    is_cover: p.id === photo.id
  }))
}
// ... existing code ...

const deleteRate = async (rate: RateRow) => {
  if (!confirm(`Are you sure you want to delete "${rate.service_name}"?`)) return

  const {error} = await (client
      .from('vendor_rates') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .delete()
      .eq('id', rate.id)

  if (error) {
    alert('Failed to delete rate: ' + error.message)
    return
  }

  // Remove from local state
  rates.value = rates.value.filter((r) => r.id !== rate.id)
}

const deletePhoto = async (photo: PhotoRow) => {
  if (!confirm('Delete this photo? This cannot be undone.')) return

  const {error} = await (client
      .from('vendor_photos') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .delete()
      .eq('id', photo.id)

  if (error) {
    alert('Failed to delete photo: ' + error.message)
    return
  }

  // Remove from local state
  photos.value = photos.value.filter((p) => p.id !== photo.id)
}

</script>