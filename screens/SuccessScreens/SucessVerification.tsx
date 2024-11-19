import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { colors } from '../../css/colorsIndex'
import { SuccessIcon } from '../../assets/svg/SuccessIcon'

const SucessVerification = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container_main}>
				<SuccessIcon />
				<Text style={styles.container_main_text}>Your email address has been verified!</Text>
			</View >
		</SafeAreaView>
	)
}

export default SucessVerification

const styles = StyleSheet.create({

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