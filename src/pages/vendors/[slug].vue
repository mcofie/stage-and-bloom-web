<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const {data, error} = await useFetch(`/api/vendors/${slug}`);

if (error.value) {
  throw createError({statusCode: 404, statusMessage: 'Vendor not found'});
}

const vendor = computed(() => (data.value as any).vendor);
const photos = computed(() =>
    (vendor.value.vendor_photos || []).sort(
        (a: any, b: any) => a.sort_order - b.sort_order
    )
);
const hero = computed(
    () => photos.value.find((p: any) => p.is_cover) || photos.value[0] || null
);
</script>

<template>
  <div v-if="vendor" class="max-w-5xl mx-auto px-4 pb-12">
    <div
        v-if="hero"
        class="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6"
    >
      <img
          :src="hero.image_url"
          :alt="hero.caption || vendor.display_name"
          class="w-full h-full object-cover"
      />
    </div>

    <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4"
    >
      <div>
        <h1 class="text-2xl font-semibold flex items-center gap-2">
          {{ vendor.display_name }}
          <span
              v-if="vendor.is_verified"
              class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700"
          >
            Verified
          </span>
        </h1>
        <p class="text-sm text-gray-600">
          {{ vendor.vendor_categories?.name }} • {{ vendor.city }}
        </p>
        <p
            v-if="
            vendor.price_range_min != null && vendor.price_range_max != null
          "
            class="text-sm mt-1"
        >
          Typical budget:
          GHS {{ vendor.price_range_min.toLocaleString() }} –
          {{ vendor.price_range_max.toLocaleString() }}
        </p>
      </div>

      <!-- actions: auth-gated buttons -->
      <VendorActions :vendor-id="vendor.id"/>
    </div>

    <p v-if="vendor.short_bio" class="text-sm text-gray-700 mb-4">
      {{ vendor.short_bio }}
    </p>

    <!-- Packages -->
    <section v-if="vendor.vendor_rates?.length" class="mb-6">
      <h2 class="font-semibold text-sm mb-2">Packages</h2>
      <div class="space-y-2">
        <div
            v-for="rate in vendor.vendor_rates"
            :key="rate.id"
            class="border rounded p-3 text-xs flex justify-between"
        >
          <div>
            <div class="font-medium">{{ rate.service_name }}</div>
            <div
                v-if="rate.min_guests && rate.max_guests"
                class="text-gray-500"
            >
              For {{ rate.min_guests }} – {{ rate.max_guests }} guests
            </div>
          </div>
          <div class="text-right">
            <div class="font-semibold">
              From GHS {{ rate.starting_from_amount.toLocaleString() }}
            </div>
            <div class="text-gray-500 text-[11px]">
              {{ rate.pricing_model === 'per_guest' ? 'per guest' : 'per event' }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section v-if="photos.length > 1">
      <h2 class="font-semibold text-sm mb-2">Gallery</h2>
      <div class="grid grid-cols-3 gap-2">
        <div
            v-for="p in photos"
            :key="p.id"
            class="h-24 rounded overflow-hidden"
        >
          <img :src="p.image_url" :alt="p.caption || ''" class="w-full h-full object-cover"/>
        </div>
      </div>
    </section>
  </div>
</template>