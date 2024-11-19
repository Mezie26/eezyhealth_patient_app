import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Mail } from '../../assets/svg/Mail';
import { colors } from '../../css/colorsIndex';
import { button } from '../../css/button';
import { useNavigation } from '@react-navigation/native';

const Verification = () => {
	const navigation: any = useNavigation();


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container_main}>
				<View style={styles.top_container}>

					<View style={styles.top_icon_container}>
						<Mail />
					</View>
					<Text style={styles.top_icon_container_verify}>Verification Mail</Text>
					<Text style={styles.top_icon_verification}>
						Hi Ayra we have sent you a verification mail. To
						confirm your email address, tap the button
						in the mail we sent to you.
					</Text>
				</View>
				<TouchableOpacity style={[button.login_account, styles.login_account]} onPress={() => navigation.navigate('SucessVerification')}>
					<Text style={button.login_account_text}>Open Email</Text>
				</TouchableOpacity>

				<View style={styles.login_forgot_text_container}>
					<View style={styles.login_account_signup}>
						<Text style={styles.login_account_text1}>Already have an account?
						</Text>
						<TouchableOpacity >
							<Text style={styles.login_account_text2} onPress={() => navigation.navigate('Login')}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Verification

const styles = StyleSheet.create({

	top_icon_container_verify: {
		fontSize: 18,
		color: colors.black
	},

	login_account: {
		marginTop: 80,
	},

	login_account_text2: {
		color: "#43CE2E",
		fontFamily: "Inter-Regular",
		fontSize: 16,
	},
	login_account_text1: {
		color: "#A7A9AC",
		fontFamily: "Inter-Regular",
		fontSize: 14,
	},
	login_account_signup: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		gap: 5,
	},


	login_forgot_text_container: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		gap: 5,
	},

	top_icon_verification: {
		fontSize: 14,
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
		backgroundColor: colors.icon_background,
		borderRadius: 100,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
		height: 100,
		width: 100,
	}
})