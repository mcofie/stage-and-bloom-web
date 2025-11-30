<template>
  <section id="how-it-works" class="py-20 bg-slate-50 dark:bg-slate-900/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Plan your event in 3 simple steps
        </h2>
        <p class="text-slate-600 dark:text-slate-400 text-lg">
          We've streamlined the process so you can focus on enjoying your special moments.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-12 relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-rose-200 via-purple-200 to-rose-200 dark:from-rose-900 dark:via-purple-900 dark:to-rose-900 -z-10" />

        <div v-for="(step, index) in steps" :key="index" class="relative group">
          <div class="flex flex-col items-center text-center">
            <div class="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300 border border-slate-100 dark:border-slate-700 relative z-10">
              <span class="text-4xl">{{ step.icon }}</span>
              <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-sm shadow-lg">
                {{ index + 1 }}
              </div>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">{{ step.title }}</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    icon: '🔍',
    title: 'Discover Vendors',
    description: 'Browse our curated list of top-rated decorators, caterers, and photographers in your area.'
  },
  {
    icon: '💬',
    title: 'Connect Directly',
    description: 'Chat with vendors via WhatsApp or our platform to discuss your vision and get custom quotes.'
  },
  {
    icon: '✨',
    title: 'Book & Celebrate',
    description: 'Secure your dates and enjoy a stress-free event knowing you have the best team.'
  }
]
</script>
