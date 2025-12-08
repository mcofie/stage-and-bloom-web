<template>
  <header class="border-b border-slate-200/60 bg-white/80 backdrop-blur-md fixed top-0 w-full z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/admin" class="flex items-center gap-3 group">
        <div
            class="relative flex items-center justify-center h-9 w-9 bg-rose-600 text-white font-serif font-bold text-lg rounded-xl shadow-md shadow-rose-200 group-hover:scale-105 transition-transform"
        >
          SB
        </div>
        <div class="leading-none">
          <p class="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-0.5">
            Admin
          </p>
          <h1 class="font-serif font-semibold text-lg text-slate-900 tracking-tight">
            Stage &amp; Bloom
          </h1>
        </div>
      </NuxtLink>

      <div class="flex items-center gap-4">
        <div v-if="user?.email" class="hidden md:flex flex-col items-end">
          <span class="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Logged in as</span>
          <span class="text-xs font-medium text-slate-900">{{ user.email }}</span>
        </div>
        <div class="h-8 w-px bg-slate-100 mx-1 hidden md:block"></div>
        <button
            class="text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors bg-white border border-slate-100 shadow-sm"
            @click="signOut"
        >
          Sign out
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSupabaseUser, useSupabaseClient, navigateTo } from '#imports'

const user = useSupabaseUser()
const client = useSupabaseClient()

const signOut = async () => {
  await client.auth.signOut()
  await navigateTo('/auth/sign-in')
}
</script>
