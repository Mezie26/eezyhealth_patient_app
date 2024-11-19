import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../../css/colorsIndex';
import FormInput from '../../../components/Input/FormInput';
import DateInput from '../../../components/Input/DateInput';
import * as Haptics from 'expo-haptics';
import Toast from '../../../components/Toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/storage';
import { db, storage } from '../../../shared/firebase';
import { ProgressBar } from 'react-native-paper';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { login, reset } from '../../../features/authSlice';
import { Pencil } from '../../../assets/svg/Pencil';

const EditAccount = () => {
	const toastRef: any = useRef(null);
	const { user } = useAppSelector((state: any) => state.auth);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(login());
	}, [dispatch]); // Only dispatch is a dependency 
	const [selectedImage, setSelectedImage] = useState(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isImage, setIsImage] = useState<boolean>(false);
	// @ts-ignore
	const [input, setInput] = useState<any>({
		display_name: '',
		phone_number: '',
		email: '',
		// @ts-ignore
		date_of_birth: input?.date_of_birth === undefined ? "" : new Date(),
		address: '',
		uid: '',
		hmo: '',
		first_name: '',
		last_name: '',
		photo_url: '',
	});





	useEffect(() => {
		(async () => {
			// Request permissions for accessing the camera and photo library
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
			}
		})();
	}, []);

	const pickImage = async () => {
		let result: any = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setSelectedImage(result.assets[0].uri);
			saveImageToFirebase(result.assets[0].uri);
		}
	};

	const saveImageToFirebase = async (imageUri: string) => {
		if (!imageUri) return;

		const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
		const imageRef = ref(storage, `profileImages/${fileName}`);

		try {
			const response = await fetch(imageUri);
			const blob = await response.blob();

			await uploadBytes(imageRef, blob);
			const downloadUrl = await getDownloadURL(imageRef);
			setIsImage(true)
			// After successfully uploading, call handleUpdate with the new photoUrl
			await handleUpdate(downloadUrl);
		} catch (error: any) {
			toastRef.current?.error(error.message);
		}
	};



	const getUserInfoFromStorage = async () => {
		try {

			if (user) {
				setInput({
					display_name: user?.display_name || '',
					phone_number: user?.phone_number || '',
					email: user?.email || '',
					date_of_birth: user?.date_of_birth || '',
					address: user?.address || '',
					hmo: user?.hmo || '',
					last_name: user?.last_name || '',
					first_name: user?.first_name || '',
					uid: user?.uid || '',
					photo_url: user?.photo_url || '',
				});
			}
		} catch (error) {
		}
	};

	useEffect(() => {
		// fetchUserInfo();
		getUserInfoFromStorage();
	}, [])


	const handleUpdate = async (photoUrl?: string) => {
		setIsLoading(true);

		try {
			const userRef = collection(db, 'users');
			const q = query(userRef, where('uid', '==', input.uid));
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				throw new Error('user not found');
			}

			for (const docSnapshot of querySnapshot.docs) {
				const userDocRef = doc(db, 'users', docSnapshot.id);
				// Prepare the data to update, ensuring all fields are of supported types
				const updateData: any = {
					display_name: input.display_name || '',
					first_name: input.first_name || '',
					last_name: input.last_name || '',
					email: input.email || '',
					phone_number: input.phone_number || '',
					address: input.address || '',
					date_of_birth: input.date_of_birth || '',
					uid: input.uid || '',
					photo_url: isImage ? photoUrl : input.photo_url,  // Update photo_url if photoUrl is provided
				};
				// Update the user document in Firestore
				await updateDoc(userDocRef, updateData);
			}

			const updatedInfo = {
				...input,
				photo_url: photoUrl || input.photo_url,  // Update local storage as well
			};

			// Save updated info to AsyncStorage
			await AsyncStorage.setItem('eezy-user-info', JSON.stringify(updatedInfo));
			dispatch(reset());
			// Success notification
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			toastRef.current?.success('User info updated successfully');
			setIsImage(false);  // Reset isImage after success
		} catch (error: any) {
			toastRef.current?.error(error.message);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		} finally {
			setIsLoading(false);
			setIsImage(false);  // Ensure reset of isImage
		}
	};


	const handleChange = (name: any, value: any) => {
		setInput({ ...input, [name]: value });
	};




	return (
		<View style={styles.container} 	>
			{isLoading && <ProgressBar progress={0.3} color={colors.accent_green} indeterminate={isLoading} />}
			<Toast ref={toastRef} />
			<KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
				<View style={styles.InformationIconContainer_main}>
					<View style={styles.InformationIconContainer}>
						<TouchableOpacity style={styles.badgeontainer} onPress={pickImage} >
							<Pencil />
						</TouchableOpacity>
						{selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
					</View>
				</View>

				{/* Personal Information Section */}
				<View style={styles.PersonalInformationView}>
					<View style={styles.modalTextInput}>

						<View style={styles.modalTextInputCOl}>
							<FormInput
								label="Display Name"
								value={input?.display_name}
								onChangeText={(text: any) => handleChange('display_name', text)}
							/>
						</View>
						<View style={styles.modalTextInputCOl}>
							<FormInput
								label="First Name"
								value={input?.first_name}
								onChangeText={(text: any) => handleChange('first_name', text)}
							/>
						</View>
						<View style={styles.modalTextInputCOl}>
							<FormInput
								label="Last Name"
								value={input?.last_name}
								onChangeText={(text: any) => handleChange('last_name', text)}
							/>
						</View>
						<View style={styles.modalTextInputCOl}>
							<FormInput
								label="Email"
								value={input?.email}
								onChangeText={(text: any) => handleChange('email', text)}
							/>
						</View>
						<View style={styles.modalTextInputCOl}>
							<FormInput
								label="Phone Number"
								value={input?.phone_number}
								onChangeText={(text: any) => handleChange('phone_number', text)}
							/>
						</View>
						<View style={styles.modalTextInputdate}>
							<DateInput
								label="Date of Birth"
								value={input.date_of_birth}
								onChangeText={(text: any) => handleChange('date_of_birth', text)} error={''} />
						</View>
						<View style={[styles.modalTextInputCOl, styles.modalTextBirth]}>
							<FormInput
								label="HMO"
								value={input?.hmo}
								onChangeText={(text: any) => handleChange('hmo', text)}
							/>
						</View>
						<View style={styles.modalTextInputCOl}>
							<FormInput
								label="Address"
								value={input?.address}
								onChangeText={(text: any) => handleChange('address', text)}
							/>
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView >
			<View style={styles.container_back_next}>
				<TouchableOpacity style={styles.buttonContainer} onPress={handleUpdate}  >
					<Text style={styles.buttonText}>
						{isLoading ?
							<ActivityIndicator
								color='white'
								size={20} /> :
							"Edit"}
					</Text>
				</TouchableOpacity>
			</View>
		</View >
	);
}

