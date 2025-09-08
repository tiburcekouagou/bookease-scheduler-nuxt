/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import type { Service } from '~/types/service'

function mapService(doc: any): Service {
  const data = doc.data()
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    duration: data.duration,
    price: data.price,
    tutorId: data.tutorId,
    isActive: data.isActive,
    createdAt: data.createdAt ? data.createdAt.toDate() : null,
  }
}

export const useServicesList = async (opts: { pageSize?: number | undefined }) => {
  const { $db } = useNuxtApp()
  const services = ref<Service[]>([])
  const loading = ref(true)
  const error = ref<unknown>(null)

  onUnmounted(() => {
    stop()
  })

  const q = query(
    collection($db, 'services'),
    // where('isActive', '==', true),
    orderBy('createdAt', 'desc'),
    limit(opts.pageSize ?? 24),
  )
  services.value = await getDocs(q).then(querySnapshot => querySnapshot.docs.map(mapService))
  const stop = onSnapshot(
    q,
    (querySnapshot) => {
      services.value = querySnapshot.docs.map(mapService)
      loading.value = false
    },
    (err: any) => {
      error.value = err
      loading.value = false
    },
  )

  // const querySnapshot = await getDocs(collection($db, 'services'))
  // const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return { services, loading, error }
}

export const useServiceById = async (serviceId: string) => {
  const { $db } = useNuxtApp()
  const service = ref<Service | null>(null)

  const docRef = doc($db, 'services', serviceId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    service.value = mapService(docSnap)
  }
  else {
    service.value = null
  }

  return { service }
}
