<script setup lang="ts">
const { services, loading, error } = await useServicesList({ pageSize: 24 })
</script>

<template>
  <section class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold">
      Available Services
    </h1>
    <p class="text-gray-600 mt-1">
      Pick something that fits your needs.
    </p>

    <div
      v-if="error"
      class="mt-6 text-red-600"
    >
      Could not load services.
    </div>

    <div
      v-if="loading"
      class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6"
    >
      <ServiceCardSkeleton
        v-for="i in 6"
        :key="i"
      />
    </div>

    <div
      v-else-if="services.length === 0"
      class="mt-10 text-gray-500"
    >
      No services available yet.
    </div>

    <div
      v-else
      class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6"
    >
      <ServiceCard
        v-for="s in services"
        :key="s.id"
        :service="s"
      />
    </div>
  </section>
</template>
