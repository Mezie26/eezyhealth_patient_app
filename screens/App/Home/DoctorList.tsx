import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../css/colorsIndex';
import Rating from '../../../components/Rating';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Height } from '../Profile/Account';


const DoctorList = ({ doctorsByRole, doctors, handlePress }: any) => {
	const [mappedDoctors, setMappedDoctors] = useState([]);

	useEffect(() => {
		// Map doctorsByRole with matching doctor from doctors by doctorId
		const mergedDoctors = doctorsByRole.map((roleDoctor: { uid: any; }) => {
			const matchingDoctor = doctors.find(
				(doctor: { doctorId: any; }) => doctor.doctorId === roleDoctor.uid
			);
			return {
				...roleDoctor, // Spread doctorsByRole data
				...matchingDoctor, // Merge matching doctor's details from doctors
			};
		});
		setMappedDoctors(mergedDoctors);
	}, [doctorsByRole, doctors]);


 
	console.log('item---item', JSON.stringify(mappedDoctors, null, 2));


	// Render each doctor item
	const renderItems = ({ item }: any) => (
		<View style={styles.no_appointments_container_three_sub} key={item.uid}>
			<View style={styles.no_appointments_star}>
				<View style={{flexDirection: 'row'}}>
				{!item?.photo_url ? (
				<FontAwesome6 name="user-doctor" size={45} style={{marginLeft: 10}}  color={colors.smail_text_color} />
						// <Icon name="medical-services" size={30} color={colors.smail_text_color} />
					) : (
						<Image
							source={{ uri: "https://firebasestorage.googleapis.com/v0/b/eezyhealth-2023.appspot.com/o/profileImages%2FZ?alt=media&token=21ee0260-d2c5-42b3-af69-258593b96612"}}
							style={styles.top_container_img_doctor}
							resizeMode="contain"
						/>
					)}
				<View style={styles.access_card_img_text_dr}>
					<Text style={styles.access_card_img_text_one}>Dr {item?.first_name} {item?.last_name}</Text>
					<Text style={styles.access_card_img_text_two}>{item?.specialization}</Text>
					{/*<View style={styles.access_card_img_text_three_container}>
						<Icon name="location-on" size={16} color={colors.accent_green} />
						<Text style={styles.access_card_img_text_three}>{item?.location}</Text>
					</View>*/}
					<Rating rating={item?.rating || 0} />
				</View>
				</View>
				<TouchableOpacity
					style={styles.top_container_img_doctor_container}
					onPress={() => handlePress(item)}
				>
					<Text style={styles.top_container_img_doctor_container_text}>
						View Profile
					</Text>
				</TouchableOpacity>
				
			</View>
			{/*<View style={styles.no_appointments_star_flex}>
					{/* Rating */}
					{/*<Rating rating={item?.rating || 0} />
			</View>*/}
			{/*<View style={styles.no_appointments_star_flex_two}>
				<View style={styles.no_appointments_star_doctor}>
					<View style={styles.container_active_doctor}>
						<View style={styles.container_active_doctor_color_one}>
							<View style={styles.container_active_doctor_color_two}></View>
						</View>
						<View>
							<Text style={styles.container_active_doctor_text}>Active</Text>
						</View>
					</View>
				</View>
			</View>*/}
		</View>
	);

	return (
		<FlatList
			data={doctors}
			scrollEnabled={false}
			renderItem={renderItems}
			keyExtractor={(item, index) => index.toString()}
			contentContainerStyle={{ paddingBottom: 100 }}
		/>
	);
};

export default DoctorList;



const styles = StyleSheet.create({
	access_card_img_text_three_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 1,
		marginLeft: -3,
	},
	access_card_img_text_one: {
		color: colors.black,
		fontSize: 14,
		fontFamily: 'Inter-Regular',
		fontWeight: '500',
		marginBottom: 7,
		textAlign: 'left'
	},
	access_card_img_text_two: {
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Inter-Regular',
		fontWeight: '500',
		marginBottom: 7,
	},
	access_card_img_text_three: {
		color: colors.black,
		fontSize: 13,
		fontFamily: 'Inter-Regular',
	},

	access_card_img_text_dr: {
		marginTop: 0,
		marginLeft: 20,
		marginRight: 25,
		height: 66,
		width: 164
		//textAlign: 'left',
		//justifyContent: 'space-evenly'
	},
	access_card_img_text: {
		marginTop: 20,
	},

	access_card_img_pics: {
		width: 100,
		height: "auto",
	},

	container_active_doctor_text: {
		fontSize: 12,
	},

	container_active_doctor_color_two: {
		width: 7,
		height: 7,
		borderRadius: 50,
		backgroundColor: colors.accent_green,
	},
	container_active_doctor_color_one: {
		width: 13,
		height: 13,
		borderRadius: 50,
		borderWidth: 1.1,
		borderColor: colors.accent_green,
		padding: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	container_active_doctor: {
		top: 10,
		position: 'absolute',
		flexDirection: 'row',
		right: 100,
		alignItems: 'center',
		gap: 5,
	},

	top_container_img_doctor_container_text: {
		color: colors.accent_green,
		fontSize: 13,
		marginTop: 15,
		//marginLeft: 40,
		//textAlign: 'right',
		//alignContent: 'flex-end',
		//alignItems: 'flex-end',
		//alignSelf: 'flex-start',
	},

	top_container_img_doctor_container: {
		//flexDirection: 'row',
		alignItems: 'flex-end',
		//justifyContent: 'flex-end',
		//backgroundColor: colors.white,
		//borderWidth: 1,
		//borderColor: colors.border_color,
		//borderRadius: 10,
		paddingHorizontal: 10
	},
	top_container_img_doctor: {
		width: 48,
		height: 48,
		borderRadius: 12,
		//marginRight: 20,
		marginLeft: 10
	},
	no_appointments_star_doctor: {
		width: 80,
		height: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},

	no_appointments_star_flex_two: {
		//flexDirection: 'column',
		//alignItems: 'center',
		//justifyContent: 'center',
		//gap: 10

	},

	no_appointments_star_flex: {
		//flexDirection: "row",
		//alignItems: 'center',
		//width: 100,
		//marginTop: 5
	},

	no_appointments_star: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 7

	},

	no_appointments_container_three_sub: {
		width: '100%',
		height: 106,
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 10,
		//backgroundColor: colors.white,
		//flexDirection: 'row',
		//justifyContent: "space-between",
		marginBottom: 20,
		borderWidth: 0.5,
		borderColor: colors.doctorContainerColor,
	},

	no_appointments_container_three: {
		marginTop: 40,
	},

	no_appointments_container_three_text: {
		color: colors.black,
		fontSize: 16,
		marginBottom: 10,
	},

	no_appointments_container_two_text_one: {
		fontSize: 14,
		color: colors.accent_green,
		marginTop: 10,
		fontFamily: "Inter-Regular",
	},

	no_appointments_container_two_text: {
		fontSize: 20,
		color: colors.white,
		fontFamily: "Inter-Regular",
	},

	no_appointments_container_two: {

		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '52%',
	},
	no_appointments_container_one: {
		width: "45%",
		height: 150,
	},

	no_appointments_container: {
		width: '100%',
		height: 150,
		backgroundColor: colors.black,
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 30,
	},


})