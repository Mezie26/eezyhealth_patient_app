import { addDoc, collection } from 'firebase/firestore';
import { db } from '../shared/firebase'; // Adjust the path to your firebase configuration
import { getDoctorDetails } from './getDoctorDetails';

export const createAppointment = async (appointmentDetails: {
  slot: string;
  bookingChannel: string;
  bookingDate: string;
  doctorId: string;
  userId: string;
  displayName: string;
  comments?: string[]; // Optional
}) => {
  try {
    // Fetch doctor details
    const doctorDetails = await getDoctorDetails(appointmentDetails.doctorId);

    // Define the payload with doctor details
    const payload = {
      bookingChannel: appointmentDetails.bookingChannel,
      bookingDate: new Date(appointmentDetails.bookingDate).toISOString(), // Convert to ISO timestamp
      bookingStatus: 'Pending',
      comments: appointmentDetails.comments || [], // Default to empty array if not provided
      displayName: appointmentDetails.displayName,
      doctorId: appointmentDetails.doctorId,
      doctorName: doctorDetails.doctorName,
      hospital: doctorDetails.hospital,
      paymentStatus: 'Not Paid',
      photo_url: doctorDetails.photo_url || '', // Use default if not available
      slot: appointmentDetails.slot,
      specialization: doctorDetails.specialization,
      userId: appointmentDetails.userId,
    };

    // Add the appointment data to the 'Bookings' collection
    const docRef = await addDoc(collection(db, 'Bookings'), payload);

    // Include the generated bookingId in the response
    return { 
      success: true, 
      message: 'Appointment successfully created.', 
      bookingId: docRef.id // Use Firestore-generated ID as bookingId
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    // Throw specific error message for better logging/handling
    throw new Error('An error occurred while creating the appointment.');
  }
};
