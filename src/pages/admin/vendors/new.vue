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
              New vendor
            </h1>
          </div>
        </NuxtLink>

        <NuxtLink
            to="/admin/vendors"
            class="text-xs font-medium text-slate-500 hover:text-rose-600 inline-flex items-center gap-1"
        >
          ← Back to vendors
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <!-- Title -->
      <section>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-1">
          Create vendor
        </p>
        <h2 class="font-serif text-3xl font-semibold text-slate-900 mb-2">
          Add a new vendor
        </h2>
        <p class="text-sm text-slate-500 max-w-xl">
          Capture just enough to show them in search. You can enrich details later (rates,
          photos, etc.).
        </p>
      </section>

      <!-- Form -->
      <section class="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Basic info -->
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1.5 md:col-span-2">
              <label class="text-xs font-semibold text-slate-600">Display name</label>
              <input
                  v-model="form.display_name"
                  type="text"
                  required
                  placeholder="Bloom & Lace Events"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
                  @blur="maybeGenerateSlug"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Slug</label>
              <input
                  v-model="form.slug"
                  type="text"
                  required
                  placeholder="bloom-and-lace-events"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 font-mono text-[11px]"
              />
              <p class="text-[10px] text-slate-400">
                Used in URLs: /vendors/<span class="italic">{{ form.slug || 'vendor-slug' }}</span>
              </p>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Category</label>
              <select
                  v-model="form.category_id"
                  required
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              >
                <option value="" disabled>Select a category</option>
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

          <!-- Location -->
          <div class="grid gap-4 md:grid-cols-3">
            <div class="space-y-1.5 md:col-span-2">
              <label class="text-xs font-semibold text-slate-600">City</label>
              <input
                  v-model="form.city"
                  type="text"
                  placeholder="Accra"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>
            <div class="space-y-1.5 md:col-span-1">
              <label class="text-xs font-semibold text-slate-600">Area / Neighbourhood</label>
              <input
                  v-model="form.area"
                  type="text"
                  placeholder="East Legon"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>
          </div>

          <!-- Pricing -->
          <div class="grid gap-4 md:grid-cols-3">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Starting price (GHS)</label>
              <input
                  v-model.number="form.starting_price"
                  type="number"
                  min="0"
                  placeholder="2500"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Price range min (GHS)</label>
              <input
                  v-model.number="form.price_range_min"
                  type="number"
                  min="0"
                  placeholder="2000"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Price range max (GHS)</label>
              <input
                  v-model.number="form.price_range_max"
                  type="number"
                  min="0"
                  placeholder="8000"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>
          </div>

          <!-- Contact / socials -->
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">WhatsApp number</label>
              <input
                  v-model="form.whatsapp_number"
                  type="text"
                  placeholder="+23320XXXXXXX"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-600">Instagram handle</label>
              <input
                  v-model="form.instagram_handle"
                  type="text"
                  placeholder="@bloomandlace"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-600">Cover image URL</label>
            <input
                v-model="form.cover_image_url"
                type="text"
                placeholder="https://images.pexels.com/..."
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            />
            <p class="text-[10px] text-slate-400">
              Used in cards and vendor profile hero. You can hook this up to Supabase Storage later.
            </p>
          </div>

          <!-- Bio -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-600">Short bio</label>
            <textarea
                v-model="form.short_bio"
                rows="3"
                placeholder="Soft, modern decor for intimate parties, bridal showers, and chic weddings."
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 resize-none"
            />
          </div>

          <!-- Flags -->
          <div class="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <label class="inline-flex items-center gap-2">
              <input
                  v-model="form.is_active"
                  type="checkbox"
                  class="rounded border-slate-300 text-rose-600 focus:ring-rose-500/30"
              />
              Active (show in search)
            </label>
            <label class="inline-flex items-center gap-2">
              <input
                  v-model="form.is_verified"
                  type="checkbox"
                  class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30"
              />
              Verified vendor
            </label>
          </div>

          <!-- Messages -->
          <p v-if="errorMessage" class="text-xs text-red-600">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="text-xs text-emerald-600">
            {{ successMessage }}
          </p>

          <!-- Submit -->
          <div class="flex items-center justify-between pt-2">
            <p class="text-[11px] text-slate-400">
              You can always edit or enrich this vendor later from the list view.
            </p>
            <button
                type="submit"
                :disabled="saving"
                class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="saving">Saving…</span>
              <span v-else>Save vendor</span>
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

definePageMeta({
  middleware: 'admin'
})

type CategoryRow = {
  id: string
  slug: string
  name: string
}

const client = useSupabaseClient()

// Load categories for the select
const {data: categoriesData, error: catError} = await client
    .schema('stagebloom')
    .from('vendor_categories')
    .select('id, slug, name')
    .eq('is_active', true)
    .order('sort_order', {ascending: true})
    .order('name', {ascending: true})

if (catError) {
  console.error('Failed to load categories:', catError)
}

const categories = ref<CategoryRow[]>(categoriesData || [])

const form = ref({
  display_name: '',
  slug: '',
  category_id: '',
  city: '',
  area: '',
  starting_price: null as number | null,
  price_range_min: null as number | null,
  price_range_max: null as number | null,
  whatsapp_number: '',
  instagram_handle: '',
  cover_image_url: '',
  short_bio: '',
  is_active: true,
  is_verified: false
})

const saving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

const maybeGenerateSlug = () => {
  if (!form.value.slug && form.value.display_name) {
    form.value.slug = slugify(form.value.display_name)
  }
}

const onSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  saving.value = true

  try {
    if (!form.value.display_name || !form.value.slug || !form.value.category_id) {
      errorMessage.value = 'Display name, slug and category are required.'
      return
    }

    const payload: any = {
      display_name: form.value.display_name.trim(),
      slug: form.value.slug.trim(),
      category_id: form.value.category_id,
      city: form.value.city.trim() || null,
      area: form.value.area.trim() || null,
      country_code: 'GH',
      starting_price: form.value.starting_price || null,
      price_range_min: form.value.price_range_min || null,
      price_range_max: form.value.price_range_max || null,
      whatsapp_number: form.value.whatsapp_number.trim() || null,
      instagram_handle: form.value.instagram_handle.trim() || null,
      cover_image_url: form.value.cover_image_url.trim() || null,
      short_bio: form.value.short_bio.trim() || null,
      is_active: form.value.is_active,
      is_verified: form.value.is_verified,
      currency_code: 'GHS'
    }

    const {error} = await client
        .schema('stagebloom')
        .from('vendors')
        .insert(payload)

    if (error) {
      console.error('Insert vendor error:', error)
      errorMessage.value = error.message
      return
    }

    successMessage.value = 'Vendor created.'
    // Reset main fields but keep flags
    form.value.display_name = ''
    form.value.slug = ''
    form.value.category_id = ''
    form.value.city = ''
    form.value.area = ''
    form.value.starting_price = null
    form.value.price_range_min = null
    form.value.price_range_max = null
    form.value.whatsapp_number = ''
    form.value.instagram_handle = ''
    form.value.cover_image_url = ''
    form.value.short_bio = ''
    // Optionally navigate back after a short delay
    setTimeout(() => {
      navigateTo('/admin/vendors')
    }, 600)
  } finally {
    saving.value = false
  }
}
</script>