import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../shared/firebase';
  // Assuming db is your Firebase Firestore database instance

 

export const createRatings = async (input: any) => {
 
  try {
    // Add the rating data to the ratings collection
    const docRef = await addDoc(collection(db, 'ratings'), input); 

    return { success: true, message: 'Ratings successfully.' };
  } catch (error) {
    console.error('Error adding ratings:', error);
    // Throw specific error message for better logging/handling
    throw new Error('An error occurred while adding the ratings.');
  }
};
