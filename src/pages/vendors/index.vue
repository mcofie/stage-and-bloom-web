<!-- pages/vendors/index.vue -->
<script setup lang="ts">
const categorySlug = ref('');
const city = ref('');
const minBudget = ref<string>('');
const maxBudget = ref<string>('');
const vendors = ref<any[]>([]);
const loading = ref(false);

async function search() {
  loading.value = true;
  const {data, error} = await useFetch('/api/vendors/search', {
    method: 'POST',
    body: {
      categorySlug: categorySlug.value || undefined,
      city: city.value || undefined,
      minBudget: minBudget.value ? Number(minBudget.value) : undefined,
      maxBudget: maxBudget.value ? Number(maxBudget.value) : undefined,
    },
  });

  if (!error.value && data.value) {
    vendors.value = (data.value as any).vendors || [];
  }
  loading.value = false;
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-4">Find vendors</h1>

    <form @submit.prevent="search" class="grid gap-4 md:grid-cols-4 mb-6">
      <select
          v-model="categorySlug"
          class="border rounded px-3 py-2"
      >
        <option value="">Any category</option>
        <option value="decor">Decor</option>
        <option value="caterer">Caterer</option>
        <option value="dj">DJ</option>
        <option value="photographer">Photographer</option>
        <option value="cake">Cake</option>
      </select>

      <input
          v-model="city"
          class="border rounded px-3 py-2"
          placeholder="City (e.g. Accra)"
      />

      <input
          v-model="minBudget"
          type="number"
          class="border rounded px-3 py-2"
          placeholder="Min budget"
      />

      <input
          v-model="maxBudget"
          type="number"
          class="border rounded px-3 py-2"
          placeholder="Max budget"
      />

      <button
          type="submit"
          class="md:col-span-4 bg-black text-white rounded px-4 py-2"
      >
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
    </form>

    <div class="grid gap-4 md:grid-cols-3">
      <NuxtLink
          v-for="v in vendors"
          :key="v.id"
          :to="`/vendors/${v.slug}`"
          class="border rounded-lg overflow-hidden hover:shadow"
      >
        <div v-if="v.cover_image_url" class="h-40 w-full bg-gray-100 overflow-hidden">
          <img
              :src="v.cover_image_url"
              :alt="v.display_name"
              class="w-full h-full object-cover"
          />
        </div>
        <div class="p-3">
          <div class="flex items-center gap-2">
            <h2 class="font-semibold text-sm">{{ v.display_name }}</h2>
            <span
                v-if="v.is_verified"
                class="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700"
            >
              Verified
            </span>
          </div>
          <p class="text-xs text-gray-500">
            {{ v.vendor_categories?.name }} • {{ v.city }}
          </p>
          <p
              v-if="v.price_range_min != null && v.price_range_max != null"
              class="text-xs mt-1"
          >
            From GHS {{ v.price_range_min.toLocaleString() }} –
            {{ v.price_range_max.toLocaleString() }}
          </p>
          <p
              v-if="v.short_bio"
              class="text-xs text-gray-600 mt-2 line-clamp-2"
          >
            {{ v.short_bio }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>