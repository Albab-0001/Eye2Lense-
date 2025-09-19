import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from './config';

/**
 * Tests the connection to Firebase by performing several operations
 * 1. Reading from a collection
 * 2. Creating a test document
 * 3. Creating a second test document (a review)
 * 4. Returns success status and document IDs
 */
export const testFirebaseConnection = async () => {
  try {
    // Step 1: Try to read from the vendors collection
    console.log('Testing Firebase connection...');
    
    const vendorsSnapshot = await getDocs(collection(db, 'vendors'));
    console.log(`Found ${vendorsSnapshot.size} vendors in database`);
    
    // Step 2: Create a test vendor document
    const testVendor = {
      name: 'Test Vendor',
      description: 'This is a test vendor created to verify Firebase connectivity',
      email: 'test@example.com',
      createdAt: Timestamp.now(),
      testDocument: true
    };
    
    const vendorRef = await addDoc(collection(db, 'vendors'), testVendor);
    console.log('Created test vendor with ID:', vendorRef.id);
    
    // Step 3: Create a test review document
    const testReview = {
      vendorId: vendorRef.id,
      rating: 5,
      comment: 'This is a test review',
      createdAt: Timestamp.now(),
      testDocument: true
    };
    
    const reviewRef = await addDoc(collection(db, 'reviews'), testReview);
    console.log('Created test review with ID:', reviewRef.id);
    
    // Clean up the test documents (optional)
    // await deleteDoc(doc(db, 'vendors', vendorRef.id));
    // await deleteDoc(doc(db, 'reviews', reviewRef.id));
    // console.log('Cleaned up test documents');
    
    return {
      success: true,
      message: 'Firebase connection test successful!',
      vendorId: vendorRef.id,
      reviewId: reviewRef.id
    };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return {
      success: false,
      message: 'Firebase connection test failed',
      error: error.message
    };
  }
}; 