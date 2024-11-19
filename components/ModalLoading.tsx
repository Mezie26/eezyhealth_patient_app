import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../css/colorsIndex'

const ModalLoading = ({ isLoading }: any) => {
	return (
		<Modal
			transparent={true}
			animationType="none"
			visible={isLoading}
			onRequestClose={() => { }}
		>
			<View style={styles.modalBackground}>
				<View style={styles.activityIndicatorWrapper}>
					<ActivityIndicator size="large" color={colors.accent_green} />
				</View>
			</View>
		</Modal>
	)
}

export default ModalLoading

const styles = StyleSheet.create({

	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#rgba(0, 0, 0, 0.5)',
	},
	activityIndicatorWrapper: {
		backgroundColor: '#FFFFFF',
		height: 100,
		width: 100,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
})