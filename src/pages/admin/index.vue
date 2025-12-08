<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen">


    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <!-- Page title -->
      <section class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-1">
            Back office
          </p>
          <h2 class="font-serif text-3xl font-semibold text-slate-900">
            Admin dashboard
          </h2>
          <p class="text-sm text-slate-500 mt-2">
            Manage vendors, categories and content for Stage &amp; Bloom.
          </p>
        </div>
      </section>

      <!-- Tiles -->
      <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
            to="/admin/categories"
            class="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="font-serif text-lg font-semibold text-slate-900 group-hover:text-rose-600">
                Vendor categories
              </h3>
              <p class="mt-2 text-sm text-slate-500">
                Create and edit the categories used to group vendors (decor, caterers, DJs, etc.)
              </p>
            </div>
            <div
                class="h-10 w-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl"
            >
              🏷️
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Configure taxonomy</span>
            <span class="inline-flex items-center gap-1 text-rose-600 font-medium">
              Open <span>→</span>
            </span>
          </div>
        </NuxtLink>

        <NuxtLink
            to="/admin/vendors"
            class="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="font-serif text-lg font-semibold text-slate-900 group-hover:text-rose-600">
                Vendors
              </h3>
              <p class="mt-2 text-sm text-slate-500">
                Add new vendors, update details and manage who appears in search.
              </p>
            </div>
            <div
                class="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl"
            >
              🎭
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Manage directory</span>
            <span class="inline-flex items-center gap-1 text-rose-600 font-medium">
              Open <span>→</span>
            </span>
          </div>
        </NuxtLink>

        <NuxtLink
            to="/admin/requests"
            class="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="font-serif text-lg font-semibold text-slate-900 group-hover:text-rose-600">
                Booking Requests
              </h3>
              <p class="mt-2 text-sm text-slate-500">
                View incoming leads and quote requests from the website.
              </p>
            </div>
            <div
                class="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl"
            >
              📩
            </div>
          </div>
          <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>View leads</span>
            <span class="inline-flex items-center gap-1 text-rose-600 font-medium">
              Open <span>→</span>
            </span>
          </div>
        </NuxtLink>

        <!-- You can add more tiles later (photos, bookings, etc.) -->
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

const user = useSupabaseUser()
const client = useSupabaseClient()

const signOut = async () => {
  await client.auth.signOut()
  await navigateTo('/auth/sign-in')
}
</script>