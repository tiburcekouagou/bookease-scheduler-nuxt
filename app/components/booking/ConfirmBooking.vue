<script setup lang="ts">
import { serverTimestamp } from 'firebase/firestore'
import { useBookingStore } from '~/store/booking'

const bookingStore = useBookingStore()
const { addBookings } = useBookings()
const { $auth } = useNuxtApp()
const loading = ref(false)
const error = ref<string | null>(null)
const props = defineProps<{
  serviceId: string
}>()

async function confirm() {
  if (!bookingStore.selectedDate || !bookingStore.selectedTime) {
    error.value = 'Please select a date and time.'
    return
  }
  loading.value = true
  error.value = null
  try {
    await addBookings({
      userId: $auth.currentUser?.uid || '',
      providerId: 'test-provider-id',
      serviceId: props.serviceId,
      date: bookingStore.selectedDate,
      time: bookingStore.selectedTime,
      status: 'confirmed',
      createdAt: serverTimestamp(),
    })
    // Reset selections after booking
    bookingStore.reset()
    alert('Booking confirmed!')
  }
  catch (err) {
    error.value = 'Failed to confirm booking. Please try again.'
    console.error(err)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-2">
    <h2 class="text-lg font-semibold">
      Confirm Booking
    </h2>
    <div
      v-if="error"
      class="text-red-600"
    >
      {{ error }}
    </div>
    <div
      v-if="bookingStore.selectedDate && bookingStore.selectedTime"
      class="space-y-1"
    >
      <p class="text-sm">
        Booking on <strong>{{ bookingStore.selectedDate }}</strong> at
        <strong>{{ bookingStore.selectedTime }}</strong>
      </p>
      <button
        class="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        :disabled="loading || !bookingStore.selectedDate || !bookingStore.selectedTime"
        @click="confirm"
      >
        <span v-if="loading">Confirming...</span>
        <span v-else>Confirm Booking</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
