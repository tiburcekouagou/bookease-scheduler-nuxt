import type { FieldValue } from 'firebase/firestore'

export interface Booking {
  userId: string
  providerId: string
  serviceId: string
  date: string // ISO date string
  time: string // e.g., "14:00"
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  createdAt: FieldValue // ISO date string
}
