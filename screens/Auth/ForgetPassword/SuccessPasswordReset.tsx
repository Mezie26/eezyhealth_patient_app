import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../shared/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Haptics from 'expo-haptics';
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from '../../../components/Toast';
import { SuccessIcon1 } from '@/assets/svg/SuccessIcon1';

const SuccessPasswordReset = () => {
	const toastRef: any = useRef(null);
	const navigation: any = useNavigation();
	const [isLoading, setisLoading] = useState(false);




	const resetPassword = () => {
		
	};


	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
			<Toast ref={toastRef} />
			<SafeAreaView  >
				<View style={styles.container_main}>
					<View style={styles.top_container}>

						<View style={styles.top_icon_container}>
							<SuccessIcon1 />
						</View>
						<Text style={styles.top_icon_container_verify}>Password reset</Text>
						<Text style={styles.top_icon_verification}>
                            Your password has been successfully reset. Click below to log in.
						</Text>
					</View>

					<View style={styles.email_input_container}>
						<TouchableOpacity
							style={styles.login_account}
                            onPress={()=> navigation.navigate('Login')}
							disabled={isLoading}>
							<Text style={styles.login_account_text}>
								{isLoading ?
									<ActivityIndicator
										color='white'
										size={20} /> :
									"Continue"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	)
}

export default SuccessPasswordReset;

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({

	email_input_container: {
		width: "100%",
		marginTop: 20,
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
		height: 50,
		width: 50,
	}
})