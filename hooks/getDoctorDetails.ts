import { doc, getDoc } from 'firebase/firestore';
import { db } from '../shared/firebase'; // Adjust the path to your firebase configuration

export const getDoctorDetails = async (doctorId: string) => {
  try {
    const docRef = doc(db, 'Doctors', doctorId); // Assuming 'Doctors' is your collection
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Doctor not found');
    }
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    throw new Error('Failed to fetch doctor details');
  }
};
