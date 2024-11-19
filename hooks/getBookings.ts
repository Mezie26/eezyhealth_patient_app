import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../shared/firebase';
  // Assuming db is your Firebase Firestore database instance

export const getBookings = async ({ userId }: any) => {
  
 
  try {
    const bookingsCollectionRef = collection(db, 'Bookings');
      const q = query(bookingsCollectionRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const bookingsData = snapshot?.docs?.map(doc => doc?.data());


 if (bookingsData?.length === 0) {
      throw new Error('No Bookings found!');
    }


    return bookingsData;
  } catch (error) {
    // console.error('Error fetching Bookings collection:', error);
    // throw error;
  }
};