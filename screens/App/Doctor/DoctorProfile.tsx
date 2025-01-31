import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../css/colorsIndex'
import * as Haptics from 'expo-haptics';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getPricing } from '../../../hooks/getPricing';
import Rating from '../../../components/Rating';
import BottomButton from '../../../components/BottomButton';
import { DocterPhone } from '../../../assets/svg/DocterPhone';
import { DocterVideo } from '../../../assets/svg/DocterVideo';
import { DoctorMessage } from '../../../assets/svg/DoctorMessage';
import { DoctorProfilePic } from '../../../assets/svg/DoctorProfile';
import { CommunityIcon1 } from '@/assets/svg/CommunityIcon1'
import { CommunityIcon2 } from '@/assets/svg/CommunityIcon2';
import { StarIcon } from '@/assets/svg/StarIcon';


const DoctorProfile = () => {
	const navigation: any = useNavigation();
	const route = useRoute();
	// @ts-ignore
	const { item, user } = route.params;
	const [isLoading, setIsLoading] = useState(false);
	const [pricing, setPricing] = useState<any>({});
	const [profile, setProfile] = useState([]);
	const [doctorDetails, setDoctorDetails] = useState([]);
	const [details, setDetails] = useState<any>({});

	useEffect(() => {
		try {
			// Check if item is a valid stringified JSON, parse it only if needed
			const parsedItem = typeof item === 'string' ? JSON.parse(item) : item;
			setDetails(parsedItem);
		} catch (error) {
		}
	}, [item]);
	console.log('item----item', JSON.stringify(details, null, 2));




	useEffect(() => {
		setIsLoading(true)
		getPricing()
			.then(data => {
				setPricing(data);
				setIsLoading(false)
			})
			.catch(error => {
				// toastRef.current.error(error.message);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
				setIsLoading(false);
			});

	}, []);




	useEffect(() => {
		setIsLoading(true);
		// Set isLoading to false after 2 seconds
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);


	const handlePresss = () => {
		if (!pricing || Object.keys(pricing).length === 0) {
			// Show a feedback (Haptics or Alert) if pricing is not available
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
			return;
		}

		navigation.navigate('BookingAppointment', { item: item, user: user, pricing: pricing });
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};

	const handleIcon = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};

	return (
		<View style={styles.container} 	>
			<ScrollView
				contentContainerStyle={styles.scrollViewContent} contentInsetAdjustmentBehavior="automatic">
				<View style={styles.list_icon_and_image_container}>
					<View style={styles.list_icon_and_image_container_img}>
						{!item?.photo_url ? <DoctorProfilePic /> :
							<Image
								source={{ uri: item?.photo_url }}
								style={styles.top_container_img_icon_pics}
								resizeMode="cover"
							/>}
					</View>
					<View style={styles.info_icons_text_one_container}>
						<Text style={styles.info_icons_text_one}>Dr. {details?.first_name} {details?.last_name}</Text>
						<Text style={styles.info_icons_text_two}>{details?.specialization}</Text>
						<Text style={styles.info_icons_text_location}>{details.location}location??</Text>
					</View>
					<View style={{flexDirection: 'row', marginVertical: 5}}>
						<View style={styles.doctor_details_card}>
							<CommunityIcon1 />
							<Text style={styles.doctor_details_card_text1}>1000+</Text>
							<Text style={styles.doctor_details_card_text2}>Patients</Text>
						</View>
						<View style={styles.doctor_details_card}>
							<CommunityIcon2 />
							<Text style={styles.doctor_details_card_text1}>?? Years</Text>
							<Text style={styles.doctor_details_card_text2}>Experience</Text>
						</View>
						<View style={styles.doctor_details_card}>
							<StarIcon />
							<Text style={styles.doctor_details_card_text1}>??</Text>
							<Text style={styles.doctor_details_card_text2}>Ratings</Text>
						</View>
					</View>
					{/*<View style={styles.info_icons_text_one_container}>
						<Text style={styles.info_icons_text_three}>{details?.experience_yrs} Years Experience</Text>
						<View style={styles.no_appointments_star_flex}>

							<Rating rating={details?.rating || 0} />
						</View>
					</View>

					<View style={styles.info_icons_container}>
						<TouchableOpacity style={styles.info_icons1} onPress={handleIcon}>
							<DoctorMessage />
						</TouchableOpacity>
						<TouchableOpacity style={styles.info_icons2} onPress={handleIcon} >
							<DocterVideo />
						</TouchableOpacity>
						<TouchableOpacity style={styles.info_icons3} onPress={handleIcon} >
							<DocterPhone />
						</TouchableOpacity>
					</View>*/}
				</View>

				<View style={styles.info_text_container_main}>
					<View style={styles.info_text_container}>
						<Text style={styles.info_text_information}>About Doctor</Text>
						<Text style={styles.info_text_information_text}>{details?.about}</Text>
					</View>

					<View style={styles.info_text_container}>
						<Text style={styles.info_text_information}>Specialization</Text>
						<View  style={{flexDirection: "row", gap: 10, marginTop: 10}}>
							<Text style={styles.doctor_specialty}>{details?.specialization}</Text>
							<Text style={styles.doctor_specialty}>Cardiologist??</Text>
							<Text style={styles.doctor_specialty}>Cardiologist??</Text>
						</View>
					</View>

					<View style={styles.consultation_info_container}>
						<Text style={styles.info_text_information}>Consultation Fee</Text>
						<Text style={styles.info_text_information}>₦{pricing[0]?.pricing}</Text>
					</View>
					<Text style={styles.info_text_information}>Reviews</Text>

					{/*<View style={styles.consultation_info_container}>
						<Text style={styles.info_text_information}>Price</Text>
						<Text style={styles.info_text_information_text}>₦{pricing[0]?.pricing}</Text>
					</View>*/}
				</View>
			</ScrollView>


			<BottomButton onPress={handlePresss} text={"Book Appointment"} />
		</View>
	)
}

