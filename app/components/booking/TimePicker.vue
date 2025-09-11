<script setup lang="ts">
import { useBookingStore } from '~/store/booking'

const bookingStore = useBookingStore()

// Dummy time slots for demonstration
const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM']

function selecteTime(time: string) {
  bookingStore.setTime(time)
}
</script>

<template>
  <div
    v-if="bookingStore.selectedDate"
    class="space-y-4"
  >
    <h2 class="text-lg font-semibold">
      Select a Time
    </h2>
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="(t) in times"
        :key="t"
        :class="[
          'px-4 py-2 border rounded',
          bookingStore.selectedTime === t ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white text-gray-800 hover:border-blue-400',
        ]"
        @click="selecteTime(t)"
      >
        {{ t }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
