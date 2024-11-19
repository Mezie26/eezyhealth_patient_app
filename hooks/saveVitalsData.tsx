import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../shared/firebase';

export const saveVitalsData = async (userId: string, vitalsEntry: any) => {
	try {
		const vitalsRef = doc(db, 'patientVitalsHistory', userId);

		// Ensure that fields like upload, comment, recommendation, doctorId, and bookingId are initialized
		const extendedVitalsEntry = {
			...vitalsEntry,
			vitals: vitalsEntry.vitals.map((vital: any) => ({
				...vital,
				comment: vital.comment || '',  // Initialize empty comment if not provided
				recommendation: vital.recommendation || '',  // Initialize empty recommendation if not provided
				upload: vital.upload || {},  // Initialize empty upload if not provided
				doctorId: vital.doctorId || '', // Ensure doctorId is initialized
				bookingId: vital.bookingId || '' // Ensure bookingId is initialized
			}))
		};

		// Check if a document already exists for this user
		const docSnap = await getDoc(vitalsRef);

		if (docSnap.exists()) {
			// Get existing entries
			const existingData = docSnap.data().entries || [];

			// Find if the userId already exists in the entries
			const existingUserIndex = existingData.findIndex((entry: any) => entry.userId === extendedVitalsEntry.userId);

			if (existingUserIndex !== -1) {
				// If userId exists, append new vitals to the existing vitals array
				existingData[existingUserIndex].vitals = [
					...existingData[existingUserIndex].vitals,
					...extendedVitalsEntry.vitals  // Append the new vitals to the existing array
				];

				// Update the document with the updated entries
				await updateDoc(vitalsRef, {
					entries: existingData
				});
			} else {
				// If userId does not exist, add a new entry with the vitals
				await updateDoc(vitalsRef, {
					entries: arrayUnion(extendedVitalsEntry)  // Add new entry to the array using arrayUnion
				});
			}
		} else {
			// If no document exists, create a new one with the first entry
			await setDoc(vitalsRef, {
				entries: [extendedVitalsEntry]  // Create an array with the first entry
			});
		}
	} catch (error) {
		console.error('Error saving vitals data:', error);
	}
};
