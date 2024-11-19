import * as Haptics from 'expo-haptics';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../css/colorsIndex'
import { SuccessIcon } from '../../assets/svg/SuccessIcon'
import { useNavigation } from '@react-navigation/native'

const SuccessQuestionaire = () => {
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
					<Text>Successful</Text>
					<Text style={styles.container_main_text}>Survey successfully added!</Text>
					<TouchableOpacity style={styles.okay_btn} onPress={handleBack}>
						<Text style={styles.login_account_text2} >Okay</Text>
					</TouchableOpacity>
				</View>
			</View >
		</SafeAreaView>
	)
}

export default SuccessQuestionaire

const styles = StyleSheet.create({
	login_account_text2: {
		color: colors.white,
		fontSize: 16,
		fontFamily: "Inter-Regular",

	},

	okay_btn: {
		width: 103,
		height: 40,
		backgroundColor: colors.accent_green,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginTop: 80,
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
		color: colors.smail_text_color,
		fontFamily: "Inter-Regular",
		fontSize: 14,
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
