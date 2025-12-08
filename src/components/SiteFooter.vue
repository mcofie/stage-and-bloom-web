<template>
  <footer class="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-8 mt-auto relative overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"/>
    <div
        class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"/>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

        <div class="md:col-span-4 space-y-6">
          <div class="flex items-center gap-2">
            <div
                class="h-8 w-8 bg-rose-600 rounded-lg flex items-center justify-center font-serif font-bold text-white shadow-lg shadow-rose-900/50">
              SB
            </div>
            <span class="font-serif text-xl font-bold tracking-tight">Stage & Bloom</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
            Reimagining events in Africa. We curate the finest vendors so you can plan with confidence and style.
          </p>
          <div class="flex gap-4">
            <a
href="#"
               class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a
href="#"
               class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="md:col-span-2 md:col-start-6">
          <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Explore</h4>
          <ul class="space-y-3 text-sm text-slate-400">
            <li>
              <NuxtLink
to="/vendors/search?categorySlug=wedding"
                        class="hover:text-white hover:translate-x-1 transition-all inline-block">Weddings
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
to="/vendors/search?categorySlug=party"
                        class="hover:text-white hover:translate-x-1 transition-all inline-block">Parties
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
to="/vendors/search?categorySlug=corporate"
                        class="hover:text-white hover:translate-x-1 transition-all inline-block">Corporate
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/vendors/search" class="hover:text-white hover:translate-x-1 transition-all inline-block">
                Browse All
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="md:col-span-2">
          <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Company</h4>
          <ul class="space-y-3 text-sm text-slate-400">
            <li><NuxtLink to="/about-us" class="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</NuxtLink></li>
            <li><a href="#" class="hover:text-white hover:translate-x-1 transition-all inline-block">For Vendors</a>
            </li>
            <li><NuxtLink to="/privacy-policy" class="hover:text-white hover:translate-x-1 transition-all inline-block">Privacy
              Policy</NuxtLink></li>
          </ul>
        </div>

        <div class="md:col-span-3">
          <h4 class="font-bold text-xs uppercase tracking-widest text-slate-500 mb-6">Stay in the loop</h4>
          <p class="text-xs text-slate-400 mb-4">Get the latest vendor spotlights and planning tips delivered to your
            inbox.</p>
          <div class="flex flex-col gap-2">
            <input
type="email" placeholder="Email address"
                   class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors">
            <button
                class="bg-white text-slate-900 hover:bg-rose-50 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors shadow-lg shadow-white/10">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div
          class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>&copy; {{ new Date().getFullYear() }} Stage & Bloom. Crafted in Accra 🇬🇭</p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy-policy" class="hover:text-white transition-colors">Privacy</NuxtLink>
          <a href="#" class="hover:text-white transition-colors">Terms</a>
          <a href="#" class="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
</template>
