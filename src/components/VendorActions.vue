<!-- components/VendorActions.vue -->
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
    router.push(`/login?redirect=${redirect}`);
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
          class="border border-gray-300 rounded-full px-4 py-2 text-sm"
      >
        Message vendor
      </button>
      <button
          @click="openQuote"
          class="bg-black text-white rounded-full px-4 py-2 text-sm"
      >
        Request a quote
      </button>
    </div>

    <!-- Message modal skeleton -->
    <div
        v-if="showMessageModal"
        class="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-4 w-full max-w-md">
        <h2 class="font-semibold mb-2 text-sm">Message vendor</h2>
        <textarea
            class="w-full border rounded px-2 py-1 text-sm"
            rows="4"
            placeholder="Write a message to the vendor..."
        />
        <div class="mt-3 flex justify-end gap-2">
          <button
              class="text-xs text-gray-500"
              @click="showMessageModal = false"
          >
            Cancel
          </button>
          <button class="bg-black text-white text-xs px-3 py-1 rounded">
            Send
          </button>
        </div>
      </div>
    </div>

    <!-- Quote modal skeleton -->
    <div
        v-if="showQuoteModal"
        class="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-4 w-full max-w-md">
        <h2 class="font-semibold mb-2 text-sm">Request a quote</h2>
        <!-- You can wire these refs and call submitQuote() -->
        <p class="text-xs text-gray-500 mb-2">
          (Here you capture event type, date, guests, budget, etc.)
        </p>
        <div class="mt-3 flex justify-end gap-2">
          <button
              class="text-xs text-gray-500"
              @click="showQuoteModal = false"
          >
            Cancel
          </button>
          <button class="bg-black text-white text-xs px-3 py-1 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>