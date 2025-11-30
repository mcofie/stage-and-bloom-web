<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center max-w-2xl mx-auto mb-12">
      <h2 class="font-serif text-3xl font-bold text-slate-900 dark:text-white mb-3">Browse by Occasion</h2>
      <p class="text-slate-500 dark:text-slate-400">Start with the type of event you are planning and we'll guide you.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <NuxtLink
v-for="event in eventTypes" :key="event.slug"
                :to="`/events/${event.slug}`"
                class="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer">
        <div class="absolute inset-0 bg-slate-200 dark:bg-slate-800 transition-transform duration-700 group-hover:scale-110">
          <NuxtImg :src="event.image" class="h-full w-full object-cover opacity-90" :alt="event.name" loading="lazy"/>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
        <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p class="text-[10px] uppercase tracking-widest font-medium text-white/80 mb-2">{{ event.kicker }}</p>
          <h3 class="font-serif text-2xl font-medium mb-1">{{ event.name }}</h3>
          <p class="text-sm text-white/80 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {{ event.description }}</p>
          <div
              class="flex items-center gap-2 text-xs font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Explore Vendors <span class="text-lg">→</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const eventTypes = [
  {
    slug: 'wedding',
    kicker: 'For your special day',
    name: 'Weddings',
    description: 'Build a dream team for engagements, white weddings and receptions.',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg'
  },
  {
    slug: 'party',
    kicker: 'Celebrate in style',
    name: 'Parties',
    description: 'Birthdays, baby showers and house parties that feel curated.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'
  },
  {
    slug: 'corporate',
    kicker: 'Professional events',
    name: 'Corporate',
    description: 'Offsites, launches, townhalls and mixers for teams and brands.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
  },
  {
    slug: 'other',
    kicker: 'Gatherings',
    name: 'Other Events',
    description: 'Church events, graduations, open mics and everything in between.',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg'
  }
]
</script>
