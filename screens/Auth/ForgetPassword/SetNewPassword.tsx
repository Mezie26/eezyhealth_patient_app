import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from '../../../components/Toast';
import { Back1 } from '@/assets/svg/Back1';
import { PadlockIcon } from '@/assets/svg/PadlockIcon';
import { Ionicons } from '@expo/vector-icons';
import { CheckIcon } from '@/assets/svg/CheckIcon';


const SetNewPassword = () => {
	const toastRef: any = useRef(null);
	const navigation: any = useNavigation();
	const [isLoading, setisLoading] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);




	const resetPassword = () => {
	};


	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
			<Toast ref={toastRef} />
			<SafeAreaView  >
				<View style={styles.container_main}>
					<View style={styles.top_container}>

						<View style={styles.top_icon_container}>
							<PadlockIcon />
						</View>
						<Text style={styles.top_icon_container_verify}>Set new password</Text>
						<Text style={styles.top_icon_verification}>
                            Your new password must be different to previously used passwords.
						</Text>
					</View>

					<View style={styles.email_input_container}>
						<Text style={styles.input_box_header}>Password</Text>
						<View style={styles.inputContainer}>
        					<TextInput
          						style={styles.input}
          						secureTextEntry={!showNewPassword}
          						value={newPassword}
          						onChangeText={setNewPassword}
          						placeholder="Create a password"
          						placeholderTextColor="#D1D1D1"
        					/>
        					<TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          						<Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} color="gray" />
        					</TouchableOpacity>
      					</View>
						<Text style={styles.input_box_header}>Confirm password</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								secureTextEntry={!showConfirmNewPassword}
								value={confirmNewPassword}
								onChangeText={setConfirmNewPassword}
								placeholder="Confirm password"
								placeholderTextColor="#D1D1D1"
							/>
							<TouchableOpacity onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
								<Ionicons name={showConfirmNewPassword ? "eye-off" : "eye"} size={24} color="gray" />
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: "row", marginHorizontal: 23, marginBottom: 10}}>
							<CheckIcon />
							<Text style={styles.bottomText}>Must be at least 8 characters</Text>
						</View>
						<View style={{flexDirection: "row", marginHorizontal: 23}}>
							<CheckIcon />
							<Text style={styles.bottomText}>Must contain one special character</Text>
						</View>
						<TouchableOpacity
							style={styles.login_account}
							onPress={() =>navigation.navigate('SuccessPasswordReset')}
							disabled={isLoading}>
							<Text style={styles.login_account_text}>
								{isLoading ?
									<ActivityIndicator
										color='white'
										size={20} /> :
									"Reset Password"}
							</Text>
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

export default SetNewPassword;

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({

	email_input_container: {
		width: "100%",
		marginTop: 20,
	},

	bottomText: {
		fontSize: 14,
		fontFamily: "Inter-Regular",
		fontWeight: "400",
		lineHeight: 22,
		letterSpacing: -0.5,
		color: "#646464",
		marginHorizontal: 5
	},

	inputContainer: {
		width: width * 0.9,
		marginHorizontal: width * 0.05,
		height: 44,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		borderRadius: 12,
		paddingHorizontal: 10,
		marginVertical: 10,
		marginBottom: 20,
		backgroundColor: "#fff", // Ensure a background color
	},
	input: {
		width: 320,
		height: 40,
		fontSize: 14,
		fontWeight: "400",
		fontFamily: "Inter-Regular",
	},

	input_box_header: {
		fontSize: 14,
		fontFamily: "Inter-Medium",
		fontWeight: "500",
		color: "#171717",
		lineHeight: 20,
		letterSpacing: -0.5,
		marginHorizontal: 23
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
		letterSpacing: -0.5,
		marginHorizontal: 20
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