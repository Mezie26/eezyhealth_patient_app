import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../shared/firebase';
 

 export const getAllDoctorsByRole = async ( ) => {
  try {
    // Reference to the 'doctors' collection
    const doctorsCollection = collection(db, 'users');

    // Create a query where the role is 'DOCTOR'
    const doctorsQuery = query(doctorsCollection, where('role', '==', 'DOCTOR'));

    // Execute the query and get the documents
    const querySnapshot = await getDocs(doctorsQuery);

    // Array to hold the doctor data
    const doctors:any = [];

    // Loop through the snapshot to get each doctor's data
    querySnapshot.forEach((doc) => {
      doctors.push(doc.data());
    }); 

    return doctors; // Return the doctors array for further use
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}; 
