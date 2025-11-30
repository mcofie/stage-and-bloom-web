<template>
  <section class="bg-slate-900 dark:bg-slate-800 text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
      <div class="space-y-6">
        <div class="inline-block p-3 rounded-xl bg-white/10 backdrop-blur">
          <svg class="w-8 h-8 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 class="font-serif text-4xl font-bold leading-tight">
          Vendor booking, <br>simplified.
        </h2>
        <div class="space-y-4 text-slate-300 text-lg">
          <p>Stop drowning in Instagram DMs and screenshots. Stage &amp; Bloom brings structure to the chaos of
            event planning.</p>
          <ul class="space-y-3 pt-2 text-base">
            <li class="flex items-center gap-3">
              <span class="h-1.5 w-1.5 rounded-full bg-rose-500"/>
              Verified rate cards & transparent pricing
            </li>
            <li class="flex items-center gap-3">
              <span class="h-1.5 w-1.5 rounded-full bg-rose-500"/>
              Direct WhatsApp integration
            </li>
            <li class="flex items-center gap-3">
              <span class="h-1.5 w-1.5 rounded-full bg-rose-500"/>
              Curated for quality, not quantity
            </li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -inset-4 bg-rose-500/20 rounded-full blur-3xl"/>
        <NuxtImg
            src="https://images.pexels.com/photos/2291462/pexels-photo-2291462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="rounded-2xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500"
            alt="Event planning"/>
      </div>
    </div>
  </section>
</template>
