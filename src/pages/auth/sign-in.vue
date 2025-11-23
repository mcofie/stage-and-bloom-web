<template>
  <div class="font-sans bg-[#FDFCF8] text-slate-800 min-h-screen flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-lg shadow-rose-50 p-8 space-y-6">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 bg-rose-600 text-white font-serif font-bold flex items-center justify-center rounded-xl">
          SB
        </div>
        <div>
          <p class="font-serif text-lg font-bold text-slate-900">Stage &amp; Bloom</p>
          <p class="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">Sign in</p>
        </div>
      </div>

      <div class="space-y-2">
        <h1 class="font-serif text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p class="text-xs text-slate-500">
          Log in to message vendors on WhatsApp and track your requests.
        </p>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4 text-sm">
        <div class="space-y-1">
          <label class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Email
          </label>
          <input
              v-model="email"
              type="email"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300"
          />
        </div>

        <div class="space-y-1">
          <label class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Password
          </label>
          <input
              v-model="password"
              type="password"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300"
          />
        </div>

        <p v-if="error" class="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          {{ error }}
        </p>

        <button
            type="submit"
            :disabled="loading"
            class="w-full inline-flex items-center justify-center rounded-xl bg-rose-600 text-white font-semibold py-2.5 text-sm shadow-md shadow-rose-200 hover:bg-rose-700 disabled:opacity-60">
          <span v-if="loading">Signing in…</span>
          <span v-else>Sign in</span>
        </button>
      </form>

      <p class="text-xs text-slate-500 text-center">
        Don’t have an account?
        <NuxtLink
            :to="{ path: '/auth/sign-up', query: { redirect: redirectTo } }"
            class="text-rose-600 font-medium hover:underline">
          Create one
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from '#imports'
import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/database.types'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient<Database>()

const redirectTo = (route.query.redirect as string) || '/vendors'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const onSubmit = async () => {
  loading.value = true
  error.value = null
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  loading.value = false

  if (signInError) {
    error.value = signInError.message
    return
  }
  router.push(redirectTo)
}
</script>