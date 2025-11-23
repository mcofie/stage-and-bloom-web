<!-- pages/vendors/natural.vue -->
<script setup lang="ts">
const q = ref('');
const vendors = ref<any[]>([]);
const filters = ref<any | null>(null);
const planner = ref<any | null>(null);
const loading = ref(false);

async function search() {
  loading.value = true;
  const {data, error} = await useFetch('/api/vendors/search-llm', {
    method: 'POST',
    body: {query: q.value},
  });
  if (!error.value && data.value) {
    const val: any = data.value;
    vendors.value = val.vendors || [];
    filters.value = val.filters || null;
    planner.value = val.planner || null;
  }
  loading.value = false;
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-4">
      Describe what you need in plain English
    </h1>

    <form @submit.prevent="search" class="mb-4 space-y-2">
      <textarea
          v-model="q"
          class="w-full border rounded px-3 py-2 h-24"
          placeholder='e.g. "Organising a party for a few friends in Accra, budget around 10k."'
      />
      <button type="submit" class="bg-black text-white px-4 py-2 rounded">
        {{ loading ? 'Thinking…' : 'Search vendors' }}
      </button>
    </form>

    <div v-if="filters" class="mb-4 text-xs text-gray-600">
      <div class="font-semibold mb-1">Interpreted filters:</div>
      <pre class="bg-gray-50 p-2 rounded overflow-x-auto">
{{ JSON.stringify(filters, null, 2) }}
      </pre>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <NuxtLink
          v-for="v in vendors"
          :key="v.id"
          :to="`/vendors/${v.slug}`"
          class="border rounded p-3 hover:shadow"
      >
        <div class="flex justify-between items-center">
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
      </NuxtLink>
    </div>
  </div>
</template>