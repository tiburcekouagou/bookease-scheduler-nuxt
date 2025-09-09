<script setup lang="ts">
import type { Service } from '~/types/service'

defineProps<{ service: Service }>()
</script>

<template>
  <div class="rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
    <h3 class="text-lg font-semibold">
      {{ service.title }}
    </h3>
    <p class="text-sm text-gray-600 line-clamp-2 mt-1">
      {{ service.description }}
    </p>
    <div class="flex items-center gap-3 text-sm mt-3">
      <span>{{ service.duration }} min</span>
      <span>•</span>
      <span>\${{ service.price }}</span>
    </div>
    <NuxtLink
      :to="`/services/${service.id}`"
      class="mt-4 inline-block rounded-xl px-4 py-2 bg-blue-600 text-white"
    >
      View details
    </NuxtLink>
  </div>
</template>
