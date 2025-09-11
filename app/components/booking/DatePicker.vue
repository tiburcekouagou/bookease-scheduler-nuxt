<script setup lang="ts">
import dayjs from 'dayjs'
import { useBookingStore } from '~/store/booking'

const bookingStore = useBookingStore()
const days = ref(
  Array.from({ length: 14 }, (_, i) => dayjs().add(i, 'day').format('YYYY-MM-DD')),
)
function selectedDate(date: string) {
  bookingStore.setDate(date)
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-semibold">
      Select a Date
    </h2>
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="(d) in days"
        :key="d"
        :class="[
          'px-4 py-2 border rounded',
          bookingStore.selectedDate === d ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white text-gray-800 hover:border-blue-400',
        ]"
        @click="selectedDate(d)"
      >
        {{ d }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
