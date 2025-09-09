/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, type Auth, type User } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

type Role = 'admin' | 'customer'

interface UserProfile {
  name: string
  email: string
  role: Role
  createdAt: any
}

/**
 * Auth Store for managing user authentication and profile state.
 */
export const useAuthStore = defineStore('auth', () => {
  const currentUser = useState<User | null>('currentUser', () => null)
  const loading = ref(false)
  const profile = ref<UserProfile | null>(null)
  const error = ref<string | null>(null)

  /**
   * Initializes auth state listener and loads user profile.
   * @param auth auth Firebase Auth instance
   * @param db Firestore instance
   */
  const init = async (auth: Auth, db: Firestore) => {
    // Listen on auth state changes
    onAuthStateChanged(auth, async (user) => {
      loading.value = true
      currentUser.value = user
      if (user) {
        // Fetch user profile from Firestore
        const profileDoc = await getDoc(doc(db, 'users', user.uid))
        profile.value = profileDoc.exists() ? profileDoc.data() as UserProfile : null
      }
      else {
        profile.value = null
      }
    })
    loading.value = false
  }

  /**
   * Signs up a new user, creates their profile in Firestore
   * @param auth Firebase Auth instance
   * @param db Firestore instance
   * @param email User email
   * @param password User password
   * @param name User name
   * @param role User role
   * @returns The created Firebase User or null on failure
   */
  async function signup(
    auth: Auth,
    db: Firestore,
    email: string,
    password: string,
    name: string,
    role: Role,
  ): Promise<User | null> {
    loading.value = true
    error.value = null

    try {
      // Create user in Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      // Log in the user
      await login(auth, email, password)
      const usersRef = collection(db, 'users')
      // Create user profile in Firestore
      await setDoc(doc(usersRef, cred.user.uid), {
        name,
        email,
        role,
        createdAt: serverTimestamp(),
      })

      currentUser.value = cred.user
      profile.value = { name, email, role, createdAt: new Date() }
      return cred.user
    }
    catch (error: any) {
      error.value = error.message || 'Signup failed.'
      return null
    }
    finally {
      loading.value = false
    }
  }

  /**
   * Logs in a user.
   * @param auth Firebase Auth instance
   * @param email User email
   * @param password User password
   * @returns The logged-in Firebase User or null on failure
   */
  async function login(auth: Auth, email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      currentUser.value = cred.user
      return cred.user
    }
    catch (error: any) {
      error.value = error.message || 'Login failed.'
      return null
    }
    finally {
      loading.value = false
    }
  }

  /**
   * @param auth Firebase Auth instance
   * Logs out the current user.
   */
  async function logout(auth: any) {
    try {
      await auth.signOut()
      currentUser.value = null
      profile.value = null
    }
    catch (error: any) {
      error.value = error.message || 'Logout failed.'
    }
    finally {
      loading.value = false
    }
  }

  return { currentUser, loading, profile, error, init, signup, login, logout }
})
