import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../../../components/Input/FormInput';
import { Key } from '../../../assets/svg/Key';
import { auth } from '../../../shared/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Haptics from 'expo-haptics';
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from '../../../components/Toast';
import { Back } from '../../../assets/svg/Back';

const ForgetPassword = () => {
	const toastRef: any = useRef(null);
	const navigation: any = useNavigation();
	const [email, setEmail] = React.useState('');
	const [isLoading, setisLoading] = useState(false);




	const resetPassword = () => {
		setisLoading(true);
		sendPasswordResetEmail(auth, email)
			.then(() => {
				// alert("Password reset email sent");
				toastRef.current.success('Password reset email sent successfully');
				setisLoading(false);
				// alert("Password reset email sent");
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
				setTimeout(() => {
					navigation.navigate('SuccessOkay');
				}, 1000);
			})
			.catch((error) => {
				setisLoading(false);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
				// alert(error.message);
				toastRef.current.error(error.message);
				throw error; // Propagate the error to handle it elsewhere if needed
			});
	};


	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
			<Toast ref={toastRef} />
			<SafeAreaView  >
				<View style={styles.container_main}>
					<View style={styles.top_container}>

						<View style={styles.top_icon_container}>
							<Key />
						</View>
						<Text style={styles.top_icon_container_verify}>Forgot Password?</Text>
						<Text style={styles.top_icon_verification}>
							Enter  the  email  address  associated  with  your
							account  and  we’ll  send  an  email  with   instructions  to reset  your  password.
						</Text>
					</View>

					<View style={styles.email_input_container}>
						<FormInput label="Email Address"
							labelValue={email}
							onChangeText={(userEmail: React.SetStateAction<string>) => setEmail(userEmail)}
							keyboardType="email-address" />
						<TouchableOpacity
							style={styles.login_account}
							onPress={resetPassword}
							disabled={isLoading}>
							<Text style={styles.login_account_text}>
								{isLoading ?
									<ActivityIndicator
										color='white'
										size={20} /> :
									"Send Instructions"}
							</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.login_forgot_text_container}>
						<TouchableOpacity style={styles.back_container} >
							<Back />
							<Text style={styles.login_account_text2} onPress={() => navigation.navigate("Login")}>Back to login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	)
}

export default ForgetPassword

const styles = StyleSheet.create({

	email_input_container: {
		width: "100%",
		marginTop: 20,
	},

	login_account: {
		marginTop: 20,
		width: "100%",
		height: 40,
		backgroundColor: colors.accent_green,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 22,
	},

	back_container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 2,
		marginTop: 20,
	},

	top_icon_container_verify: {
		fontSize: 18,
		color: colors.black
	},

	login_account_text: {
		color: colors.white,
		fontSize: 16,
	},

	login_account_text2: {

	},



	login_forgot_text_container: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		gap: 5,
	},

	top_icon_verification: {
		fontSize: 16,
		color: colors.smail_text_color,
		fontFamily: "Inter-Regular",
		textAlign: "center",
		paddingHorizontal: 20,
		lineHeight: 40,
	},

	top_container: {
		flexDirection: "column",
		alignItems: "center",
		gap: 40,
	},

	container_main: {
		marginHorizontal: 30,
	},

	container: {
		flexGrow: 1,
		backgroundColor: colors.white,

	},

	top_icon_container: {
		// backgroundColor: colors.icon_background,

		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
		height: 50,
		width: 50,
	}
})