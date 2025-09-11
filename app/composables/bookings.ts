import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import type { Booking } from '~/types/bookings'

export const useBookings = () => {
  const { $db } = useNuxtApp()
  async function addBookings(booking: Booking) {
    await addDoc(collection($db, 'bookings'), {
      ...booking,
      status: 'pending',
      createdAt: serverTimestamp(),
    })
  }
  return { addBookings }
}
