<template>
  <div class="font-sans antialiased text-slate-900 bg-slate-50 min-h-screen relative">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
    }
  ]
})
</script>

<style>
/* global styles here if needed */
</style>