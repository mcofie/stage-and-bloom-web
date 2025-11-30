<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen">
    <!-- Header -->
    <header class="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/admin" class="flex items-center gap-3 group">
          <div
              class="relative flex items-center justify-center h-9 w-9 bg-rose-600 text-white font-serif font-bold text-lg rounded-xl shadow-md shadow-rose-200 group-hover:scale-105 transition-transform"
          >
            SB
          </div>
          <div class="leading-none">
            <p class="text-[10px] uppercase tracking-[0.2em] text-slate-400">Admin</p>
            <h1 class="font-serif font-semibold text-lg text-slate-900 tracking-tight">
              Vendors
            </h1>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-3">
          <NuxtLink
              to="/admin"
              class="hidden sm:inline-flex text-xs font-medium text-slate-500 hover:text-rose-600 items-center gap-1"
          >
            ← Back to dashboard
          </NuxtLink>
          <NuxtLink
              to="/admin/vendors/new"
              class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-xs font-medium hover:bg-slate-800"
          >
            <span>＋ Add vendor</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <!-- Filters -->
      <section
          class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Directory
          </p>
          <h2 class="font-serif text-2xl md:text-3xl font-semibold text-slate-900">
            Vendor directory
          </h2>
          <p class="text-xs text-slate-500 mt-1 max-w-xl">
            Quickly skim who is in the marketplace, their category, city, and verification status.
          </p>
        </div>

        <div class="flex flex-wrap gap-3 text-xs">
          <select
              v-model="filterCategory"
              class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
          >
            <option value="">All categories</option>
            <option
                v-for="cat in categoryOptions"
                :key="cat.slug"
                :value="cat.slug"
            >
              {{ cat.name }}
            </option>
          </select>

          <input
              v-model="filterCity"
              type="text"
              placeholder="Filter by city (e.g. Accra)"
              class="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
          >

          <label class="inline-flex items-center gap-2 text-slate-600">
            <input
                v-model="onlyActive"
                type="checkbox"
                class="rounded border-slate-300 text-rose-600 focus:ring-rose-500/30"
            >
            Active only
          </label>

          <label class="inline-flex items-center gap-2 text-slate-600">
            <input
                v-model="onlyVerified"
                type="checkbox"
                class="rounded border-slate-300 text-rose-600 focus:ring-rose-500/30"
            >
            Verified only
          </label>
        </div>
      </section>

      <!-- List -->
      <section class="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-serif text-lg font-semibold text-slate-900">
            Vendors
          </h3>
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span v-if="pending">Loading…</span>
            <span v-else>{{ filteredVendors.length }} vendors</span>
            <button
                class="text-slate-500 hover:text-slate-800"
                @click="() => refresh()"
            >
              Refresh
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="pending" class="space-y-2">
          <div
              v-for="n in 6"
              :key="n"
              class="h-12 rounded-xl bg-slate-50 animate-pulse"
          />
        </div>

        <!-- Error -->
        <div v-else-if="loadError" class="text-sm text-red-600">
          Failed to load vendors: {{ (loadError as {message?: string})?.message || loadError }}
        </div>

        <!-- Empty -->
        <div v-else-if="!filteredVendors.length" class="text-sm text-slate-500">
          No vendors found. Try adjusting your filters or create a new vendor.
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full text-xs">
            <thead>
            <tr class="text-left uppercase tracking-wider text-[11px] text-slate-400 border-b border-slate-100">
              <th class="py-2 pr-3">Name</th>
              <th class="py-2 px-3">Category</th>
              <th class="py-2 px-3">City / Area</th>
              <th class="py-2 px-3">Pricing</th>
              <th class="py-2 px-3">Flags</th>
              <th class="py-2 pl-3 text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="vendor in filteredVendors"
                :key="vendor.id"
                class="border-b border-slate-50 hover:bg-slate-50/60"
            >
              <td class="py-2 pr-3">
                <div class="font-medium text-slate-900 flex items-center gap-2">
                  <NuxtLink
                      :to="`/vendors/${vendor.slug}`"
                      class="hover:text-rose-600"
                      target="_blank"
                  >
                    {{ vendor.display_name }}
                  </NuxtLink>
                  <span
                      v-if="vendor.is_verified"
                      class="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5"
                  >
                      <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                      Verified
                    </span>
                </div>
                <p class="text-[11px] text-slate-500">
                  slug: {{ vendor.slug }}
                </p>
              </td>

              <td class="py-2 px-3 text-[11px] text-slate-600">
                  <span class="font-medium">
                    {{ vendor.vendor_categories?.[0]?.name || '—' }}
                  </span>
                <p v-if="vendor.vendor_categories?.[0]" class="text-[10px] text-slate-400">
                  {{ vendor.vendor_categories[0].slug }}
                </p>
              </td>

              <td class="py-2 px-3 text-[11px] text-slate-600">
                <div>
                  {{ vendor.city || '—' }}
                  <span v-if="vendor.area"> • {{ vendor.area }}</span>
                </div>
                <p class="text-[10px] text-slate-400">
                  {{ vendor.country_code || 'GH' }}
                </p>
              </td>

              <td class="py-2 px-3 text-[11px] text-slate-600">
                <div v-if="vendor.starting_price">
                  From GH₵ {{ vendor.starting_price.toLocaleString() }}
                </div>
                <div v-else-if="vendor.price_range_min || vendor.price_range_max">
                    <span v-if="vendor.price_range_min">
                      GH₵ {{ vendor.price_range_min.toLocaleString() }}
                    </span>
                  <span v-if="vendor.price_range_min && vendor.price_range_max"> – </span>
                  <span v-if="vendor.price_range_max">
                      GH₵ {{ vendor.price_range_max.toLocaleString() }}
                    </span>
                </div>
                <p class="text-[10px] text-slate-400">
                  {{ vendor.currency_code || 'GHS' }}
                </p>
              </td>

              <td class="py-2 px-3 text-[11px]">
                <div class="flex flex-wrap gap-1">
                    <span
                        class="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
                        :class="vendor.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'"
                    >
                      <span
                          class="h-1.5 w-1.5 rounded-full"
                          :class="vendor.is_active ? 'bg-emerald-500' : 'bg-slate-400'"
                      />
                      {{ vendor.is_active ? 'Active' : 'Hidden' }}
                    </span>
                  <span
                      v-if="vendor.instagram_handle"
                      class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-slate-50 text-slate-600"
                  >
                      📷 {{ vendor.instagram_handle }}
                    </span>
                </div>
              </td>

              <td class="py-2 pl-3 text-right text-[11px] whitespace-nowrap">
                <button
                    class="mr-2 text-slate-500 hover:text-slate-900"
                    @click="toggleVerified(vendor)"
                >
                  {{ vendor.is_verified ? 'Unverify' : 'Verify' }}
                </button>
                <button
                    class="mr-2 text-slate-500 hover:text-slate-900"
                    @click="toggleActive(vendor)"
                >
                  {{ vendor.is_active ? 'Hide' : 'Activate' }}
                </button>
                <NuxtLink
                    :to="`/admin/vendors/${vendor.id}`"
                    class="text-rose-600 hover:text-rose-700"
                >
                  Edit
                </NuxtLink>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
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

