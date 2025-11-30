<script setup lang="ts">
import { usePinnedVendors } from '~/composables/usePinnedVendors';

const props = defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void
}>();

const { vendors, unpin } = usePinnedVendors();
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Backdrop -->
      <Transition
          enter-active-class="transition-opacity duration-300 ease-linear"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300 ease-linear"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div
            v-if="isOpen"
            class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[1000]"
            @click="emit('close')"
        />
      </Transition>

      <!-- Drawer -->
      <Transition
          enter-active-class="transition duration-300 ease-in-out transform"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-300 ease-in-out transform"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
      >
        <div
            v-if="isOpen"
            class="fixed inset-y-0 right-0 z-[1001] w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 class="font-serif font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              Pinned Vendors
              <span class="text-xs font-sans font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">{{ vendors.length }}</span>
            </h2>
            <button
                class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
                @click="emit('close')"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <div v-if="vendors.length === 0" class="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
              <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <svg class="w-8 h-8 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p>No pinned vendors yet.</p>
              <p class="text-sm">Browse vendors and click the pin icon to save them here.</p>
              <NuxtLink
                  to="/vendors/search"
                  class="text-rose-600 font-medium hover:underline"
                  @click="emit('close')"
              >
                Browse Vendors
              </NuxtLink>
            </div>

            <div v-else class="space-y-4">
              <div
                  v-for="vendor in vendors"
                  :key="vendor.id"
                  class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group relative border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
              >
                <!-- Thumbnail -->
                <div class="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <img :src="vendor.imageUrl" class="w-full h-full object-cover" :alt="vendor.name">
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-slate-900 dark:text-white truncate">{{ vendor.name }}</h4>
                  <p class="text-xs text-slate-500 truncate mb-3">{{ vendor.category }} • {{ vendor.location }}</p>
                  
                  <div class="flex items-center gap-2">
                    <NuxtLink
                        :to="`/vendors/${vendor.slug}`"
                        class="px-3 py-1.5 text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity"
                        @click="emit('close')"
                    >
                      View Profile
                    </NuxtLink>
                    <button
                        class="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        title="Unpin"
                        @click="unpin(vendor.id)"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
