import { readFileSync } from 'fs'
import { cert, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Load the service account key JSON file
const serviceAccount = JSON.parse(
  readFileSync(new URL('./serviceAccountKey.json', import.meta.url)),
)

// Initialize the Firebase app with the service account
initializeApp({
  credential: cert(serviceAccount),
  projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
})

// Get a Firestore instance
const db = getFirestore()

async function seed() {
  console.log('Seeding Firestore database...')

  // Load seed data from JSON files
  const users = JSON.parse(
    readFileSync(new URL('./seeds/users.json', import.meta.url)),
  )
  const services = JSON.parse(
    readFileSync(new URL('./seeds/services.json', import.meta.url)),
  )
  const bookings = JSON.parse(
    readFileSync(new URL('./seeds/bookings.json', import.meta.url)),
  )

  // Seed users
  for (const user of users) {
    await db.collection('users').add(user)
    console.log(`User ${user.name} seeded.`)
  }

  // Seed services
  for (const service of services) {
    await db.collection('services').add(service)
    console.log(`Service ${service.title} seeded.`)
  }

  // Seed bookings
  for (const booking of bookings) {
    await db.collection('bookings').add(booking)
    console.log(`Booking for service ${booking.serviceId} seeded.`)
  }

  console.log('Seeding completed.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Error seeding Firestore:', error)
  process.exit(1)
})

export {}
