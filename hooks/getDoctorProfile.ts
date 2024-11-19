import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../shared/firebase";

// Function to get doctor profile by ID
export const getDoctorProfile = async (doctorId: string) => {
  try {
    const usersCollectionRef = collection(db, 'doctorProfiles'); 
        const q = query(usersCollectionRef, where('doctorProfiles', '==', doctorId)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doctorsData = querySnapshot.docs.map(doc => doc.data());
      return doctorsData[0]; // Assuming you're only fetching one result
    } else {
      throw new Error('Doctor not found');
    }
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    throw error;
  }
};
