import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../css/colorsIndex'


const BottomButton = ({ isLoading, onPress, text, style }: any) => {
	return (
		<View style={[style || styles.container_back_next]}>
			<TouchableOpacity style={styles.buttonContainer} onPress={onPress}  >
				<Text style={styles.buttonText}>
					{isLoading ?
						<ActivityIndicator color='white' size={20} /> : text}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default BottomButton

const styles = StyleSheet.create({
	container_back_next: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 20,
		paddingTop: 30,
		paddingBottom: Platform.OS === 'ios' ? 50 : 30,
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
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: colors.accent_green_light,
		shadowOffset: {
			width: 4,
			height: 8,
		}

	},

})