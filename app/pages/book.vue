<script setup lang="ts">
const route = useRoute()

const serviceId = route.query.serviceId as string
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold text-center">
      Book a Time Slot
    </h1>
    <BookingDatePicker />
    <BookingTimePicker />
    <BookingConfirmBooking :service-id="serviceId" />
  </div>
</template>

<style scoped></style>
