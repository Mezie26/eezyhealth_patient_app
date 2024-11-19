import { SafeAreaView, StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList, ScrollView, RefreshControl, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Setting } from '../../../assets/svg/Setting';
import { Medicine } from '../../../assets/svg/medicine';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { getSpecializationCollection } from '../../../hooks/getSpecialization';
import { getDoctorsCollection } from '../../../hooks/getDoctors';
import { getBookings } from '../../../hooks/getBookings';
import { colors } from '../../../css/colorsIndex';
import { login } from '../../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import Toast from '../../../components/Toast';
import BannerSlider from '../../../components/CarouselCard/BannerSlider';
import Headline from '../../../components/Headline';
import moment from 'moment';
import { getDoctorOfTheMonth } from '../../../hooks/getDoctorOfTheMonth';
import { capitalizedMonth } from '../../../hooks/helpers';
import { checkSurveys } from '../../../hooks/checkSurveys';
import { getAllDoctorsByRole } from '../../../hooks/getAllDoctorsByRole';
import DoctorList from './DoctorList';
import { Search } from '../../../assets/svg/Search';
import { useRefresh } from '@/shared/RefreshContext';


const wait = (timeout: number | undefined) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = () => {
	const route = useRoute();
	// @ts-ignore
	const load = route?.params?.load
	const dispatch = useAppDispatch();
	const toastRef: any = useRef(null);
	const navigation: any = useNavigation();
	const { user } = useAppSelector((state: any) => state.auth);


	const [refreshing, setRefreshing] = React.useState(false);
	const [alertShown, setAlertShown] = useState(false);
	const [isLoading, setIsLoading] = useState({
		bookings: false,
		doctorMonth: false,
		specializations: false,
		doctors: false,
		doctorsByRole: false,
	});
	const [data, setData] = useState<any>({
		bookings: [],
		doctorMonth: [],
		specializations: [],
		doctors: [],
		doctorsByRole: [],
	});

	useEffect(() => {
		dispatch(login());
	}, [dispatch])




	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);


	// Filter bookings based on their status (Pending or Completed)
	const filteredBookings = data?.bookings?.filter((booking: { bookingStatus: string; }) => booking?.bookingStatus === 'Accepted') || [];

	const currentDate = moment(); // Get current date in milliseconds  

	const filteredData = filteredBookings?.filter((item: { bookingDate: { seconds: number; }; }) => {
		const bookingDate = moment.unix(item?.bookingDate?.seconds).format('Do MMMM, YYYY');
		return moment(bookingDate, 'Do MMMM, YYYY').isSameOrAfter(currentDate, 'day');
	});

	// Sort the filteredData array based on the closest date to the current date
	filteredData?.sort((a: { bookingDate: { seconds: number; }; }, b: { bookingDate: { seconds: number } }) => {
		const dateA = moment.unix(a?.bookingDate?.seconds);
		const dateB = moment.unix(b?.bookingDate?.seconds);

		// Calculate the difference in milliseconds from the current date
		const diffA = Math.abs(dateA.diff(currentDate, 'milliseconds'));
		const diffB = Math.abs(dateB.diff(currentDate, 'milliseconds'));

		return diffA - diffB;
	});




	useEffect(() => {
		const fetchData = async () => {
			setIsLoading({
				bookings: true,
				doctorMonth: true,
				specializations: true,
				doctors: true,
				doctorsByRole: true,
			});

			try {
				if (user?.uid) {
					const bookingsData = await getBookings({ userId: user?.uid });
					setData((prev: any) => ({ ...prev, bookings: bookingsData }));
					setIsLoading(prev => ({ ...prev, bookings: false }));
				} else {
					setIsLoading(prev => ({ ...prev, bookings: false }));
				}

				const doctorMonthData = await getDoctorOfTheMonth({ month: capitalizedMonth });
				setData((prev: any) => ({ ...prev, doctorMonth: doctorMonthData }));
				setIsLoading(prev => ({ ...prev, doctorMonth: false }));

				const doctorsByRoleData = await getAllDoctorsByRole();
				setData((prev: any) => ({ ...prev, doctorsByRole: doctorsByRoleData }));
				setIsLoading(prev => ({ ...prev, doctorsByRole: false }));

				const specializationsData = await getSpecializationCollection();
				setData((prev: any) => ({ ...prev, specializations: specializationsData }));
				setIsLoading(prev => ({ ...prev, specializations: false }));

				const doctorsData = await getDoctorsCollection();
				setData((prev: any) => ({ ...prev, doctors: doctorsData }));
				setIsLoading(prev => ({ ...prev, doctors: false }));

			} catch (error) {
				// @ts-ignore 
				// toastRef.current.error(error.message);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
				setIsLoading({
					bookings: false,
					doctorMonth: false,
					specializations: false,
					doctors: false,
					doctorsByRole: false,
				});
			}
		};

		fetchData();
	}, [user?.uid, capitalizedMonth, refreshing, load]);


	useEffect(() => {
		const fetchData = async () => {
			try {
				if (user?.uid) {
					const surveysData: any = await checkSurveys({ userId: user?.uid });

					if (surveysData?.message) {
						// No surveys found, trigger alert
						if (!alertShown) {
							setAlertShown(true);
							Alert.alert(
								"Please",
								"Take the Survey",
								[
									{ text: "Later", style: "cancel" },
									{ text: "Proceed", onPress: () => navigation.navigate('Questionaire', { id: user?.uid }) },
								],
								{ cancelable: false }
							);
							await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
						}
					} else {
						// Surveys found, update state
						setData((prev: any) => ({ ...prev, surveys: surveysData }));
					}
				}
			} catch (error) {
				if (!alertShown) {
					setAlertShown(true);
					Alert.alert(
						"Please",
						"Take the Survey",
						[
							{ text: "Later", style: "cancel" },
							{ text: "Proceed", onPress: () => navigation.navigate('Questionaire', { id: user.uid }) },
						],
						{ cancelable: false }
					);
					await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
				}
			}
		};

		fetchData();
	}, [user?.uid, alertShown]);





	const renderItem = ({ item }: { item: any }) => (
		<TouchableOpacity
			style={styles.specialist_list_container}
			onPress={() => {
				navigation.navigate('SearchDoctor', { search: item?.name });
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
			}}
		>
			<Text style={styles.specialist_text}>{item?.name}</Text>
		</TouchableOpacity>
	);


	const handlePress = (item: any) => {
		navigation.navigate('DoctorProfile', { item: item, user: user });
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};
	const handleDoctorOfTheMonth = (item: any) => {
		navigation.navigate('DoctorOfTheMonth', { item: item, user: user });
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};
	const handleSearch = () => {
		navigation.navigate('SearchDoctor')
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};


	return (
		<SafeAreaView style={styles.container}>
			<Toast ref={toastRef} />
			<Headline bookings={data?.bookings} displayName={user} />
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				contentInsetAdjustmentBehavior="automatic">

				<View style={styles.top_container}>
					<TouchableOpacity style={styles.inputContainer} onPress={handleSearch}>
						<Search />
						<View style={styles.isettingsContainer_text}>
							<Text style={styles.settings} >
								Search doctor
							</Text>
						</View>
						<TouchableOpacity style={styles.inputContainer_setting}>
							<Setting />
						</TouchableOpacity>
					</TouchableOpacity>

					<View style={styles.doctor_container}>
						<Text style={styles.doctor_container_text}>Doctor of the Month</Text>
						<View style={styles.doctor_image_container}>

							{data?.doctorMonth?.map((item: any, index: React.Key | null | undefined) => (
								<ImageBackground
									key={index}
									source={{ uri: item?.photo_url }}
									style={styles.top_container_img_icon} >
									<View style={styles.doctor_image_container_inside}>
										<View style={styles.doctor_image_inside_one}></View>
										<View style={styles.doctor_image_inside_two}>
											<View style={styles.doctor_inside_one}>
												<Text style={styles.doctor_inside_one_one}>{item?.doctorName}</Text>
												<Text style={styles.doctor_inside_one_two}>{item?.specialization}</Text>
												<Text style={styles.doctor_inside_one_three}>{item?.hospital}</Text>
											</View>
											<TouchableOpacity
												style={styles.doctor_inside_two}
												onPress={() => handleDoctorOfTheMonth(item)}
											>
												<Text style={styles.doctor_inside_two_text}>View Profile</Text>
											</TouchableOpacity>
										</View>
									</View>
								</ImageBackground>
							))}
							<TouchableOpacity onPress={handleSearch}>
								<Text style={styles.doctor_inside_one_one_out}>View All Doctors</Text>
							</TouchableOpacity>
						</View>
					</View>

				</View>
				{/* Find a Specialist */}
				<View style={styles.find_a_specialist_container}>
					{!data?.specializations ? "" : <Text>Find a Specialist</Text>}

					<View style={styles.specialist_container_list}>
						{isLoading.specializations ?
							<View style={styles.specialist_list_container_loader}>
								<ActivityIndicator color={colors.black} size={20} />
							</View>
							:
							<FlatList
								// @ts-ignore 
								data={data?.specializations}
								renderItem={renderItem}
								keyExtractor={(item, index) => index.toString()}
								horizontal={true}
								showsHorizontalScrollIndicator={true}
								contentContainerStyle={styles.flatListContent}
							/>}
					</View>

					{isLoading.bookings ?
						<View style={styles.SkeletonLoader}>
							<ActivityIndicator color={colors.black} size={20} />
						</View> : filteredBookings?.length === 0 ?
							<View style={styles.no_appointments_container}>
								<View style={styles.no_appointments_container_one}>
									<Medicine />
								</View>
								<View style={styles.no_appointments_container_two}>
									<Text style={styles.no_appointments_container_two_text}>You don't have any appointment</Text>
									<Text style={styles.no_appointments_container_two_text_one}>Book now to see a doctor</Text>
								</View>
							</View> :
							<View>
								{/* Appointments */}
								<BannerSlider data={filteredData} navigation={navigation} />
							</View>}


					<View style={styles.no_appointments_container_three}>
						{isLoading?.doctors || !data?.doctors ? "" :
							<View >
								<Text style={styles.no_appointments_container_three_text}>Active Doctors</Text>
							</View>}

						{isLoading?.doctors ?
							<View style={styles.specialist_list_container_loader}>
								<ActivityIndicator color={colors.black} size={20} />
							</View>
							:
							<DoctorList doctorsByRole={data?.doctorsByRole} doctors={data?.doctors} handlePress={handlePress} />
						}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView >
	)
}

