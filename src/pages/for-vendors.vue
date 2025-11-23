<template>
  <div class="font-sans bg-[#0B0F19] text-slate-200 min-h-screen selection:bg-amber-500/30 selection:text-amber-100">
    <component :is="'style'">
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
      .font-serif { font-family: 'Playfair Display', serif; }
      .font-sans { font-family: 'Inter', sans-serif; }
    </component>

    <header class="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0B0F19]/90 backdrop-blur-xl transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="relative flex items-center justify-center h-10 w-10 bg-amber-500 text-[#0B0F19] font-serif font-bold text-xl rounded-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            SB
          </div>
          <div class="leading-none hidden sm:block">
            <h1 class="font-serif font-bold text-xl text-white tracking-tight">Stage &amp; Bloom</h1>
            <p class="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Partner Network</p>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-6">
          <NuxtLink to="/auth/sign-in" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Already a partner?
          </NuxtLink>
          <a href="#apply" class="hidden sm:inline-flex rounded-full bg-white text-[#0B0F19] px-6 py-2.5 text-sm font-semibold hover:bg-amber-50 transition-all shadow-lg shadow-white/5">
            List Your Business
          </a>
        </div>
      </div>
    </header>

    <main>

      <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 overflow-hidden">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-900/10 to-transparent opacity-60 pointer-events-none"></div>
        <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Join 500+ Top Vendors
            </div>

            <h1 class="font-serif text-5xl md:text-7xl font-medium text-white leading-[1.1]">
              Get Discovered by <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-300 italic">Serious Clients.</span>
            </h1>

            <p class="text-lg text-slate-400 leading-relaxed max-w-xl border-l-2 border-amber-500/30 pl-6">
              Stage &amp; Bloom is the premier digital showroom for Ghana's event industry. We verify leads, handle booking tools, and put your portfolio in front of clients ready to pay for quality.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#apply" class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-amber-500 text-[#0B0F19] text-base font-bold hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 group">
                Start Application
                <svg class="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </a>
            </div>
          </div>

          <div class="relative lg:h-[600px] w-full hidden lg:block">
            <div class="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-[3rem] rotate-3 border border-white/5"></div>
            <div class="absolute inset-0 bg-[#151925] rounded-[3rem] -rotate-3 border border-white/5 overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" alt="Wedding setup" class="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent"></div>

              <div class="absolute bottom-10 left-10 right-10 p-5 bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-[#0B0F19] font-bold font-serif text-xl">E</div>
                  <div>
                    <p class="text-white font-bold">Events by Esi</p>
                    <div class="flex items-center gap-1 text-xs text-amber-400">
                      <span>★★★★★</span>
                      <span class="text-slate-400 ml-1">(24 Verified Reviews)</span>
                    </div>
                  </div>
                  <div class="ml-auto hidden sm:block">
                    <span class="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/20">Verified Partner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-[#0F131F] border-y border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-16">
            <h2 class="font-serif text-3xl md:text-4xl text-white">Why list on <span class="text-amber-400 italic">Stage &amp; Bloom?</span></h2>
            <p class="text-slate-400 mt-4 max-w-2xl mx-auto">We are building the operating system for the African event industry. Listing is free; we grow when you grow.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-8 rounded-3xl bg-[#0B0F19] border border-white/5 hover:border-amber-500/30 transition-colors group">
              <div class="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 text-amber-500 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">SEO & Visibility</h3>
              <p class="text-slate-400 leading-relaxed">
                Stop relying on the Instagram algorithm. We invest heavily in SEO and marketing so clients find you when they are actually ready to book.
              </p>
            </div>

            <div class="p-8 rounded-3xl bg-[#0B0F19] border border-white/5 hover:border-amber-500/30 transition-colors group">
              <div class="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 text-rose-500 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Trust Badge</h3>
              <p class="text-slate-400 leading-relaxed">
                Getting verified on S&amp;B signals professionalism. It tells corporate and high-net-worth clients that you are vetted, reliable, and premium.
              </p>
            </div>

            <div class="p-8 rounded-3xl bg-[#0B0F19] border border-white/5 hover:border-amber-500/30 transition-colors group">
              <div class="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Lead Filtration</h3>
              <p class="text-slate-400 leading-relaxed">
                Our booking flow captures budget, date, and guest count upfront. You only get inquiries that match your pricing tier.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" class="py-24 relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

          <div class="bg-[#0F131F] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div class="text-center mb-10">
              <p class="text-amber-500 font-bold text-sm uppercase tracking-widest mb-2">Join the Collective</p>
              <h2 class="font-serif text-3xl md:text-4xl text-white">Submit your application</h2>
              <p class="text-slate-400 mt-2">Tell us about your business. We review every application within 48 hours.</p>
            </div>

            <form @submit.prevent="submitApplication" class="space-y-8">

              <div class="space-y-6">
                <h3 class="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">1. Business Details</h3>

                <div class="grid md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-300">Business Name</label>
                    <input v-model="form.businessName" type="text" class="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="e.g. Accents & Petals" required />
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-300">Primary Category</label>
                    <select v-model="form.category" class="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" required>
                      <option value="" disabled>Select a category</option>
                      <option value="decorator">Decor &amp; Styling</option>
                      <option value="caterer">Catering &amp; Food</option>
                      <option value="photographer">Photography</option>
                      <option value="dj">DJ / Music</option>
                      <option value="mc">MC / Host</option>
                      <option value="venue">Venue</option>
                    </select>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-300">Short Bio / Pitch</label>
                  <textarea v-model="form.bio" rows="3" class="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none" placeholder="What makes your service unique? (e.g. We specialize in rustic outdoor weddings...)"></textarea>
                </div>
              </div>

              <div class="space-y-6">
                <h3 class="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">2. Portfolio &amp; Contact</h3>

                <div class="grid md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-300">Instagram Handle</label>
                    <div class="relative">
                      <span class="absolute left-4 top-3 text-slate-500">@</span>
                      <input v-model="form.instagram" type="text" class="w-full bg-[#0B0F19] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="stageandbloom" />
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-medium text-slate-300">WhatsApp Number</label>
                    <input v-model="form.whatsapp" type="tel" class="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="+233 XX XXX XXXX" required />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-300">Email Address</label>
                  <input v-model="form.email" type="email" class="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" placeholder="hello@yourbusiness.com" required />
                </div>
              </div>

              <div class="pt-4">
                <button type="submit" :disabled="isSubmitting" class="w-full bg-amber-500 hover:bg-amber-400 text-[#0B0F19] font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <span v-if="isSubmitting" class="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0B0F19]"></span>
                  <span v-else>Submit Application</span>
                </button>
                <p class="text-center text-slate-500 text-xs mt-4">
                  By applying, you agree to our <a href="#" class="underline hover:text-white">Terms of Service</a> for vendors.
                </p>
              </div>

            </form>
          </div>

        </div>
      </section>

    </main>

    <footer class="bg-[#05080F] border-t border-white/5 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 bg-amber-500 text-[#0B0F19] font-serif font-bold flex items-center justify-center rounded-lg">SB</div>
          <span class="font-serif font-bold text-white text-lg">Stage &amp; Bloom</span>
        </div>
        <p class="text-sm text-slate-500">© {{ new Date().getFullYear() }} Stage &amp; Bloom. All rights reserved.</p>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isSubmitting = ref(false)

const form = reactive({
  businessName: '',
  category: '',
  bio: '',
  instagram: '',
  whatsapp: '',
  email: ''
})

const submitApplication = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  alert(`Thanks ${form.businessName}! We received your application.`)
  isSubmitting.value = false
  // Reset or redirect logic here
}
</script>

<style>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>