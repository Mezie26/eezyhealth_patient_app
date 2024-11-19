import { addDoc, collection } from 'firebase/firestore';
import { db } from '../shared/firebase';
  // Assuming db is your Firebase Firestore database instance

 

export const createSurveys = async (questionaire: any) => {
  try {
    // Add the survey data to the surveys collection
    const docRef = await addDoc(collection(db, 'surveys'), questionaire); 

    return { success: true, message: 'Survey successfully added.' };
  } catch (error) {
    console.error('Error adding survey:', error);
    // Throw specific error message for better logging/handling
    throw new Error('An error occurred while adding the survey.');
  }
};
