<script setup lang="ts">
import type { Service } from '~/types/service'
import { useAuthStore } from '@/store/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const service = ref<Service | null>(null)
const loading = ref(true)

onMounted(async () => {
  service.value = await useServiceById(route.params.id as string)
  loading.value = false
})

function bookNow() {
  const id = route.params.id as string
  if (!auth.currentUser) {
    // send user back to this page after login, then open booking step
    const returnTo = encodeURIComponent(`/services/${id}?bookNow=1`)
    return router.push(`/login?returnTo=${returnTo}`)
  }
  // Navigate to your booking flow (we'll build next)
  router.push(`/book?serviceId=${id}`)
}
</script>

<template>
  <section class="max-w-3xl mx-auto px-4 py-8">
    <div
      v-if="loading"
      class="animate-pulse"
    >
      <div class="h-7 bg-gray-200 w-2/3 rounded" />
      <div class="h-4 bg-gray-100 w-full rounded mt-4" />
      <div class="h-4 bg-gray-100 w-5/6 rounded mt-2" />
      <div class="h-10 w-32 bg-gray-200 rounded-xl mt-6" />
    </div>

    <div
      v-else-if="!service"
      class="text-gray-600"
    >
      Service not found.
    </div>

    <div v-else>
      <h1 class="text-2xl font-bold">
        {{ service.title }}
      </h1>
      <p class="text-gray-600 mt-2">
        {{ service.description }}
      </p>

      <div class="flex items-center gap-4 mt-4 text-sm">
        <span class="px-2 py-1 rounded bg-gray-100">{{ service.duration }} min</span>
        <span class="px-2 py-1 rounded bg-gray-100">\${{ service.price }}</span>
        <span
          v-if="service.createdAt"
          class="text-gray-500"
        >
          Added {{ new Date(service.createdAt).toLocaleDateString() }}
        </span>
      </div>

      <button
        class="mt-6 rounded-xl px-4 py-2 bg-blue-600 text-white"
        @click="bookNow"
      >
        Book now
      </button>
    </div>
  </section>
</template>
