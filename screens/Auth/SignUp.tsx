import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateInput from "../../components/Input/DateInput";
import PasswordInput from "../../components/Input/PasswordInput";
import FormInput from "../../components/Input/FormInput";
import { auth, db, storage } from "../../shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { StyleSheet, Text, View, Image, Alert, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { colors } from '../../css/colorsIndex';
import FormInputTextarea from "../../components/Input/FormInputTextarea";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { ArrowBack } from "../../assets/svg/ArrowBack";
import { CircleImage } from "../../assets/svg/CircleImage";
import BottomButton from "../../components/BottomButton";


const SignUp = () => {
	const toastRef: any = useRef(null);
	const navigation = useNavigation(); // Initialize navigation 
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [next, setNext] = React.useState<any>(1);


	const [input, setInput] = useState<any>({
		displayName: '',
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		location: '',
		address: '',
		date_of_birth: '',
		createdTime: '',
		isActive: '',
		photo_url: '',
		uid: '',
		role: '',
		password: '',
		confirmPassword: '',
	});
	const [formData, setFormData] = useState<any>({
		blood_group: '',
		date_of_birth: '',
		height: '',
		hmo: '',
		medical_history: '',
		weight: '',
		photo_url: '',
		patientId: '',
	});


	const [formErrors, setFormErrors] = useState<any>({});
	const [isLoading, setIsLoading] = useState(false);
	const [isLoading1, setIsLoading1] = useState(false);




	// Handle form input change
	const handleChanges = (name: string, value: string) => {
		setInput({ ...input, [name]: value });
	};
	// Handle form input change
	const handleChange = (name: string, value: string) => {
		setFormData({ ...formData, [name]: value });
		setFormErrors({ ...formErrors, [name]: '' });
	};


	useEffect(() => {
		(async () => {
			// Request permissions for accessing the camera and photo library
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
			}
		})();
	}, []);



	const validateForm = () => {
		const errors: any = {};
		let hasErrors = false;

		if (!formData.first_name.trim()) {
			errors.first_name = 'First Name is required';
			hasErrors = true;
		}

		if (!formData.last_name.trim()) {
			errors.last_name = 'Last Name is required';
			hasErrors = true;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
			hasErrors = true;
		} else if (!emailRegex.test(formData.email)) {
			errors.email = 'Invalid email format';
			hasErrors = true;
		}

		const phoneRegex = /^[0-9]{10,15}$/;
		if (!formData.phone_number.trim()) {
			errors.phone_number = 'Phone Number is required';
			hasErrors = true;
		} else if (!phoneRegex.test(formData.phone_number)) {
			errors.phone_number = 'Invalid phone number';
			hasErrors = true;
		}

		if (!formData.experience_yrs.trim()) {
			errors.experience_yrs = 'Experience is required';
			hasErrors = true;
		} else if (isNaN(formData.experience_yrs) || Number(formData.experience_yrs) <= 0) {
			errors.experience_yrs = 'Invalid experience years';
			hasErrors = true;
		}

		if (!formData.specialization.trim()) {
			errors.specialization = 'Specialization is required';
			hasErrors = true;
		}

		if (!formData.hospital.trim()) {
			errors.hospital = 'Hospital is required';
			hasErrors = true;
		}

		if (!formData.location.trim()) {
			errors.location = 'Location is required';
			hasErrors = true;
		}

		if (!formData.residentialAddress.trim()) {
			errors.residentialAddress = 'Residential Address is required';
			hasErrors = true;
		}

		if (!formData.date_of_birth.trim()) {
			errors.date_of_birth = 'Date of Birth is required';
			hasErrors = true;
		}

		if (formData.password !== formData.confirmPassword) {
			errors.password = 'Passwords do not match';
			hasErrors = true;
		} else if (formData.password.length < 6) {
			errors.password = 'Password must be at least 6 characters long';
			hasErrors = true;
		}

		setFormErrors(errors);
		return !hasErrors;
	};

	// Create user profile
	const handleCreateUser = async (e: React.FormEvent) => {
		e.preventDefault();

		// Basic validation to check if email and password are present
		if (!input.password || input.password.trim() === '') {
			Alert.alert("Missing Password", "Please enter a password to create an account.", [{ text: "OK" }]);
			return;
		}

		if (!input.email || input.email.trim() === '') {
			Alert.alert("Missing Email", "Please enter an email address.", [{ text: "OK" }]);
			return;
		}

		setIsLoading(true);

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, input.email, input.password);
			const user = userCredential.user;

			const userData = {
				uid: user.uid,
				display_name: input.display_name,
				email: input.email,
				first_name: input.first_name,
				last_name: input.last_name,
				phone_number: input.phone_number,
				role: 'PATIENT',
				createdTime: new Date(),
			};

			const userRef = collection(db, 'users');
			await addDoc(userRef, userData);

			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			setNext(2); // Proceed to the next step after success
		} catch (error: any) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			Alert.alert("Error creating user", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Create doctor profile
	const handleCreateDoctor = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const user = auth.currentUser; // Use the already created user

			if (!user) {
				throw new Error("User must be logged in to create a user profile.");
			}


			const userData = {
				patientId: user.uid, // Use the existing user's UID 
				blood_group: formData.blood_group,
				date_of_birth: formData.date_of_birth,
				height: formData.height,
				hmo: formData.hmo,
				isActive: true,
				medical_history: formData.medical_history,
				photo_url: formData.photo_url,
				weight: formData.weight,
			};

			// Create new doctor document in the doctorProfiles collection
			const doctorRef = collection(db, "patientProfiles");
			await addDoc(doctorRef, userData);

			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			setNext(3); // Proceed to the next step after success
		} catch (error: any) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			Alert.alert("Error creating patient profile", error.message);
			console.error(error)
		} finally {
			setIsLoading(false);
		}
	};



	const handleBack = () => {
		navigation.goBack();
	};
	const handleUpdate = async () => {
		setIsLoading(true);

		try {
			// Ensure the user is authenticated
			const user = auth.currentUser;
			if (!user) {
				throw new Error('User is not logged in');
			}

			// Use the UID from the authenticated user
			const uid = user.uid;

			const doctorRef = collection(db, 'users');
			const q = query(doctorRef, where('uid', '==', uid)); // Use the UID from auth

			// Get the query result
			const querySnapshot = await getDocs(q);

			// If no doctor profile is found, throw an error
			if (querySnapshot.empty) {
				throw new Error('Patient not found');
			}

			// Ensure that photoUrl is a string
			if (imageUrl && typeof imageUrl !== 'string') {
				throw new Error('Invalid photo URL format. Must be a string.');
			}

			// Update the photo URL in the document(s) found
			for (const docSnapshot of querySnapshot.docs) {
				const userDocRef = doc(db, 'users', docSnapshot.id);
				const updatedData = {
					...input,
					uid: user.uid,
					role: 'PATIENT', // or other roles if needed
					createdTime: new Date(),
					isActive: true,
					photo_url: imageUrl || '',
				};
				await updateDoc(userDocRef, updatedData);
			}

			// Notify the user of success
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			Alert.alert("Success", "User updated successfully!", [
				{
					text: "OK",
					onPress: () => {
						navigation.navigate('Login');  // Navigate to the login screen
						setNext(1);  // Set next step
					}
				}
			]);


		} catch (error: any) {
			// Handle errors
			Alert.alert(error.message);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		} finally {
			setIsLoading(false);
		}
	};




	const saveImageToFirebase = async (imageUri: any) => {
		setIsLoading1(true)
		if (!imageUri) return;

		const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
		const imageRef = ref(storage, `profileImages/${fileName}`);

		try {
			const response = await fetch(imageUri);
			const blob = await response.blob();

			// Upload the image to Firebase Storage
			await uploadBytes(imageRef, blob);
			setIsLoading1(false)
			// Get the download URL
			const downloadUrl = await getDownloadURL(imageRef);

			return downloadUrl; // Return the download URL after upload
		} catch (error: any) {
			toastRef.current.error(`Failed to upload image: ${error.message}`);
		}
	};





	const pickImage = async () => {
		let result: any = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImageUrl(result.assets[0].uri);
			saveImageToFirebase(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.scrollViewContainer}>
			<TouchableOpacity style={styles.arrowBackcontainer} onPress={handleBack}>
				<ArrowBack />
				<Text style={styles.arrowBackText}>Back</Text>
			</TouchableOpacity>
			<KeyboardAwareScrollView
				contentContainerStyle={styles.container}
				enableOnAndroid={true}
				extraScrollHeight={80}
				keyboardShouldPersistTaps="handled"
				enableAutomaticScroll={Platform.OS === 'ios'}>
				<View style={styles.arrowColorContainer}>
					<View style={next >= 1 ? styles.arrowColorLine : styles.arrowColorLine2}></View>
					<View style={next >= 2 ? styles.arrowColorLine : styles.arrowColorLine2}></View>
					<View style={next >= 3 ? styles.arrowColorLine : styles.arrowColorLine2}></View>
				</View>
				<View >
					{next === 1 ?
						<View>
							<View style={styles.container_title_check_Container}>
								<Text style={styles.container_title_text_check}>
									Enter your phone number or email to get started
								</Text>
								<View style={styles.formInput}>

									<FormInput
										label="Display Name"
										placeholder="Display Name"
										value={input.display_name}
										onChangeText={(text: any) => handleChanges('display_name', text)}
										error={formErrors.display_name}
									/>
									<FormInput
										label="First Name"
										placeholder="First Name"
										value={input.first_name}
										onChangeText={(text: any) => handleChanges('first_name', text)}
										error={formErrors.first_name}
									/>
									<FormInput
										label="Last Name"
										placeholder="Last Name"
										value={input.last_name}
										onChangeText={(text: any) => handleChanges('last_name', text)}
										error={formErrors.last_name}
									/>
									<FormInput
										label="Email"
										placeholder="Email"
										value={input.email}
										onChangeText={(text: any) => handleChanges('email', text)}
										error={formErrors.email}
									/>
									<FormInput
										label="Phone Number"
										placeholder="Phone Number"
										value={input.phone_number}
										onChangeText={(text: any) => handleChanges('phone_number', text)}
										error={formErrors.phone_number}
									/>
									<FormInput
										label="Location"
										placeholder="Location"
										value={input.location}
										onChangeText={(text: any) => handleChanges('location', text)}
										error={formErrors.location}
									/>
									<FormInput
										label=" Address"
										placeholder="Address"
										value={input.address}
										onChangeText={(text: any) => handleChanges('address', text)}
										error={formErrors.address}
									/>

									<DateInput
										label="Date of Birth"
										value={input.date_of_birth}
										onChangeText={(text: any) => handleChanges('date_of_birth', text)}
										error={formErrors.date_of_birth}
									/>
									<PasswordInput
										label="Password"
										value={input.password}
										onChangeText={(text: any) => handleChanges('password', text)}
										error={formErrors.password}
									/>
									<PasswordInput
										label="Confirm Password"
										value={input.confirmPassword}
										onChangeText={(text: any) => handleChanges('confirmPassword', text)}
										error={formErrors.confirmPassword}
									/>

								</View>
							</View>
						</View>
						: next === 2 ?
							<View style={styles.formInput}>
								<View style={styles.container_title_check_Container}>
									<Text style={styles.container_title_text_check}>
										About yourself profile setup
									</Text>

									<FormInput
										label="Blood Group"
										placeholder="Blood Group"
										value={input.blood_group}
										onChangeText={(text: any) => handleChange('blood_group', text)}
										error={formErrors.blood_group}
									/>
									<FormInput
										label="Height"
										placeholder="Height"
										value={input.height}
										onChangeText={(text: any) => handleChange('height', text)}
										error={formErrors.height}
									/>
									<FormInput
										label="Hmo"
										placeholder="Hmo"
										value={input.hmo}
										onChangeText={(text: any) => handleChange('hmo', text)}
										error={formErrors.hmo}
									/>
									<FormInput
										label="Weight"
										placeholder="Weight"
										value={input.weight}
										onChangeText={(text: any) => handleChange('weight', text)}
										error={formErrors.weight}
									/>
									<FormInputTextarea
										multiline
										numberOfLines={4}
										value={input.medical_history}
										onChangeText={(text: string) => handleChange('medical_history', text)}
										placeholder="Medical History"
										placeholderTextColor="gray"
										style={styles.textArea}
									/>
								</View>
							</View>
							: next === 3 &&
							<View>
								<View style={[styles.container_title_check_Container, styles.container_Container]}>

									<TouchableOpacity style={styles.certificationContainer} onPress={pickImage}>
										<View style={styles.uploadflex}>
											<Text></Text>
											<Text>Click to upload Image</Text>
											<TouchableOpacity >
												<CircleImage />
											</TouchableOpacity>
										</View>
									</TouchableOpacity>

									{imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}

									<TouchableOpacity  >
										<Text>
											{isLoading1 &&
												<ActivityIndicator
													color={colors.accent_green}
													size={40} />}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
					}
				</View>

			</KeyboardAwareScrollView>
			<View  >
				{next === 1 && (
					<BottomButton onPress={handleCreateUser} text={"Continue"} isLoading={isLoading} />)}
				{next === 2 && (
					<BottomButton onPress={handleCreateDoctor} text={"Create"} isLoading={isLoading} />
				)}
				{next === 3 && (
					<BottomButton onPress={handleUpdate} text={"Upload"} isLoading={isLoading} />
				)}
			</View>
		</View>
	);
};

