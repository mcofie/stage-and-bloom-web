<script setup lang="ts">
import { ref, computed } from 'vue';

// Added vendorName and whatsappNumber to props to make the actions functional
const props = defineProps<{
  vendorId: string;
  vendorName?: string;
  whatsappNumber?: string;
}>();

const showMessageModal = ref(false);
const showQuoteModal = ref(false);

// Visitor State (Lead Capture)
const visitor = ref({
  name: '',
  phone: '',
  email: '',
  message: '',
  eventType: 'Wedding',
  details: ''
});

// Open Modals (No Auth Check)
function openMessage() {
  showMessageModal.value = true;
}

function openQuote() {
  showQuoteModal.value = true;
}

// WhatsApp Logic
const whatsappLink = computed(() => {
  if (!props.whatsappNumber) return '#';

  // Clean the number
  const cleanNumber = props.whatsappNumber.replace('+', '').replace(/\s/g, '');

  // Construct message with visitor details
  const text = `Hi ${props.vendorName || 'there'}, my name is ${visitor.value.name}. I saw your profile on Stage & Bloom. ${visitor.value.message}`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
});

function handleWhatsAppRedirect() {
  if (!visitor.value.name || !visitor.value.phone) {
    alert('Please provide your name and number so the vendor knows who is contacting them.');
    return;
  }

  // In a real app, you would save the lead to your DB here before redirecting
  // console.log('Lead Captured:', visitor.value);

  window.open(whatsappLink.value, '_blank');
  showMessageModal.value = false;
}

function handleSubmitQuote() {
  if (!visitor.value.name || !visitor.value.email) {
    alert('Please provide your contact details.');
    return;
  }

  // Mock submission
  alert(`Quote requested for ${visitor.value.name}! We will notify ${props.vendorName}.`);
  showQuoteModal.value = false;
}
</script>

<template>
  <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <h3 class="font-serif text-lg font-semibold text-slate-900 mb-4">
      Interested in this vendor?
    </h3>

    <div class="flex flex-col gap-3">
      <button
          @click="openMessage"
          class="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium rounded-xl px-4 py-3 text-sm transition-all hover:bg-emerald-100 hover:shadow-md active:scale-[0.98]"
      >
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.477 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Message on WhatsApp
      </button>

      <button
          @click="openQuote"
          class="w-full bg-slate-900 text-white font-medium rounded-xl px-4 py-3 text-sm hover:bg-slate-800 hover:shadow-lg transition-all active:scale-[0.98]"
      >
        Request a Quote
      </button>
    </div>

    <div
        v-if="showMessageModal"
        class="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
    >
      <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
        <div class="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <div class="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.477 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.412-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </div>
          <div>
            <h2 class="font-semibold text-lg text-slate-900">Contact Vendor</h2>
            <p class="text-xs text-slate-500">Introduce yourself to start the chat.</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Name</label>
              <input v-model="visitor.name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="Jane Doe">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone Number</label>
              <input v-model="visitor.phone" type="tel" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="054 123 4567">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Message Preview</label>
            <textarea
                v-model="visitor.message"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                rows="3"
                placeholder="I'm interested in your services for..."
            ></textarea>
          </div>
        </div>

        <div class="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-50">
          <button
              class="text-sm font-medium text-slate-500 hover:text-slate-900 px-4 py-2.5 transition-colors rounded-lg hover:bg-slate-50"
              @click="showMessageModal = false"
          >
            Cancel
          </button>
          <button
              @click="handleWhatsAppRedirect"
              class="flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
          >
            Start Chat
            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div
        v-if="showQuoteModal"
        class="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
    >
      <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
        <div class="border-b border-slate-100 pb-4 mb-6">
          <h2 class="font-serif font-bold text-xl text-slate-900">Request a Quote</h2>
          <p class="text-xs text-slate-500 mt-1">Get a custom price for your event.</p>
        </div>

        <div class="space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
              <input v-model="visitor.name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all" placeholder="Jane Doe">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
              <input v-model="visitor.email" type="email" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all" placeholder="jane@example.com">
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone</label>
              <input v-model="visitor.phone" type="tel" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all" placeholder="054...">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Event Details</label>
            <select
                v-model="visitor.eventType"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all cursor-pointer text-slate-700 mb-3">
              <option>Wedding</option>
              <option>Birthday Party</option>
              <option>Corporate Event</option>
              <option>Other</option>
            </select>
            <textarea
                v-model="visitor.details"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all resize-none placeholder:text-slate-400"
                rows="2"
                placeholder="Date, guest count, venue..."
            ></textarea>
          </div>
        </div>

        <div class="mt-8 flex justify-end gap-3 pt-2">
          <button
              class="text-sm font-medium text-slate-500 hover:text-slate-900 px-4 py-2.5 transition-colors rounded-lg hover:bg-slate-50"
              @click="showQuoteModal = false"
          >
            Cancel
          </button>
          <button
              @click="handleSubmitQuote"
              class="bg-slate-900 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform active:scale-95"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  </div>
</template>