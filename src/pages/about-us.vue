<template>
  <div>
    <section class="relative bg-slate-900 overflow-hidden">
      <!-- Background Decorative Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse-slow"></div>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse-slow delay-1000"></div>
        <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div class="max-w-3xl mx-auto text-center space-y-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-rose-300 text-sm font-medium backdrop-blur-sm">
            <span>✨</span> Reimagining Events
          </div>
          
          <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            We are <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">Stage & Bloom</span>.
          </h1>
          
          <p class="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Accra's premier curated marketplace for event planning. We bridge the gap between visionaries and the artisans who bring dreams to life.
          </p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="relative">
          <div class="absolute -inset-4 bg-gradient-to-br from-rose-100 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-2xl blur-xl opacity-70 -z-10"></div>
          <NuxtImg
              src="https://images.unsplash.com/photo-1519225427186-1d16701a5d0c?auto=format&fit=crop&q=80&w=800"
              alt="Team at work"
              class="rounded-2xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 w-full object-cover aspect-[4/3]"
          />
        </div>
        
        <div class="space-y-8">
          <div>
            <h2 class="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Our Mission</h2>
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Planning an event in Accra shouldn't be a gamble. We believe in transparency, quality, and the power of connection. Stage & Bloom was born from a simple desire: to make finding trusted, high-quality event vendors seamless and reliable.
            </p>
          </div>
          
          <div class="grid sm:grid-cols-2 gap-8 pt-4">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 text-2xl">
                💎
              </div>
              <h3 class="font-bold text-slate-900 dark:text-white text-lg">Curated Quality</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">Every vendor is vetted to ensure premium service standards.</p>
            </div>
            
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl">
                🤝
              </div>
              <h3 class="font-bold text-slate-900 dark:text-white text-lg">Seamless Connection</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">Direct connections with no hidden fees or middlemen.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'About Us - Stage & Bloom',
  description: 'Learn about Stage & Bloom, Accra\'s premier curated marketplace for event planning.',
})
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.3; }
}
</style>
