<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const { $auth } = useNuxtApp()

const handleLogin = async () => {
  try {
    await authStore.login($auth, email.value, password.value)
    const q = useRoute().query
    const redirectTo = (q.redirectTo as string) || '/'
    navigateTo(redirectTo)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.error('Login failed:', error.message)
  }
}

// const providers = ref([
//   {
//     label: 'Google',
//     icon: 'i-lucide-google',
//     color: 'neutral',
//     variant: 'sublte',
//   },
//   {
//     label: 'GitHub',
//     icon: 'i-lucide-github',
//     color: 'neutral',
//     variant: 'sublte',
//   },
// ])

// const fields = ref([
//   { name: 'email', type: 'text', label: 'Email' },
//   { name: 'password', type: 'password', label: 'Password' },
// ])
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded">
    <!-- <UAuthForm
      class="max-w-md"
      title="Login"
      description="Enter your credentials to access your account."
      icon="i-lucide-user"
      :fields="fields"
      :providers="providers"
    /> -->
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

    <div class="mt-4 text-sm text-gray-600">
      Don't have an account?
      <NuxtLink
        to="/signup"
        class="text-blue-600 underline"
      >
        Register here
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
