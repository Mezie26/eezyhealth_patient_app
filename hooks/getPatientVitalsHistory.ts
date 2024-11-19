import { doc, getDoc } from 'firebase/firestore';
import { db } from '../shared/firebase'; // Adjust the path to your Firebase configuration

export const getPatientVitalsHistory = async (userId: string) => {
    try {
        if (typeof userId !== 'string' || !userId) {
            throw new Error('Invalid userId provided');
        } 
        
        // Reference to the specific user's document in the collection
        const vitalsRef = doc(db, 'patientVitalsHistory', userId);
        const docSnap = await getDoc(vitalsRef);

        if (!docSnap.exists()) { 
            return [];
        }

        // Retrieve the entries array if it exists
        const data = docSnap.data();
        const vitalsData = data?.entries || [];

        // Format the date in each entry, checking if `date` exists
        const formattedVitalsData = vitalsData.map((entry: { date?: { toDate: () => Date } }) => {
            const date = entry?.date?.toDate(); // Only call toDate if date exists

            // Return the entry with a formatted date, or null if date is missing
            return {
                ...entry,
                date: date ? date.toLocaleString('en-US', { timeZone: 'UTC' }) : null, // Provide a fallback for missing date
            };
        });

        return formattedVitalsData;
    } catch (error) {
        console.error('Error fetching vitals history:', error);
        throw error;
    }
};
