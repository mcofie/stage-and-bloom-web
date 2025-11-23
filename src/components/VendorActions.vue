<script setup lang="ts">
const props = defineProps<{ vendorId: string }>();

const user = useSupabaseUser();
const client = useSupabaseClient(); // no import needed
const route = useRoute();
const router = useRouter();

const showMessageModal = ref(false);
const showQuoteModal = ref(false);

function requireAuth(whenAuthed: () => void) {
  if (!user.value) {
    const redirect = encodeURIComponent(route.fullPath);
    // Updated redirect path here
    router.push(`/auth/sign-in?redirect=${redirect}`);
    return;
  }
  whenAuthed();
}

function openMessage() {
  requireAuth(() => {
    showMessageModal.value = true;
  });
}

function openQuote() {
  requireAuth(() => {
    showQuoteModal.value = true;
  });
}
</script>

<template>
  <div>
    <div class="flex gap-2">
      <button
          @click="openMessage"
          class="border border-gray-300 rounded-full px-4 py-2 text-sm transition-colors hover:bg-gray-50"
      >
        Message vendor
      </button>
      <button
          @click="openQuote"
          class="bg-black text-white rounded-full px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
      >
        Request a quote
      </button>
    </div>

    <div
        v-if="showMessageModal"
        class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm p-4"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 class="font-semibold mb-4 text-lg">Message vendor</h2>
        <textarea
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none resize-none"
            rows="4"
            placeholder="Hi, I saw your profile on Stage & Bloom..."
        />
        <div class="mt-6 flex justify-end gap-3">
          <button
              class="text-sm text-gray-600 hover:text-black px-3 py-2 transition-colors"
              @click="showMessageModal = false"
          >
            Cancel
          </button>
          <button
              class="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>

    <div
        v-if="showQuoteModal"
        class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm p-4"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 class="font-semibold mb-4 text-lg">Request a quote</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Event Type</label>
            <select
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none">
              <option>Wedding</option>
              <option>Birthday Party</option>
              <option>Corporate Event</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Additional Details</label>
            <textarea
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none resize-none"
                rows="3"
                placeholder="Date, guest count, venue..."
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button
              class="text-sm text-gray-600 hover:text-black px-3 py-2 transition-colors"
              @click="showQuoteModal = false"
          >
            Cancel
          </button>
          <button
              class="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Submit Request
          </button>
        </div>
      </div>
    </div>
  </div>
</template>