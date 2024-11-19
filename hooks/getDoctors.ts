import { collection, getDocs } from 'firebase/firestore';
import { db } from '../shared/firebase';
  // Assuming db is your Firebase Firestore database instance

export const getDoctorsCollection = async () => {
  try {
    const doctorsCollectionRef = collection(db, 'doctorProfiles');
    const snapshot = await getDocs(doctorsCollectionRef);
    const doctorsData = snapshot.docs.map(doc => doc.data());
    return doctorsData;
  } catch (error) { 
    throw error; // You can handle the error further up the call stack if needed
  }
};

// Usage example:
getDoctorsCollection()
  .then(data => { 
  })
  .catch(error => { 
  });
