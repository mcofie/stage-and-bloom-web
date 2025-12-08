<template>
  <div class="font-sans min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
    <!-- Background Decor -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-rose-50/50 to-transparent"/>
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-50"/>
      <div class="absolute top-1/2 -left-24 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40"/>
    </div>

    <!-- Main Card -->
    <div class="relative z-10 w-full max-w-[400px] bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 border border-white/60 p-8 md:p-10">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center h-12 w-12 bg-rose-600 text-white font-serif font-bold text-xl rounded-2xl shadow-lg shadow-rose-200 mb-4">
          SB
        </div>
        <h1 class="font-serif text-2xl font-bold text-slate-900 tracking-tight">
          Welcome back
        </h1>
        <p class="text-sm text-slate-500 mt-2">
          Sign in to access the admin request manager.
        </p>
      </div>

      <!-- Form -->
      <form class="space-y-5" @submit.prevent="onSubmit">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold text-slate-700 ml-1">Email address</label>
          <input
              v-model="email"
              type="email"
              required
              placeholder="name@company.com"
              class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
          >
        </div>

        <div class="space-y-1.5">
          <div class="flex items-center justify-between ml-1">
            <label class="text-xs font-semibold text-slate-700">Password</label>
          </div>
          <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
          >
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-3">
          <span class="text-red-500 mt-0.5">⚠️</span>
          <p class="text-xs text-red-600 leading-relaxed">{{ error }}</p>
        </div>

        <!-- Submit -->
        <button
            type="submit"
            :disabled="loading"
            class="w-full inline-flex items-center justify-center rounded-xl bg-slate-900 text-white font-medium py-3 text-sm shadow-lg shadow-slate-200 hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
        >
          <span v-if="loading" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
          <span v-else>Sign in to dashboard</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-xs text-slate-400">
          Takes you back to the home page?
        </p>
        <NuxtLink
            to="/"
            class="inline-block mt-2 text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline"
        >
          ← Return to website
        </NuxtLink>
      </div>
    </div>
    
     <div class="absolute bottom-6 text-xs text-slate-400 font-medium">
      &copy; {{ new Date().getFullYear() }} Stage &amp; Bloom.
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter, useSupabaseClient} from '#imports'
import type {Database} from '~/types/database.types'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient<Database>()

const redirectTo = (route.query.redirect as string) || '/admin'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const ADMIN_EMAILS = ['maxcofie@gmail.com', 'admin@stageandbloom.com']

const onSubmit = async () => {
  loading.value = true
  error.value = null
  const {data, error: signInError} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (signInError) {
    loading.value = false
    error.value = signInError.message
    return
  }

  if (data.user && !ADMIN_EMAILS.includes(data.user.email || '')) {
    await supabase.auth.signOut()
    loading.value = false
    error.value = 'Access restricted to administrators.'
    return
  }

  loading.value = false
  router.push(redirectTo)
}
</script>