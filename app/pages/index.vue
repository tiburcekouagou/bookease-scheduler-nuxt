<script setup lang="ts">
const { services } = await useServices()
</script>

<template>
  <div>
    <h1>Available services</h1>
    <pre>{{ services }}</pre>
  </div>
</template>

<style scoped></style>
