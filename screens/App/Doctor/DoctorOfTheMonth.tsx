import { ScrollView, StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex'
import * as Haptics from 'expo-haptics';
import { useRoute } from '@react-navigation/native';
import { baseUrl } from '../../../shared/baseUrl';
import Rating from '../../../components/Rating';
import DoctorProfile from './DoctorProfile';
const windowHeight = Dimensions.get('window').height * 0.9;

const DoctorOfTheMonth = () => {
	const toastRef: any = useRef(null);
	const [doctor, setDoctor] = useState<any>([])
	const [isLoading, setIsLoading] = useState(false);
	const route = useRoute();
	// @ts-ignore
	const { item } = route.params;




	useEffect(() => {
		setIsLoading(true);
		// Set isLoading to false after 2 seconds
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);




	useEffect(() => {
		const fetchDoctor = async () => {
			setIsLoading(true);
			try {
				const url = baseUrl + `/getDoctorById/${item?.uid}`;
				const response = await fetch(url, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				});

				if (!response.ok) {
					setIsLoading(false);
					throw new Error('Network response was not ok');
				}

				const data = await response.json();
				setDoctor(data);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			} catch (error: any) {
				console.error('Error fetching doctor data:', error);
				toastRef.current.error(error.message);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDoctor();
	}, [item?.uid]);




	return (
		<ScrollView style={styles.container}
			contentInsetAdjustmentBehavior="automatic">
			{isLoading ?
				<View style={styles.specialist_list_container_loader_two}>
					<ActivityIndicator color='black' size={20} />
				</View>
				:
				<View style={styles.container_scrollview}  >
					<View style={styles.list_icon_and_image_container}>
						<View style={styles.list_icon_and_image_container_img}>
							{!doctor?.doctor?.photo_url ? <DoctorProfile /> :
								<Image
									source={{ uri: doctor?.doctor?.photo_url }}
									style={styles.top_container_img_icon_pics}
									resizeMode="cover"
								/>}
						</View>
						<View style={styles.info_icons_text_one_container}>
							<Text style={styles.info_icons_text_one}>Dr.{doctor?.doctor?.first_name} {doctor?.doctor?.last_name}</Text>
							<Text style={styles.info_icons_text_two}>{doctor?.doctor?.specialization}</Text>
						</View>
						<View style={styles.info_icons_text_one_container}>
							<Text style={styles.info_icons_text_three}>{doctor?.doctor?.experience_yrs}Years Experiece</Text>
							<View style={styles.no_appointments_star_flex}>
								<Rating rating={doctor?.doctor?.rating || 0} />
							</View>
						</View>
					</View>

					<View style={styles.info_text_container_main}>
						<View style={styles.info_text_container}>
							<Text style={styles.info_text_information}>About</Text>
							<Text style={styles.info_text_information_text}>{doctor?.doctor?.About}</Text>
						</View>
					</View>
				</View>}
		</ScrollView>
	)
}

export default DoctorOfTheMonth

const styles = StyleSheet.create({

	specialist_list_container_loader_two: {
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: 'center',
		height: windowHeight
	},

	info_text_container_main: {
		flexDirection: 'column',
		gap: 40,
		marginTop: 40,
	},

	info_text_information: {
		color: colors.black,
		fontSize: 16,
		fontFamily: "Inter-Regular",
		marginBottom: 10,
	},
	info_text_information_text: {
		color: colors.black,
		fontSize: 14,
		fontFamily: "Inter-Regular",
		marginBottom: 10,
	},


	info_text_container: {

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
		fontSize: 14,
		color: colors.smail_text_color,
		fontFamily: "Inter-Regular",
	},

	info_icons_text_one: {
		fontSize: 14,
		color: colors.black,
		fontFamily: "Inter-Regular",
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

	container_scrollview: {
		paddingHorizontal: 20,
		paddingTop: 30,
		marginBottom: 50,
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
		flex: 1,
		backgroundColor: colors.white,
	},
})