import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../shared/firebase";


export const getEditUserInfo = async ({ uid }: any) => {
  try {
    // Check if a user ID is provided
    if (uid) {
      // Fetch user information from Firestore based on user ID
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('uid', '==', uid));
      const snapshot = await getDocs(q);

      // Extract user information from the snapshot
      let userInfo = null;
      snapshot.forEach(doc => { userInfo = doc.data() });

      return userInfo; // Return user info object or null if not found
    } else {
      console.error('User not authenticated. Please log in.');
      return null; // Return null if user is not authenticated
    }
  } catch (error) {
    console.error('Error fetching user information:', error);
    return null; // Return null in case of error
  }
};