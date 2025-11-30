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
const isSubmitting = ref(false);
const toast = useToast();

// Visitor State (Lead Capture)
const visitor = ref({
  name: '',
  phone: '',
  email: '',
  message: '',
  eventType: 'Wedding',
  eventDate: '',
  guestCount: null as number | null,
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

async function submitBookingRequest(type: 'whatsapp' | 'quote' | 'call') {
  isSubmitting.value = true;
  
  // Open window immediately for WhatsApp to avoid popup blockers
  let newWindow: Window | null = null;
  if (type === 'whatsapp') {
    newWindow = window.open('', '_blank');
  }

  try {
    const payload = {
      vendor_id: props.vendorId,
      contact_name: visitor.value.name,
      contact_phone: visitor.value.phone,
      contact_email: visitor.value.email,
      user_message: visitor.value.message || visitor.value.details,
      event_type: visitor.value.eventType,
      event_date: visitor.value.eventDate || null,
      guest_count: visitor.value.guestCount,
      status: 'new'
    };

    await $fetch('/api/booking-requests/create', {
      method: 'POST',
      body: payload
    });

    if (type === 'whatsapp') {
      if (newWindow) {
        newWindow.location.href = whatsappLink.value;
      } else {
        // Fallback if window failed to open
        window.open(whatsappLink.value, '_blank');
      }
      showMessageModal.value = false;
    } else if (type === 'call') {
       if (props.whatsappNumber) {
           window.location.href = `tel:${props.whatsappNumber}`;
       }
       showMessageModal.value = false;
    } else {
      toast.add({
        title: 'Quote Requested!',
        description: `We have notified ${props.vendorName || 'the vendor'} of your interest.`,
        icon: 'i-heroicons-check-circle',
        color: 'success'
      });
      showQuoteModal.value = false;
    }
  } catch (e) {
    console.error('Error submitting request:', e);
    toast.add({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      icon: 'i-heroicons-exclamation-circle',
      color: 'error'
    });
    // Close the window if we opened it but failed
    if (newWindow) newWindow.close();
  } finally {
    isSubmitting.value = false;
  }
}

function handleWhatsAppRedirect() {
  if (!visitor.value.name || !visitor.value.phone) {
    toast.add({
      title: 'Missing Information',
      description: 'Please provide your name and number so the vendor knows who is contacting them.',
      color: 'warning'
    });
    return;
  }
  submitBookingRequest('whatsapp');
}

function handleCallRedirect() {
    if (!visitor.value.name || !visitor.value.phone) {
        toast.add({
            title: 'Missing Information',
            description: 'Please provide your name and number so the vendor knows who is calling.',
            color: 'warning'
        });
        return;
    }
    submitBookingRequest('call');
}

function handleSubmitQuote() {
  if (!visitor.value.name || !visitor.value.email) {
    toast.add({
      title: 'Missing Information',
      description: 'Please provide your contact details.',
      color: 'warning'
    });
    return;
  }
  submitBookingRequest('quote');
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
    <h3 class="font-serif text-lg font-semibold text-slate-900 dark:text-white mb-4">
      Interested in this vendor?
    </h3>

    <div class="flex flex-col gap-3">
      <button
          class="w-full flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium py-3 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
          @click="openMessage"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Message / Call
      </button>

      <button
          class="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-slate-200 dark:shadow-none"
          @click="openQuote"
      >
        Request a Quote
      </button>
    </div>

    <!-- Message / Call Modal -->
    <Teleport to="body">
      <div
          v-if="showMessageModal"
          class="fixed inset-0 z-[999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
      >
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-700 relative">
          <div class="flex items-center gap-4 mb-6">
            <div class="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 class="font-serif font-bold text-xl text-slate-900 dark:text-white">Contact Vendor</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Introduce yourself to start the chat.</p>
            </div>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Your Name</label>
                <input v-model="visitor.name" type="text" class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white" placeholder="Jane Doe">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input v-model="visitor.phone" type="tel" class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white" placeholder="054 123 4567">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Message Preview</label>
              <textarea
                  v-model="visitor.message"
                  class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none text-slate-900 dark:text-white"
                  rows="3"
                  placeholder="I'm interested in your services for..."
              />
            </div>
          </div>

          <div class="mt-8 flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
            <button
                class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                :disabled="isSubmitting"
                @click="showMessageModal = false"
            >
              Cancel
            </button>
            <button
                class="flex items-center gap-2 bg-slate-800 dark:bg-slate-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-slate-900 dark:hover:bg-slate-600 transition-all"
                :disabled="isSubmitting"
                @click="handleCallRedirect"
            >
               <span v-if="isSubmitting">...</span>
               <span v-else>Call</span>
            </button>
            <button
                class="flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none active:scale-95"
                :disabled="isSubmitting"
                @click="handleWhatsAppRedirect"
            >
              <span v-if="isSubmitting">...</span>
              <span v-else>WhatsApp</span>
              <svg v-if="!isSubmitting" class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Quote Modal -->
    <Teleport to="body">
      <div
          v-if="showQuoteModal"
          class="fixed inset-0 z-[999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all"
      >
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-700 relative">
          <div class="border-b border-slate-100 dark:border-slate-700 pb-4 mb-6">
            <h2 class="font-serif font-bold text-xl text-slate-900 dark:text-white">Request a Quote</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Get a custom price for your event.</p>
          </div>

          <div class="space-y-5">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <input v-model="visitor.name" type="text" class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-slate-900 dark:text-white" placeholder="Jane Doe">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                <input v-model="visitor.email" type="email" class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-slate-900 dark:text-white" placeholder="jane@example.com">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Phone</label>
                <input v-model="visitor.phone" type="tel" class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all text-slate-900 dark:text-white" placeholder="054...">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Event Details</label>
              <select
                  v-model="visitor.eventType"
                  class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all cursor-pointer text-slate-700 dark:text-white mb-3">
                <option>Wedding</option>
                <option>Birthday Party</option>
                <option>Corporate Event</option>
                <option>Other</option>
              </select>
              <textarea
                  v-model="visitor.details"
                  class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all resize-none placeholder:text-slate-400 text-slate-900 dark:text-white"
                  rows="2"
                  placeholder="Date, guest count, venue..."
              />
            </div>
          </div>

          <div class="mt-8 flex justify-end gap-3 pt-2">
            <button
                class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                :disabled="isSubmitting"
                @click="showQuoteModal = false"
            >
              Cancel
            </button>
            <button
                class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl transform active:scale-95"
                :disabled="isSubmitting"
                @click="handleSubmitQuote"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Request</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
