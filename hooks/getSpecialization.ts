import { collection, getDocs } from 'firebase/firestore';
import { db } from '../shared/firebase';


 // Assuming db is your Firebase Firestore database instance

export const getSpecializationCollection = async () => {
  const specializationCollectionRef = collection(db, 'specialization');
  const snapshot = await getDocs(specializationCollectionRef);
  const specializationData = snapshot.docs.map(doc => doc.data());
  return specializationData;
};

// Usage example:
getSpecializationCollection()
  .then(data => { 
  })
  .catch(error => { 
  });