export default Home

const styles = StyleSheet.create({
	starRatingContainer: {
		paddingVertical: 0, // Remove padding
	},
	SkeletonLoader: { marginTop: 40 },

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

	isettingsContainer_text: {
		width: "70%"
	},

	specialist_list_container_loader: {
		height: 'auto',
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: "center",
		paddingVertical: 20,
		width: "100%"
	},

	top_container_img_doctor_container_text: {
		color: colors.black,
		fontSize: 13,
	},

	top_container_img_doctor_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.border_color,
		borderRadius: 10,
		paddingHorizontal: 10
	},
	top_container_img_doctor: {
		width: 80,
		height: 100,
		borderRadius: 10,
	},

	no_appointments_star_doctor: {
		width: 80,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},

	no_appointments_star_flex_two: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10

	},

	no_appointments_star_flex: {
		flexDirection: "row",
		alignItems: 'center',
		width: 100,
	},

	no_appointments_star: {
		flexDirection: 'column',
		justifyContent: 'space-between',

	},

	no_appointments_container_three_sub: {
		width: '100%',
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderRadius: 10,
		backgroundColor: colors.white,
		flexDirection: 'row',
		justifyContent: "space-between",
		marginBottom: 20,
		borderWidth: 1,
		borderColor: colors.grayColor,
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



	access_card_img_text_three_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},

	access_card_img_text_one: {
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Inter-Regular',
		marginBottom: 5,
	},
	access_card_img_text_two: {
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Inter-Regular',
		marginBottom: 5,
	},
	access_card_img_text_three: {
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Inter-Regular',
	},

	access_card_img_text_dr: {
		marginTop: 0,
	},
	access_card_img_text: {
		marginTop: 20,
	},

	access_card_img_pics: {
		width: 100,
		height: "auto",
	},

	access_card_img: {
		borderRadius: 50,
		flexDirection: "row",
		gap: 10,
		padding: 10,
	},


	flatListContent: {
		gap: 10,
	},
	specialist_container_list: {
		flexDirection: "row",
		gap: 20,
	},

	specialist_text: {
		color: colors.black,
		textAlign: "center",
	},
	specialist_list_container: {
		width: 150,
		height: 45,
		backgroundColor: colors.white,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		borderWidth: 1,
		borderColor: colors.grayColor,
	},

	find_a_specialist_container: {
		marginTop: 40,
		marginHorizontal: 10,
	},

	doctor_inside_one_one_out: {
		color: colors.accent_green,
		fontSize: 14,
		marginTop: 10,
	},

	doctor_container_text: {
		color: colors.black,
		fontSize: 14,
		fontFamily: "Inter-Regular",
		marginBottom: 10,
	},

	doctor_inside_one_one: {
		color: colors.black,
		fontSize: 12,
	},
	doctor_inside_one_two: {
		color: colors.white,
		fontSize: 12,

	},

	doctor_inside_one_three: {
		color: colors.black,
		fontSize: 12,
		marginTop: 10,
		fontFamily: "Inter-Regular"
	},

	doctor_inside_two_text: {
		textAlign: 'center',
		color: colors.white,
	},

	doctor_inside_two: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: 100,
		height: 40,
		borderTopLeftRadius: 10,
		backgroundColor: colors.accent_green,
		alignSelf: "flex-end"
	},

	doctor_inside_one: {
		width: '100%',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		padding: 10,
	},

	doctor_image_inside_two: {
		width: '45%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},

	doctor_image_inside_one: {
		width: '55%',
		height: '100%',

	},

	doctor_image_container_inside: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	doctor_image_container: {
		borderRadius: 10,
	},


	top_container_img_icon: {
		width: "100%",
		height: 220,
		borderRadius: 10,
		overflow: 'hidden',
	},

	doctor_container: {
		width: "100%",
		marginTop: 30,
	},

	settings: {
		borderColor: '#ECEEF1',
		borderWidth: 0,
		color: colors.smail_text_color
	},

	inputContainer_setting: {
		width: 50,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 1,
		borderColor: colors.smail_text_color,
	},

	inputContainer: {
		height: 50,
		backgroundColor: "#ECEEF1",
		borderRadius: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
	},

	top_container: {
		marginHorizontal: 10,
		marginTop: 10,
	},


	container: {
		flexGrow: 1,
		paddingTop: Platform.OS === "android" ? 40 : 10,
		backgroundColor: "#F0F4F8",
	}
})