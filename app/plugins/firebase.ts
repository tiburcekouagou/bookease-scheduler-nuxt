import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { useAuthStore } from '~/store/auth'
import type { FirebaseConfig } from '~/types/firebase'

export default defineNuxtPlugin(() => {
  const firebaseConfig: FirebaseConfig = {
    apiKey: useRuntimeConfig().public.firebaseApiKey,
    authDomain: useRuntimeConfig().public.firebaseAuthDomain,
    projectId: useRuntimeConfig().public.firebaseProjectId,
    storageBucket: useRuntimeConfig().public.firebaseStorageBucket,
    messagingSenderId: useRuntimeConfig().public.firebaseMessagingSenderId,
    appId: useRuntimeConfig().public.firebaseAppId,
  }

  const app = initializeApp(firebaseConfig)

  const db = getFirestore(app)
  const auth = getAuth(app)

  // Initialize auth store
  const authStore = useAuthStore()
  authStore.init(auth, db)

  // Provide auth and db instances to the app
  return { provide: { auth, db } }
})