export default DoctorProfile

const styles = StyleSheet.create({
	doctor_specialty: {
		width: 100,
		height: 28,
		borderRadius: 12,
		backgroundColor: "#F9FAFB",
		fontSize: 12,
		fontWeight: "400",
		fontFamily: "Inter-Regular",
		color: "#363636",
		padding: 5,
		textAlign: "center"
	},
	info_text_container_main: {
		flexDirection: 'column',
		gap: 30,
		marginTop: 20,
	},

	info_text_information: {
		color: "#171717",
		fontSize: 14,
		fontWeight: "500",
		fontFamily: "Inter-400Regular",
		//marginBottom: 10,
	},
	info_text_information_text: {
		color: "#363636",
		fontSize: 12,
		fontFamily: "Inter-Regular",
		fontWeight: "400",
		//marginBottom: 10,
	},


	info_text_container: {

	},

	consultation_info_container: {
		flexDirection: "row",
		justifyContent: "space-between"
	},

	info_icons_text_location: {
		fontSize: 10,
		fontWeight: '400',
		marginTop: 5,
		color: "#646464"
	},

	doctor_details_card: {
		width: 86,
		height: 78,
		borderWidth: 0.5,
		borderRadius: 12,
		borderColor: "#D5D5D5",
		marginHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
		//padding: 10
	},

	doctor_details_card_text1: {
		fontSize: 14,
		fontWeight: '500',
		fontFamily: 'Inter-Regular',
		color: "#363636",
		padding: 7
	},
	doctor_details_card_text2: {
		fontSize: 12,
		fontWeight: '300',
		fontFamily: 'Inter-Regular',
		color: "#646464"
	},

	info_icons_text_three: {
		color: colors.black,
		fontSize: 14,
	},

	info_icons_text_one_container: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},

	info_icons_text_two: {
		fontSize: 12,
		color: "#363636",
		fontFamily: "Inter_400Regular",
		fontWeight: '400'
	},

	info_icons_text_one: {
		fontSize: 14,
		color: "#171717",
		fontFamily: "Inter_400Regular",
		marginBottom: 5,
		fontWeight: "500"
	},

	info_icons1: {
		width: 35,
		height: 28,
		borderRadius: 5,
		backgroundColor: "#CEECCE",
		alignItems: 'center',
		justifyContent: 'center',
	},
	info_icons2: {
		width: 35,
		height: 28,
		borderRadius: 5,
		backgroundColor: "#D4DAF2",
		alignItems: 'center',
		justifyContent: 'center',
	},
	info_icons3: {
		width: 35,
		height: 28,
		borderRadius: 5,
		backgroundColor: "#F4E8C4",
		alignItems: 'center',
		justifyContent: 'center',
	},

	info_icons_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},

	no_appointments_star_flex: {
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'center',
	},

	top_container_img_icon_pics: {
		width: '100%',
		height: '100%',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},

	scrollViewContent: {
		paddingHorizontal: 20,
		paddingTop: 30,
		paddingBottom: 120,
	},

	list_icon_and_image_container_img: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: "#D7DCE2",
		alignItems: 'center',
		justifyContent: 'center',

	},

	list_icon_and_image_container: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},


	container: {
		position: "relative",
		flex: 1,
		backgroundColor: colors.white,
	},
})