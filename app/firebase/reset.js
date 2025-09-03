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
})

// Get a Firestore instance
const db = getFirestore()

async function seed() {
  console.log('Resetting Firestore database...')
  // Reset the database by deleting all documents in the collections
  const collections = ['users', 'services', 'bookings']
  for (const collectionName of collections) {
    const collectionRef = db.collection(collectionName)
    const snapshot = await collectionRef.get()
    const deletePromises = snapshot.docs.map(doc => doc.ref.delete())
    await Promise.all(deletePromises)
    console.log(`Cleared collection: ${collectionName}`)
  }
  console.log('Database reset completed.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Error seeding Firestore:', error)
  process.exit(1)
})

export {}
