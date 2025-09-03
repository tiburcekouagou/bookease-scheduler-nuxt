/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, type Auth, type User } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

type Role = 'admin' | 'customer'

export const useAuthStore = defineStore('auth', () => {
  const db = useNuxtApp().$db as Firestore
  const currentUser = useState<User | null>('currentUser', () => null)
  const loading = ref(false)
  const profile = ref<any>(null)

  const init = async (auth: any, db: any) => {
    // Listen on auth state changes
    onAuthStateChanged(auth, async (user) => {
      loading.value = true
      currentUser.value = user
      if (user) {
        // Fetch user profile from Firestore
        const profileDoc = await getDoc(doc(db, 'users', user.uid))
        profile.value = profileDoc.exists() ? profileDoc.data() : null
      }
      else {
        profile.value = null
      }
    })
    loading.value = false
  }

  async function signup(auth: any, email: string, password: string, name: string, role: Role) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      email,
      role,
      createdAt: serverTimestamp(),
    })

    currentUser.value = cred.user
    profile.value = { name, email, role }
    return cred.user
  }

  async function login(auth: Auth, email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    currentUser.value = cred.user
    return cred.user
  }

  async function logout(auth: any) {
    await auth.signOut()
    currentUser.value = null
    profile.value = null
  }

  return { currentUser, loading, profile, init, signup, login, logout }
})
