import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../shared/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Haptics from 'expo-haptics';
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from '../../../components/Toast';
import { Back1 } from '@/assets/svg/Back1';
import { EmailIcon } from '@/assets/svg/EmailIcon';

const ResetPasswordEmail = () => {
	const toastRef: any = useRef(null);
	const navigation: any = useNavigation();
	const [email, setEmail] = React.useState('');
	const [isLoading, setisLoading] = useState(false);




	const resetPassword = () => {
		setisLoading(true);
		sendPasswordResetEmail(auth, email)
			.then(() => {
				// alert("Password reset email sent");
				{/*toastRef.current.success('Password reset email sent successfully');*/}
				setisLoading(false);
				alert("Password reset email sent");
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
				setTimeout(() => {
					navigation.navigate('SuccessOkay');
				}, 1000);
			})
			.catch((error) => {
				setisLoading(false);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
				alert(error.message);
				{/*toastRef.current.error(error.message);
				throw error; // Propagate the error to handle it elsewhere if needed*/}
			});
	};


	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
			<Toast ref={toastRef} />
			<SafeAreaView  >
				<View style={styles.container_main}>
					<View style={styles.top_container}>

						<View style={styles.top_icon_container}>
							<EmailIcon />
						</View>
						<Text style={styles.top_icon_container_verify}>Check your email</Text>
						<Text style={styles.top_icon_verification}>
							We sent a password reset link to email
						</Text>
					</View>

					<View style={styles.email_input_container}>
						<TouchableOpacity
							style={styles.login_account}
							disabled={isLoading}>
							<Text style={styles.login_account_text}>
								{isLoading ?
									<ActivityIndicator
										color='white'
										size={20} /> :
									"Open email app"}
							</Text>
						</TouchableOpacity>
					</View>

					<View style={{flexDirection: "row", marginTop: 40, justifyContent: "center", alignItems: "center"}}>
						<Text style={styles.resend_text}>Didn’t receive the email? </Text>
						<TouchableOpacity>
							<Text style={styles.resend_text1}>Click to resend</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.login_forgot_text_container}>
						<TouchableOpacity style={styles.back_container} >
							<Back1 />
							<Text style={styles.login_account_text2} onPress={() => navigation.navigate("Login")}>Back to log in</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	)
}

export default ResetPasswordEmail;

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({

	email_input_container: {
		width: "100%",
		marginTop: 20,
	},

	resend_text: {
		fontSize: 14,
		fontWeight: "400",
		fontFamily: "Inter-Regular",
		color: "#363636",
		lineHeight: 22,
		letterSpacing: -0.5
	},
	resend_text1: {
		fontSize: 14,
		fontWeight: "500",
		fontFamily: "Inter-Medium",
		color: "#44CE2D",
		lineHeight: 22,
		letterSpacing: -0.5
	},

	login_account: {
		marginTop: 20,
		width: width * 0.9,
		marginHorizontal: width * 0.05,
		height: 40,
		backgroundColor: "#44CE2D",
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
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
		fontSize: 16,
		color: "#171717",
		fontFamily: "Inter-Medium",
		fontWeight: "500",
		lineHeight: 24,
		letterSpacing: -0.5,
		marginTop: 40
	},

	login_account_text: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "500",
		fontFamily: "Inter-Medium",

	},

	login_account_text2: {
		color: "#44CE2D",
		fontSize: 14,
		fontFamily: "Inter-Medium",
		fontWeight: "500",
		lineHeight: 20,
		letterSpacing: -0.5
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
		color: "#363636",
		fontFamily: "Inter-Regular",
		fontWeight: "400",
		textAlign: "center",
		marginVertical: 10,
		lineHeight: 24,
		letterSpacing: -0.5
	},

	top_container: {
		flexDirection: "column",
		alignItems: "center",
		//gap: 40,
	},

	container_main: {
		//marginHorizontal: 30,
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