<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen">
    <!-- Header -->


    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <!-- Page Title & Intro -->
      <section
          class="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-1">
            Inbox
          </p>
          <h2 class="font-serif text-2xl md:text-3xl font-semibold text-slate-900">
            Booking Requests
          </h2>
          <p class="text-xs text-slate-500 mt-1 max-w-xl">
            View and manage incoming leads, quote requests, and messages from the website.
          </p>
        </div>
      </section>

      <!-- List -->
      <section class="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-serif text-lg font-semibold text-slate-900">
            All Requests
          </h3>
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span v-if="pending">Loading…</span>
            <span v-else>{{ requests?.length || 0 }} requests</span>
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
        <div v-else-if="error" class="text-sm text-red-600">
          Failed to load requests: {{ (error as {message?: string})?.message || error }}
        </div>

        <!-- Empty -->
        <div v-else-if="!requests?.length" class="text-sm text-slate-500">
          No booking requests found yet.
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full text-xs">
            <thead>
            <tr class="text-left uppercase tracking-wider text-[11px] text-slate-400 border-b border-slate-100">
              <th class="py-2 pr-3">Contact</th>
              <th class="py-2 px-3">Vendor</th>
              <th class="py-2 px-3">Event Details</th>
              <th class="py-2 px-3">Message</th>
              <th class="py-2 px-3">Status</th>
              <th class="py-2 pl-3 text-right">Date</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="req in requests"
                :key="req.id"
                class="border-b border-slate-50 hover:bg-slate-50/60"
            >
              <td class="py-3 pr-3 align-top">
                <div class="font-medium text-slate-900">{{ req.contact_name }}</div>
                <div class="text-slate-500 text-[11px] mt-0.5">{{ req.contact_email }}</div>
                <div class="text-slate-400 text-[10px]">{{ req.contact_phone }}</div>
              </td>
              <td class="py-3 px-3 align-top">
                <div v-if="req.vendors">
                  <NuxtLink
                      :to="`/vendors/${req.vendors.slug}`"
                      target="_blank"
                      class="font-medium text-slate-900 hover:text-rose-600 transition-colors"
                  >
                    {{ req.vendors.display_name }}
                  </NuxtLink>
                  <div class="text-[10px] text-slate-400 mt-0.5 font-mono">
                    {{ req.vendors.id.split('-')[0] }}...
                  </div>
                </div>
                <span v-else class="text-slate-400 text-[11px] italic">
                  General Inquiry
                </span>
              </td>
              <td class="py-3 px-3 align-top text-slate-600">
                <div class="font-medium">{{ req.event_type }}</div>
                <div class="text-[10px] text-slate-400 mt-0.5" v-if="req.event_date">
                  {{ new Date(req.event_date).toLocaleDateString() }}
                </div>
                <div class="text-[10px] text-slate-400" v-if="req.guest_count">
                  {{ req.guest_count }} guests
                </div>
              </td>
              <td class="py-3 px-3 align-top max-w-xs">
                <p class="text-slate-600 line-clamp-2 text-[11px]">{{ req.user_message }}</p>
              </td>
              <td class="py-3 px-3 align-top">
                  <span
                      class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                      :class="req.status === 'new' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'"
                  >
                    <span
                        class="h-1.5 w-1.5 rounded-full"
                        :class="req.status === 'new' ? 'bg-blue-500' : 'bg-slate-400'"
                    />
                    {{ req.status }}
                  </span>
              </td>
              <td class="py-3 pl-3 align-top text-right text-slate-400 text-[10px] whitespace-nowrap">
                {{ new Date(req.created_at).toLocaleString() }}
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
import type {Database} from '~/types/database.types'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

const client = useSupabaseClient<Database>()

type RequestRow = {
  id: string
  contact_name: string
  contact_email: string
  contact_phone: string
  event_type: string
  event_date: string | null
  guest_count: number | null
  user_message: string
  status: string
  created_at: string
  vendors: {
    id: string
    display_name: string
    slug: string
  } | null
}

const {data: requests, pending, error, refresh} = await useAsyncData('admin-requests', async () => {
  const {data, error} = await client
      .schema('stagebloom')
      .from('booking_requests')
      .select(`
        *,
        vendors (
          id,
          display_name,
          slug
        )
      `)
      .order('created_at', {ascending: false})

  if (error) throw error
  return (data || []) as unknown as RequestRow[]
})
</script>
