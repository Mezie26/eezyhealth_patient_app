import * as Haptics from 'expo-haptics';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../css/colorsIndex'
import { SuccessIcon } from '../../assets/svg/SuccessIcon'
import { useNavigation } from '@react-navigation/native'

const SuccessReschedule = () => {
	const navigation: any = useNavigation();
	const handleBack = () => {
		navigation.navigate('Home', { load: true });
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container_main}>
				<SuccessIcon />
				<View style={styles.container_main_text_container}>
					<Text style={styles.container_main_text}>Appointment Rescheduled Successfully!</Text>
					<Text style={styles.body_text}>The appointment has been rescheduled and notifications will be sent.</Text>
					<View style={styles.date_container}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<Text style={styles.date_title_text}>New Date</Text>
							<Text style={styles.date_text}>????</Text>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<Text style={styles.date_title_text}>New Time</Text>
							<Text style={styles.date_text}>????</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.okay_btn} onPress={handleBack}>
						<Text style={styles.login_account_text2} >Done</Text>
					</TouchableOpacity>
				</View>
			</View >
		</SafeAreaView>
	)
}

export default SuccessReschedule

const styles = StyleSheet.create({
	login_account_text2: {
		color: colors.white,
		fontSize: 14,
		fontFamily: "Inter-Medium",
		fontWeight: "500"
	},

	okay_btn: {
		width: 380,
		height: 48,
		backgroundColor: colors.accent_green,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		marginTop: 40,
	},

	container_main_text_container: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
	},

	container_main_text: {
		color: "#171717",
		fontFamily: "Inter-Medium",
		fontSize: 14,
		fontWeight: "500"
	},

	body_text: {
		fontSize: 12,
		color: "#363636",
		fontFamily: "Inter-Regular",
		fontWeight: "400",
		width: 300,
		textAlign: "center"
	},

	date_container: {
		width: 380,
		height: 84,
		backgroundColor: "#FCFCFC",
		borderWidth: 0.5,
		borderRadius: 12,
		borderColor: "#D5D5D5",
		padding: 16,
		gap: 15
	},

	date_title_text: {
		color: "#646464",
		fontSize: 12,
		fontWeight: '400',
		fontFamily: "Inter-Regular"
	},

	date_text: {
		color: "#171717",
		fontSize: 14,
		fontWeight: '400',
		fontFamily: "Inter-Regular"
	},

	container_main: {
		marginHorizontal: 30,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: "center",
		margin: "auto",
		width: "100%",
		height: "100%",
	},

	container: {
		flexGrow: 1,
		backgroundColor: colors.white,
	},
})
