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
              Vendor Categories
            </h1>
          </div>
        </NuxtLink>

        <NuxtLink
            to="/admin"
            class="text-xs font-medium text-slate-500 hover:text-rose-600 inline-flex items-center gap-1"
        >
          ← Back to dashboard
        </NuxtLink>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <!-- Title + description -->
      <section class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Taxonomy
          </p>
          <h2 class="font-serif text-3xl font-semibold text-slate-900">
            Vendor categories
          </h2>
          <p class="text-sm text-slate-500 mt-2 max-w-xl">
            These categories appear on the landing page and power search filters. Keep them
            concise and event-planner friendly.
          </p>
        </div>
      </section>

      <!-- Create form -->
      <section class="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-4">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="font-serif text-lg font-semibold text-slate-900">
              Add new category
            </h3>
            <p class="text-xs text-slate-500 mt-1">
              Use lower-case slugs without spaces (e.g. <code>decor</code>, <code>photographer</code>).
            </p>
          </div>
        </div>

        <form class="grid gap-4 md:grid-cols-2" @submit.prevent="onCreate">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-600">Name</label>
            <input
                v-model="form.name"
                type="text"
                required
                placeholder="Decor & Styling"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            >
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-600">Slug</label>
            <input
                v-model="form.slug"
                type="text"
                required
                placeholder="decor"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            >
          </div>

          <div class="space-y-1.5 md:col-span-2">
            <label class="text-xs font-semibold text-slate-600">Description</label>
            <textarea
                v-model="form.description"
                rows="2"
                placeholder="Event decor, styling & florals"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 resize-none"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-600">Icon (optional)</label>
            <input
                v-model="form.icon"
                type="text"
                placeholder="sparkles"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            >
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-600">Sort order</label>
            <input
                v-model.number="form.sort_order"
                type="number"
                min="0"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            >
          </div>

          <div class="md:col-span-2 flex items-center justify-between mt-2">
            <p class="text-xs text-slate-400">
              Lower sort order = appears earlier in dropdowns.
            </p>
            <button
                type="submit"
                :disabled="creating"
                class="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span v-if="creating">Saving…</span>
              <span v-else>Save category</span>
            </button>
          </div>

          <p v-if="errorMessage" class="md:col-span-2 text-xs text-red-600">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="md:col-span-2 text-xs text-emerald-600">
            {{ successMessage }}
          </p>
        </form>
      </section>

      <!-- List -->
      <section class="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-serif text-lg font-semibold text-slate-900">
            Existing categories
          </h3>
          <button
              class="text-xs text-slate-500 hover:text-slate-700"
              @click="() => refresh()"
          >
            Refresh
          </button>
        </div>

        <div v-if="pending" class="space-y-2">
          <div
              v-for="n in 5"
              :key="n"
              class="h-10 rounded-xl bg-slate-50 animate-pulse"
          />
        </div>

        <div v-else-if="loadError" class="text-sm text-red-600">
          Failed to load categories: {{ (loadError as any).message || loadError }}
        </div>

        <div v-else-if="!categories?.length" class="text-sm text-slate-500">
          No categories yet. Use the form above to create your first one.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
            <tr class="text-left text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <th class="py-2 pr-4">Name</th>
              <th class="py-2 px-4">Slug</th>
              <th class="py-2 px-4">Description</th>
              <th class="py-2 px-4">Sort</th>
              <th class="py-2 px-4">Active</th>
              <th class="py-2 pl-4 text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="cat in categories"
                :key="cat.id"
                class="border-b border-slate-50 hover:bg-slate-50/60"
            >
              <td class="py-2 pr-4 font-medium text-slate-900">
                {{ cat.name }}
              </td>
              <td class="py-2 px-4 text-xs font-mono text-slate-500">
                {{ cat.slug }}
              </td>
              <td class="py-2 px-4 text-xs text-slate-500 max-w-xs">
                {{ cat.description || '—' }}
              </td>
              <td class="py-2 px-4 text-xs text-slate-500">
                {{ cat.sort_order ?? 100 }}
              </td>
              <td class="py-2 px-4 text-xs">
                  <span
                      class="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
                      :class="cat.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'"
                  >
                    <span
class="h-1.5 w-1.5 rounded-full"
                          :class="cat.is_active ? 'bg-emerald-500' : 'bg-slate-400'"/>
                    {{ cat.is_active ? 'Active' : 'Hidden' }}
                  </span>
              </td>
              <td class="py-2 pl-4 text-right text-xs">
                <!-- For now just a simple archive toggle & delete; can expand later -->
                <button
                    class="mr-3 text-slate-500 hover:text-slate-800"
                    @click="toggleActive(cat)"
                >
                  {{ cat.is_active ? 'Hide' : 'Activate' }}
                </button>
                <button
                    class="text-red-500 hover:text-red-700"
                    @click="confirmDelete(cat)"
                >
                  Delete
                </button>
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
import {ref} from 'vue'
import type { Database } from '~/types/database.types'

definePageMeta({
  middleware: 'admin'
})

type CategoryRow = {
  id: string
  slug: string
  name: string
  description: string | null
  icon: string | null
  sort_order: number | null
  is_active: boolean
}



const client = useSupabaseClient<Database>()

// Load categories
const {
  data: categories,
  pending,
  error: loadError,
  refresh
} = await useAsyncData<CategoryRow[]>('admin-categories', async () => {
  const {data, error} = await client
      .from('vendor_categories')
      .select('*')
      .order('sort_order', {ascending: true})
      .order('name', {ascending: true})

  if (error) {
    throw error
  }

  return data || []
})

// Form state
const form = ref({
  name: '',
  slug: '',
  description: '',
  icon: '',
  sort_order: 50
})

const creating = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const onCreate = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  creating.value = true

  try {
    const payload = {
      name: form.value.name.trim(),
      slug: form.value.slug.trim(),
      description: form.value.description.trim() || null,
      icon: form.value.icon.trim() || null,
      sort_order: form.value.sort_order ?? 50
    }

    const {error} = await (client
        .from('vendor_categories') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        .insert(payload)

    if (error) {
      console.error('Insert category error:', error)
      errorMessage.value = error.message
      return
    }

    successMessage.value = 'Category created.'
    form.value = {
      name: '',
      slug: '',
      description: '',
      icon: '',
      sort_order: 50
    }
    await refresh()
  } finally {
    creating.value = false
  }
}

const toggleActive = async (cat: CategoryRow) => {
  const {error} = await (client
      .from('vendor_categories') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({is_active: !cat.is_active})
      .eq('id', cat.id)

  if (error) {
    alert('Failed to update category: ' + error.message)
    return
  }
  await refresh()
}

const confirmDelete = async (cat: CategoryRow) => {
  if (!confirm(`Delete category "${cat.name}"? This cannot be undone.`)) return

  const {error} = await (client
      .from('vendor_categories') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .delete()
      .eq('id', cat.id)

  if (error) {
    alert('Failed to delete category: ' + error.message)
    return
  }
  await refresh()
}
</script>