export default SignUp

// onPress = { next === 3 ? handlePress : () => setNext(next + 1)}

const styles = StyleSheet.create({
	formInput: {
		gap: 10,
	},

	container_Container: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 50
	},
	image: {
		width: 250,
		height: 250,
		borderRadius: 5,
	},
	certificationContainer: {
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: '#F3F3F3',
		borderWidth: 2,
		borderColor: '#E8E8E8',
		borderStyle: 'dashed',
		borderRadius: 12,
		width: "100%",
		// height: 100,
		marginTop: 10
	},

	uploadflex: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		width: "100%",
	},
	selectDropdown: {
		marginTop: 10,
		marginBottom: 15,
	},
	eSelectDropdown: {
		marginBottom: 10,
	},

	imageBackground: {
		width: 80,
		height: 80,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		borderRadius: 152.94,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageStyle: {
	},

	uploadImageContainer: {

	},


	arrowColorLine2: {
		width: 104,
		height: 4,
		backgroundColor: '#0000001A',
		borderRadius: 15,
	},
	arrowColorLine: {
		width: 104,
		height: 4,
		backgroundColor: colors.accent_green,
		borderRadius: 15,
	},

	arrowColorContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginTop: 20,
	},
	arrowBackcontainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		paddingTop: 60,
		marginLeft: 20,
	},

	arrowBackText: {
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 18,
		letterSpacing: 0.005,

	},
	container_title_text_small: {
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: 0.005,
		marginTop: 16,
		width: 320,
	},



	focusedStyle: {
		borderColor: colors.accent_green,
		borderBottomWidth: 0,
		borderBottomColor: colors.accent_green,
	},
	textArea: {
		marginTop: 8,
		minHeight: 100,
	},
	login_account: {
		height: 50,
		marginTop: 80,
	},
	checkboxContainer: {
		backgroundColor: 'transparent',

	},

	scrollViewContainer: {
		flexGrow: 1,
		paddingBottom: 80,
	},



	container_checkBox: {
		flexDirection: "row",
		alignItems: "center",
	},

	container_title_check_Container: {
		marginTop: 20,
		gap: 15,
	},

	container_title_text_check: {
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		letterSpacing: 0.005,
		marginBottom: 20,
	},


	container_title_p: {
		fontStyle: "normal",
		fontWeight: 400,
		fontSize: 12,
		lineHeight: 20,
		letterSpacing: -0.5,
		color: "rgba(31, 31, 31, 0.86)",
	},


	container: {
		paddingHorizontal: 10,
		paddingBottom: 100
	},
})