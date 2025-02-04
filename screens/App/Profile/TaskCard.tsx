import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import moment from 'moment';
import React from 'react';
import { getRandomColor } from '../../../helper';
import { theme } from '../../../css/global';
import { PaymentIcon } from '@/assets/svg/PaymentIcon';


const Card = ({ value, i }: any) => {
	const randomColor = getRandomColor();
	//console.log("item-|-item", JSON.stringify(value, null, 2))

	return (

		<TouchableOpacity
			style={styles.price_image_container_main_item}
			key={i} >
			<View style={styles.price_image_container_main}>
				{/* Avatar Container */}
				{/*<View style={[styles.price_image_container3, { backgroundColor: randomColor }]}>
					<Text style={styles.price_image_inside}>{value?.initials}</Text>
				</View>*/}
				<PaymentIcon />
				<View style={styles.price_container_Main}>
					<View style={styles.price_container}>
						<Text style={styles.price_container_text}>Dr. ??</Text>
						<Text style={styles.sold_box_text}>	₦{value?.data?.amount}</Text>
					</View>
					<View style={styles.sold_container}>
						<Text style={styles.price_time_text}>{moment(value?.createAt).format('LLL')}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>

	);
};

export { Card };


const styles = StyleSheet.create({
	price_container_Main: {
		flexDirection: 'column',
		//gap: 5,
		width: '83%',
	},
	price_container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		//alignItems: "center"
	},
	price_container_text: {
		fontFamily: "Inter-Regular",
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 22,
		display: 'flex',
		alignItems: 'center',
		color: '#000000',
		alignSelf: 'stretch',
	},
	sold_container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	emptyStateContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,

	},
	emptyStateText: {
		marginTop: 10,
		fontSize: 18,
		color: '#aaa',
	},


	chat_container_main: {
		gap: 20,
	},

	price_image_circle1: {
		width: 14,
		height: 14,
		left: 35,
		top: 35,
		backgroundColor: '#5E5E5E',
		borderColor: theme.colors.white,
		borderWidth: 2,
		borderRadius: 7,
		position: 'absolute',
	},



	price_image_inside: {
		fontStyle: 'normal',
		fontWeight: '700',
		fontSize: 18,
		lineHeight: 22,
		display: 'flex',
		alignItems: 'center',
		color: theme.colors.white,
	},

	sold_box_text_sup: {
		borderRadius: 3,
		paddingHorizontal: 5,
		paddingVertical: 1,
	},

	sold_box_text: {
		fontFamily: "Inter-Regular",
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 22,
		letterSpacing: 0.5,
		color: "#171717",
		textAlign: 'center',
	},

	sold_container_text: {
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 17,
		letterSpacing: 0.2,
		color: '#616161',
	},

	price_time_text: {
		fontFamily: "Inter-Regular",
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 20,
		letterSpacing: 0.5,
		color: "#646464",
		textAlign: 'center',
	},

	price_image_container_main_item: {
		//gap: 12,
		height: 62,
		justifyContent: "space-between",
		backgroundColor: '#EEEEEE',
		shadowColor: 'rgba(4, 6, 15, 0.05)',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 60,
		borderRadius: 8,
		elevation: 4,
		marginBottom: 20,
	},

	price_image_container_main: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		width: '100%',
	},


	price_image_container5: {
		width: 48,
		height: 48,
		borderRadius: 50,
		backgroundColor: '#14539A',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},

	price_image_container3: {
		width: 48,
		height: 48,
		borderRadius: 50,
		backgroundColor: '#02393E',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},


	price_image_container: {
		width: 48,
		height: 48,
		borderRadius: 50,
		backgroundColor: '#6F4439',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},


})


