import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from './config';

/**
 * Initializes Firestore collections if they don't exist
 */
export const initializeFirestore = async () => {
  try {
    console.log('Initializing Firestore collections...');
    
    // Check if collections exist
    const collections = ['users', 'vendors', 'reviews'];
    
    for (const collectionName of collections) {
      try {
        // Try to get documents from the collection
        const snapshot = await getDocs(collection(db, collectionName));
        console.log(`Collection ${collectionName} exists with ${snapshot.size} documents`);
      } catch (err) {
        console.warn(`Error checking collection ${collectionName}:`, err);
        
        // Create a sample document to ensure the collection exists
        try {
          await setDoc(
            doc(db, collectionName, 'sample-doc'),
            {
              createdAt: new Date(),
              isTestDocument: true,
              note: `This is a sample document created to initialize the ${collectionName} collection`
            }
          );
          console.log(`Created sample document in ${collectionName} collection`);
        } catch (createErr) {
          console.error(`Failed to create sample document in ${collectionName}:`, createErr);
        }
      }
    }
    
    console.log('Firestore initialization complete');
    return true;
  } catch (error) {
    console.error('Failed to initialize Firestore:', error);
    return false;
  }
}; 