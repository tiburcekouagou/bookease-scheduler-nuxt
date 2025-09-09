/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FirestoreError, QuerySnapshot } from 'firebase/firestore'
import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import type { Service } from '~/types/service'

/**
 * Maps a Firestore document to a Service object.
 * @param doc - The Firestore document snapshot.
 * @returns The mapped Service object.
 */
function mapService(doc: any): Service {
  const data = doc.data()
  return {
    id: doc.id,
    title: data?.title ?? '',
    description: data?.description ?? '',
    duration: data?.duration ?? '',
    price: data?.price ?? '',
    tutorId: data?.tutorId ?? '',
    isActive: data?.isActive ?? false,
    createdAt: data?.createdAt ? data?.createdAt.toDate() : null,
  }
}

export const useServicesList = async (opts: { pageSize?: number | undefined }) => {
  const { $db } = useNuxtApp()
  const services = ref<Service[]>([])
  const loading = ref(true)
  const error = ref<unknown>(null)
  let unsubscribe: (() => void) | null = null

  const fetchServices = () => {
    try {
      const q = query(
        collection($db, 'services'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        limit(opts.pageSize ?? 24),
      )
      // services.value = await getDocs(q).then(querySnapshot => querySnapshot.docs.map(mapService))
      unsubscribe = onSnapshot(
        q,
        (querySnapshot: QuerySnapshot) => {
          services.value = querySnapshot.docs.map(mapService)
          loading.value = false
        },
        (err: FirestoreError) => {
          error.value = err
          loading.value = false
        },
      )
    }
    catch (err: any) {
      error.value = err.message || 'An error occurred while fetching services.'
      loading.value = false
    }
  }

  fetchServices()
  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
  })

  return { services, loading, error, unsubscribe }
}

/**
 * Fetches a service by its ID.
 * @param serviceId - The ID of the service to fetch.
 * @returns The service object if found, otherwise null.
 */
export const useServiceById = async (serviceId: string) => {
  const { $db } = useNuxtApp()
  const service = ref<Service | null>(null)
  const error = ref<string | null>(null)

  try {
    const docRef = doc($db, 'services', serviceId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      service.value = mapService(docSnap)
    }
    else {
      service.value = null
    }
  }
  catch (error: any) {
    service.value = null
    error.value = (error as any).message || 'An error occurred while fetching the service.'
  }

  return { service, error }
}
