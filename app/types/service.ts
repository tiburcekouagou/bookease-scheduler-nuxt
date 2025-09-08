export interface Service {
  id: string
  title: string
  description: string
  duration: number // in minutes
  price: number // in cents
  tutorId: string
  isActive: boolean
  createdAt?: Date | null
}
