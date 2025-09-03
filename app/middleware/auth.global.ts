import { getAuth } from 'firebase/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = getAuth()
  const user = auth.currentUser

  //   If the user is not authenticated and trying to access a protected route, redirect to login
  if (!user && !['/login', '/signup'].includes(to.path)) {
    return navigateTo('/login')
  }
})
