<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const { $auth } = useNuxtApp()

const handleLogin = async () => {
  try {
    await authStore.login($auth, email.value, password.value)
    navigateTo('/')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.error('Login failed:', error.message)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded">
    <h1 class="text-xl font-bold mb-4">
      Login
    </h1>

    <form @submit.prevent="handleLogin">
      <input
        v-model="email"
        type="text"
        placeholder="Email"
        class="w-full mb-4 p-2 border rounded"
        autocomplete="username"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-4 p-2 border rounded"
        autocomplete="current-password"
      >
      <button
        class="bg-blue-600 text-white p-2 rounded w-full"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style scoped></style>
