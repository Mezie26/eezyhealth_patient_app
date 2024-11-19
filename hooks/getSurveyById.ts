import { collection,  getDocs, query, where } from "firebase/firestore";
import { db } from "../shared/firebase";

export const getSurveyById = async ({ uid }: any) => {
  try {
    // Create a reference to the surveys collection
    const surveysCollectionRef = collection(db, 'surveys');

    // Create a query to get surveys with the specified user ID
    const q = query(surveysCollectionRef, where('userId', '==', String(uid)));

    // Fetch the documents
    const snapshot = await getDocs(q);
    const surveysData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (surveysData.length === 0) {
      // Handle case where no surveys were found
      return { message: 'No surveys found for this user.' };
    }

    // Return the surveys data
    return surveysData;
  } catch (error) {
    console.error('Error fetching surveys collection:', error);
    // Throw specific error message for better logging/handling
    throw new Error('An error occurred while retrieving surveys.');
  }
};