import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../shared/firebase';
 
  
export const getPaymentDataByPaymentID = async ({ paymentID }: any) => {
  try {
    // Create a reference to the Payment collection
    const PaymentCollectionRef = collection(db, 'payments');

     const q = query(PaymentCollectionRef, where('data.metadata.userId', '==', String(paymentID)));
  

    // Fetch the documents
    const snapshot = await getDocs(q); 

    const paymentData = snapshot?.docs.map(doc => {
      const data = doc.data(); 
      return {
        id: doc?.id,
        paymentID: data?.data?.metadata?.paymentID, // Accessing paymentID from data.metadata.paymentID
        event: data?.event,
        data: {
          ...data?.data
        }
      };
    }); 

    if (paymentData.length === 0) { 
      return { message: 'No Payment found for this user.' };
    }

    // Return the Payment data
    return paymentData;

    // Return the Payment data
    return paymentData;
  } catch (error) {
    console.error('Error fetching Payment collection:', error);
    // Throw specific error message for better logging/handling
    throw new Error('An error occurred while retrieving Payment.');
  }
};





