import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../shared/firebase';
import { Alert } from 'react-native';

export const getDoctorsBySpecialization = async ({ specialization }:any) => { 
  try {
    const usersCollectionRef = collection(db, 'doctorProfiles'); 
    const q = query(usersCollectionRef, where('specialization', '==', specialization));
    const snapshot = await getDocs(q);
    const doctorsData = snapshot.docs.map(doc => doc.data());
    
    if (doctorsData.length === 0) {
      //throw new Error('No doctors found for the specified specialization');
      Alert.alert("Message", "No doctors found for the specified specialization")
    }

    return doctorsData;
  } catch (error) { 
    throw error; // You can handle the error further up the call stack if needed
  }
};
