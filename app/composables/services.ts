import { collection, getDocs } from 'firebase/firestore'

export const useServices = async () => {
  const { $db } = useNuxtApp()
  const querySnapshot = await getDocs(collection($db, 'services'))
  const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  return { services }
}
