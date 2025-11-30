<template>
  <section class="py-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-medium tracking-wide mb-6">
            <span class="text-lg">❤️</span> Loved by couples & planners
          </div>
          <h2 class="font-serif text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Don't just take our word for it
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
            See why hundreds of event planners and couples trust Stage & Bloom to find the perfect vendors for their special days.
          </p>
          
          <div class="flex items-center gap-8">
            <div>
              <p class="text-3xl font-bold text-slate-900 dark:text-white">500+</p>
              <p class="text-sm text-slate-500 dark:text-slate-500">Events Planned</p>
            </div>
            <div class="w-px h-12 bg-slate-200 dark:bg-slate-800" />
            <div>
              <p class="text-3xl font-bold text-slate-900 dark:text-white">4.9/5</p>
              <p class="text-sm text-slate-500 dark:text-slate-500">Average Rating</p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute -inset-4 bg-gradient-to-r from-rose-100 to-purple-100 dark:from-rose-900/20 dark:to-purple-900/20 rounded-[2rem] blur-2xl opacity-60 -z-10" />
          
          <div class="grid gap-6">
            <div
v-for="(review, index) in reviews" :key="index" 
                 class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
                 :class="{'md:translate-x-8': index === 1}">
              <div class="flex items-center gap-1 text-yellow-400 mb-4">
                <span v-for="n in 5" :key="n">★</span>
              </div>
              <p class="text-slate-700 dark:text-slate-300 mb-6 italic">"{{ review.text }}"</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <img :src="review.avatar" :alt="review.author" class="w-full h-full object-cover">
                </div>
                <div>
                  <p class="font-bold text-sm text-slate-900 dark:text-white">{{ review.author }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-500">{{ review.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const reviews = [
  {
    text: "I found the most amazing decorator for my wedding in less than an hour. The direct WhatsApp connection made communication so easy!",
    author: "Sarah Mensah",
    role: "Bride",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100"
  },
  {
    text: "As an event planner, this platform is a lifesaver. The curated list of vendors ensures I always deliver quality to my clients.",
    author: "Kwame Osei",
    role: "Event Planner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100"
  }
]
</script>
