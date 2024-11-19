import {   doc,   updateDoc } from 'firebase/firestore';
import {   db } from '../shared/firebase';
 


export const updateUserInfo = async ({ uid, input }: { uid: string, input: any }) => {
  try {
    // Check if a user ID is provided
    if (uid) {
      // Create a reference to the user document
      const userDocRef = doc(db, 'users', uid);

      // Update the user document with the new information
      await updateDoc(userDocRef, input); 
      return true; // Return true if update is successful
    } else {
      console.error('User not authenticated. Please log in.');
      return false; // Return false if user is not authenticated
    }
  } catch (error) {
    console.error('Error updating user information:', error);
    return false; // Return false in case of error
  }
};

export const saveImageToFirebase = async (uid: any, selectedImage: any) => {
  try {
    // Call the updateUserInfo function to update the photo_url
    const success = await updateUserInfo({
      uid: uid,
      input: { photo_url: selectedImage }
    });

    if (success) { 
    } else {
      console.error('Error saving image URI to Firestore: User not authenticated or update failed.');
    }
  } catch (error) {
    console.error('Error saving image URI to Firestore:', error);
  }
};