type CategoryOption = {
  slug: string
  name: string
}

type VendorRow = {
  id: string
  slug: string
  display_name: string
  city: string | null
  area: string | null
  country_code: string | null
  starting_price: number | null
  price_range_min: number | null
  price_range_max: number | null
  currency_code: string | null
  instagram_handle: string | null
  is_verified: boolean
  is_active: boolean
  vendor_categories: { id: string; slug: string; name: string }[] | null
}



const client = useSupabaseClient<Database>()

// Load vendors with category join
const {
  data: vendors,
  pending,
  error: loadError,
  refresh
} = await useAsyncData<VendorRow[]>('admin-vendors', async () => {
  const {data, error} = await client
      .from('vendors')
      .select(
          `
      id,
      slug,
      display_name,
      city,
      area,
      country_code,
      starting_price,
      price_range_min,
      price_range_max,
      currency_code,
      instagram_handle,
      is_verified,
      is_active,
      vendor_categories:vendor_categories!vendors_category_id_fkey (
        id,
        slug,
        name
      )
    `
      )
      .order('created_at', {ascending: false})

  if (error) {
    throw error
  }

  // Cast the data to match our expected type since Supabase types might be slightly different
  return (data || []) as unknown as VendorRow[]
})

// Category dropdown options
const categoryOptions = computed<CategoryOption[]>(() => {
  const map = new Map<string, string>()
  ;(vendors.value || []).forEach((v) => {
    if (v.vendor_categories && v.vendor_categories.length > 0 && v.vendor_categories[0]) {
      map.set(v.vendor_categories[0].slug, v.vendor_categories[0].name)
    }
  })
  return Array.from(map.entries()).map(([slug, name]) => ({slug, name}))
})

// Filters
const filterCategory = ref('')
const filterCity = ref('')
const onlyActive = ref(true)
const onlyVerified = ref(false)

const filteredVendors = computed(() => {
  const list = vendors.value || []
  return list.filter((v) => {
    if (filterCategory.value && v.vendor_categories?.[0]?.slug !== filterCategory.value) {
      return false
    }
    if (filterCity.value) {
      const search = filterCity.value.toLowerCase()
      const city = (v.city || '').toLowerCase()
      const area = (v.area || '').toLowerCase()
      if (!city.includes(search) && !area.includes(search)) {
        return false
      }
    }
    if (onlyActive.value && !v.is_active) return false
    if (onlyVerified.value && !v.is_verified) return false
    return true
  })
})

const toggleActive = async (vendor: VendorRow) => {
  const {error} = await (client
      .from('vendors') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({is_active: !vendor.is_active})
      .eq('id', vendor.id)

  if (error) {
    alert('Failed to update vendor: ' + error.message)
    return
  }
  await refresh()
}

const toggleVerified = async (vendor: VendorRow) => {
  const {error} = await (client
      .from('vendors') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({is_verified: !vendor.is_verified})
      .eq('id', vendor.id)

  if (error) {
    alert('Failed to update vendor: ' + error.message)
    return
  }
  await refresh()
}
</script>