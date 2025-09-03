<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const { $auth } = useNuxtApp()
const { signup } = useAuthStore()

async function handleSignup() {
  try {
    await signup($auth, email.value, password.value, name.value, 'customer')
    navigateTo('/')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.error('Signup failed:', error.message)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded">
    <h1 class="text-xl font-bold mb-4">
      Signup
    </h1>

    <input
      v-model="name"
      type="text"
      placeholder="Name"
      class="w-full mb-4 p-2 border rounded"
    >
    <input
      v-model="email"
      type="text"
      placeholder="Email"
      class="w-full mb-4 p-2 border rounded"
    >
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full mb-4 p-2 border rounded"
    >
    <button
      class="bg-blue-600 text-white p-2 rounded w-full"
      @click="handleSignup"
    >
      Signup
    </button>
  </div>
</template>

<style scoped></style>
