import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../shared/firebase';
  // Assuming db is your Firebase Firestore database instance

export const checkSurveys = async ({ userId }: any) => {
  try {
    const surveysCollectionRef = collection(db, 'surveys');

    // Improved query to ensure userId is a string for robust comparison
    const q = query(surveysCollectionRef, where('userId', '==', String(userId)));

    const snapshot = await getDocs(q);
    const surveysData = snapshot?.docs?.map(doc => doc?.data());

    if (!surveysData || surveysData.length === 0) {
      // Handle case where no surveys found or data retrieval fails
      return { message: 'No surveys found for this user.' };
    }

    return surveysData;
  } catch (error) {
    console.error('Error fetching surveys collection:', error);
    // Throw specific error message for better logging/handling
    throw new Error('An error occurred while retrieving surveys.');
  }
};