export default EditAccount;


const styles = StyleSheet.create({
	container_back_next: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 20,
		paddingTop: 30,
		paddingBottom: 50,
		position: "absolute",
		bottom: 0,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "rgba(31, 31, 31, 0.08)",
		height: 50,
		zIndex: 100
	},
	buttonText: {
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: 0.005,
		color: '#FFFFFF',
	},
	buttonContainer: {
		width: "100%",
		height: 40,
		padding: 10,
		backgroundColor: colors.accent_green,
		borderRadius: 90,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: colors.accent_green_light,
		shadowOffset: {
			width: 4,
			height: 8,
		}

	},
	badgeontainer: {
		position: 'absolute',
		top: 50,
		right: -10,
		width: 25,
		height: 25,
		borderRadius: 10,
		backgroundColor: colors.accent_green,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollViewContainer: {
		flexGrow: 1,
		marginHorizontal: 10,
		paddingBottom: 100,
	},

	login_account_text: {
		textAlign: 'center',
		color: colors.white,
		fontSize: 16,
		fontFamily: "Inter-Regular",
	},
	modalTextBirth: {
		marginTop: 10,
	},
	login_account: {
		marginTop: 20,
	},

	image: {
		width: 72,
		height: 72,
		borderRadius: 100,
	},
	profile_text_img_btn_text: {
		color: colors.white,
		fontSize: 15,
		fontFamily: "Inter-Regular",
	},

	profile_text_img_btn: {
		backgroundColor: colors.accent_green,
		borderRadius: 5,
		padding: 8,
		marginHorizontal: 20,
		marginTop: 30,
		width: "80%",
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},


	InformationIconContainer_main: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		gap: 20,
		marginTop: 20,
	},



	PersonalInformationContainerMain: {
		paddingHorizontal: 20,
	},


	titleStyle: {
		position: 'relative',
		top: -20
	},

	messageStyle: {
		fontSize: 20,
		fontWeight: '800',
		width: 180,
		textAlign: 'center',
		color: "#04224E",
		position: 'relative',
		bottom: 20
	},

	cancelButton: {
		backgroundColor: colors.accent_green,
		position: 'relative',
		width: 181,
		height: 39,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		bottom: 20,
	},

	container: {
		position: "relative",
		flex: 1,
		backgroundColor: colors.white,
	},
	button: {
		margin: 10,
		paddingHorizontal: 10,
		paddingVertical: 7,
		borderRadius: 5,
		backgroundColor: "#AEDEF4",
	},

	PersonalInformationView: {
		marginTop: 10,
	},

	infoInputColor: {
		color: '#9CA5C5',
		fontSize: 13,
		fontFamily: 'Poppins-Regular',

	},


	modalTextInputMargin: {
		paddingRight: '10%',

	},

	modalTextInputCOl: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 5,
		alignItems: 'flex-end',
		marginBottom: 10,
	},
	modalTextInputdate: {
		paddingTop: 5,
	},

	modalTextInput: {
		flexDirection: 'column',
		justifyContent: 'space-between',

	},

	ButtonToggleInfo: {
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: '#F6F6F6',
		padding: 2,
		borderRadius: 6,
		borderColor: '#aaa',
		marginBottom: 10,
		borderWidth: 0.5,
		marginTop: 20,
	},

	userIcon1: {
		color: colors.accent_green
	},
	userIcon: {
		color: '#32BEA6'
	},

	InformationIconContainer: {

		width: 80,
		height: 80,
		backgroundColor: colors.accent_green_light,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		borderWidth: 1,
		borderColor: colors.accent_green,
	},

	PersonalInformationContainer: {
		flex: 1,
		backgroundColor: colors.white
	}

})

