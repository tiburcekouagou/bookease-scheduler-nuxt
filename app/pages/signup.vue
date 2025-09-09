<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const { $auth, $db } = useNuxtApp()
const { signup } = useAuthStore()

async function handleSignup() {
  try {
    await signup($auth, $db, email.value, password.value, name.value, 'customer')
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

    <form @submit.prevent="handleSignup">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        class="w-full mb-4 p-2 border rounded"
        autocomplete="name"
      >
      <input
        v-model="email"
        type="text"
        placeholder="Email"
        class="w-full mb-4 p-2 border rounded"
        autocomplete="email"
      >
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-4 p-2 border rounded"
        autocomplete="new-password"
      >
      <button class="bg-blue-600 text-white p-2 rounded w-full">
        Signup
      </button>
    </form>
    <div class="mt-4 text-sm text-gray-600">
      Already have an account?
      <NuxtLink
        to="/login"
        class="text-blue-600 underline"
      >
        Login here
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
