import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../shared/firebase';
  // Assuming db is your Firebase Firestore database instance

export const getPricing= async ( ) => {
  try {
			const pricingRef = collection(db, 'pricing'); 
     const snapshot = await getDocs(pricingRef);
    // const snapshot = await getDocs(q);
    const pricing = snapshot.docs.map(doc => doc.data()); 
			

    return pricing;
  } catch (error) {
    console.error('Error fetching pricing collection:', error);
    throw error; // You can handle the error further up the call stack if needed
  }
};

 
