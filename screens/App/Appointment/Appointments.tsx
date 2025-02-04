import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex';
import { Tab, TabView } from '@rneui/themed';
import { getBookings } from '../../../hooks/getBookings';
import * as Haptics from 'expo-haptics';
import { Medicine } from '../../../assets/svg/medicine';
import moment from 'moment';
import Toast from '../../../components/Toast';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { timeSlot } from '../../../hooks/helpers';
import { Chatbubbles } from '../../../assets/svg/Chatbubbles';
import { UserCircle } from '../../../assets/svg/UserCircle';
import Calendar from '../../../assets/svg/Calendar';
import Clock from '../../../assets/svg/Clock';
import { Locations } from '@/assets/svg/Location';

const wait = (timeout: number | undefined) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};
const Appointments = () => {
	const dispatch = useAppDispatch();
	const navigation: any = useNavigation();
	const toastRef: any = useRef(null);
	const [index, setIndex] = React.useState(0);
	const [bookings, setBookings] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAppSelector((state: any) => state.auth);
	const [refreshing, setRefreshing] = React.useState(false);


	useEffect(() => {
		dispatch(login());
	}, [dispatch]);

	useEffect(() => {
		setIsLoading(true)
		if (user?.uid) {
			getBookings({ userId: user?.uid })
				.then(data => {
					// @ts-ignore
					setBookings(data);
					setIsLoading(false)
				})
				.catch(error => {
					toastRef.current.error(error.message);
					Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
					setIsLoading(false);
				});
		}
	}, [refreshing, user?.uid]);


	// Filter bookings based on their status (Pending or Completed)
	const filteredBookings = index === 0
		? (bookings && bookings.filter((booking: { bookingStatus: string; }) => booking?.bookingStatus === 'Accepted'))
		: index === 1 ?(bookings && bookings.filter((booking: { bookingStatus: string; }) => booking?.bookingStatus === 'Pending'))
		:index === 2 && (bookings && bookings.filter((booking: { bookingStatus: string; }) => booking?.bookingStatus === 'Declined'))


//console.log('index-index',index)

	useEffect(() => {
		setIndex(0);
	}, [])

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);


	const handleNext1 = (message: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		navigation.navigate('UpcomingAppointmentDetails', { item: message, user: user });
	};

	const handleNext2 = (message: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		navigation.navigate('CompletedAppointmentDetails', { item: message, user: user });
	};

	const handleNext3 = (message: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		navigation.navigate('CancelledAppointmentDetails', { item: message, user: user });
	};

	const hasData = Object.keys(bookings).length > 0;


	return (
		<SafeAreaView style={styles.container}>
			<Toast ref={toastRef} />
			{hasData ? (
				<>
					<View style={styles.titleStyle}>
						<Tab
							value={index}
							onChange={(e) => setIndex(e)}
							indicatorStyle={{ backgroundColor: colors.accent_green, height: 1, }}
							variant="default" >
							<Tab.Item title="Upcoming" titleStyle={{ fontSize: 14, color: colors.black }} />
							<Tab.Item title="Completed" titleStyle={{ fontSize: 14, color: colors.black }} />
							<Tab.Item title="Cancelled" titleStyle={{ fontSize: 14, color: colors.black }} />
						</Tab>
					</View>
					{
						isLoading ?
							<View style={styles.container_main_one}>
								<ActivityIndicator
									color={colors.black}
									size={20} />
							</View > : filteredBookings?.length === 0 || filteredBookings?.length === 0 ?
								<ScrollView refreshControl={
									<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
									<View style={styles.container_one} >
										<View style={styles.no_appointments_container}>
											<View style={styles.no_appointments_container_one}>
												<Medicine />
											</View>
											<View style={styles.no_appointments_container_two}>
												<Text style={styles.no_appointments_container_two_text}>
													{index == 0 ? "You don't have any appointment" : "You don't have any Past appointment"}
												</Text>
											</View>
										</View>
									</View>
								</ScrollView>
								:
								< >
									<TabView value={index} onChange={setIndex}>
										<TabView.Item key={index} style={{ width: '100%' }}>
											<ScrollView style={styles.card_list_scroll_container} refreshControl={
												<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
												{filteredBookings?.map((message: any, index: any) => (
													<TouchableOpacity style={styles.card_list_container} key={index} onPress={() => handleNext1(message)}>
														<View style={styles.card_list_image_container_main}>
															<View style={styles.card_list_image_container}>
																<View style={styles.top_container_img_circle}>
																	{message.photo_url ? < Image
																		source={{ uri: message?.photo_url }}
																		style={styles.top_container_img_icon}
																	/> : <UserCircle />}
																</View>
																<View style={styles.top_container_img_circle_second}>
																	<Text style={styles.card_summary_text1}>Dr. {message?.doctorName}</Text>
																	<Text style={styles.card_summary_text2}>{message?.specialization}</Text>
																	<View style={{flexDirection: 'row'}}>
																		<Locations color='#646464'/>
																		<Text style={styles.card_location_text}>{message?.Location}</Text>
																	</View>
																	{/*<Text style={styles.card_summary_text3}>{message?.type}</Text>*/}
																</View>
															</View>
															{/*<View style={styles.top_container_summary}>
																<Text style={styles.top_container_summary_text}>Summary</Text>
															</View>*/}
														</View>
														<View style={{flexDirection: 'row', justifyContent: 'center'}}>
															<Text style={styles.top_container_appointment1}>
																{moment.unix(message?.bookingDate?.seconds).format('Do MMMM, YYYY')}
															</Text>
															<View style={{ width: 1, height: 15, backgroundColor: "#D5D5D5"}}></View>
															<Text style={styles.appointment_time}>{timeSlot(message)}</Text>
														</View>
														{/*<View style={styles.top_container_summary_container}>
															<View style={styles.top_container_summary_container_sub}>
																<View>
																	<Text style={styles.top_container_appointment}>Appointment Date</Text>
																	<View style={styles.top_appointment_container}>
																		<Calendar />
																		<Text style={styles.top_container_appointment1}>
																			{moment.unix(message?.bookingDate?.seconds).format('Do MMMM, YYYY')}
																		</Text>
																	</View>
																</View>
																<View style={styles.top_appointment_container}>
																	<Clock />
																	<Text style={styles.appointment_time}>{timeSlot(message)}</Text>
																</View>
															</View>
															<View>
																<View>
																	<Text style={styles.appointment_duration}>Appointment Duration</Text>
																	<Text style={styles.appointment_hours}>{message?.duration}</Text>
																</View>
															</View>
														</View>*/}
													</TouchableOpacity>
												))}
											</ScrollView>
										</TabView.Item>
										<TabView.Item key={index} style={{ width: '100%' }}>
										<ScrollView style={styles.card_list_scroll_container} refreshControl={
												<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
												{filteredBookings?.map((message: any, index: any) => (
													<TouchableOpacity style={styles.card_list_container} key={index} onPress={() => handleNext2(message)}>
														<View style={styles.card_list_image_container_main}>
															<View style={styles.card_list_image_container}>
																<View style={styles.top_container_img_circle}>
																	{message.photo_url ? < Image
																		source={{ uri: message?.photo_url }}
																		style={styles.top_container_img_icon}
																	/> : <UserCircle />}
																</View>
																<View style={styles.top_container_img_circle_second}>
																	<Text style={styles.card_summary_text1}>Dr. {message?.doctorName}</Text>
																	<Text style={styles.card_summary_text2}>{message?.specialization}</Text>
																	<View style={{flexDirection: 'row'}}>
																		<Locations color='#646464'/>
																		<Text style={styles.card_location_text}>{message?.Location}</Text>
																	</View>
																	{/*<Text style={styles.card_summary_text3}>{message?.type}</Text>*/}
																</View>
															</View>
															{/*<View style={styles.top_container_summary}>
																<Text style={styles.top_container_summary_text}>Summary</Text>
															</View>*/}
														</View>
														<View style={{flexDirection: 'row', justifyContent: 'center'}}>
															<Text style={styles.top_container_appointment1}>
																{moment.unix(message?.bookingDate?.seconds).format('Do MMMM, YYYY')}
															</Text>
															<View style={{ width: 1, height: 15, backgroundColor: "#D5D5D5"}}></View>
															<Text style={styles.appointment_time}>{timeSlot(message)}</Text>
														</View>
														{/*<View style={styles.top_container_summary_container}>
															<View style={styles.top_container_summary_container_sub}>
																<View>
																	<Text style={styles.top_container_appointment}>Appointment Date</Text>
																	<View style={styles.top_appointment_container}>
																		<Calendar />
																		<Text style={styles.top_container_appointment1}>
																			{moment.unix(message?.bookingDate?.seconds).format('Do MMMM, YYYY')}
																		</Text>
																	</View>
																</View>
																<View style={styles.top_appointment_container}>
																	<Clock />
																	<Text style={styles.appointment_time}>{timeSlot(message)}</Text>
																</View>
															</View>
															<View>
																<View>
																	<Text style={styles.appointment_duration}>Appointment Duration</Text>
																	<Text style={styles.appointment_hours}>{message?.duration}</Text>
																</View>
															</View>
														</View>*/}
													</TouchableOpacity>
												))}
											</ScrollView>
										</TabView.Item>
										<TabView.Item key={index} style={{ width: '100%' }}>
										<ScrollView style={styles.card_list_scroll_container} refreshControl={
												<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
												{filteredBookings?.map((message: any, index: any) => (
													<TouchableOpacity style={styles.card_list_container3} key={index} onPress={() => handleNext3(message)}>
														<View style={styles.card_list_image_container_main}>
															<View style={styles.card_list_image_container}>
																<View style={styles.top_container_img_circle}>
																	{message.photo_url ? < Image
																		source={{ uri: message?.photo_url }}
																		style={styles.top_container_img_icon}
																	/> : <UserCircle />}
																</View>
																<View style={styles.top_container_img_circle_second}>
																	<Text style={styles.card_summary_text1}>Dr. {message?.doctorName}</Text>
																	<Text style={styles.card_summary_text2}>{message?.specialization}</Text>
																	<View style={{flexDirection: 'row'}}>
																		<Locations color='#646464'/>
																		<Text style={styles.card_location_text}>{message?.Location}</Text>
																	</View>
																	{/*<Text style={styles.card_summary_text3}>{message?.type}</Text>*/}
																</View>
															</View>
															{/*<View style={styles.top_container_summary}>
																<Text style={styles.top_container_summary_text}>Summary</Text>
															</View>*/}
														</View>
														<View style={{flexDirection: 'row', justifyContent: 'center'}}>
															<Text style={styles.top_container_appointment1}>
																{moment.unix(message?.bookingDate?.seconds).format('Do MMMM, YYYY')}
															</Text>
															<View style={{ width: 1, height: 15, backgroundColor: "#D5D5D5"}}></View>
															<Text style={styles.appointment_time}>{timeSlot(message)}</Text>
														</View>
														{/*<View style={styles.top_container_summary_container}>
															<View style={styles.top_container_summary_container_sub}>
																<View>
																	<Text style={styles.top_container_appointment}>Appointment Date</Text>
																	<View style={styles.top_appointment_container}>
																		<Calendar />
																		<Text style={styles.top_container_appointment1}>
																			{moment.unix(message?.bookingDate?.seconds).format('Do MMMM, YYYY')}
																		</Text>
																	</View>
																</View>
																<View style={styles.top_appointment_container}>
																	<Clock />
																	<Text style={styles.appointment_time}>{timeSlot(message)}</Text>
																</View>
															</View>
															<View>
																<View>
																	<Text style={styles.appointment_duration}>Appointment Duration</Text>
																	<Text style={styles.appointment_hours}>{message?.duration}</Text>
																</View>
															</View>
														</View>*/}
													</TouchableOpacity>
												))}
											</ScrollView>
										</TabView.Item>
									</TabView>
								</>}
				</>
			) : (

				<View style={styles.emptyStateContainer}>
					<Chatbubbles />
					<Text style={styles.emptyStateText}>No chats available</Text>
				</View>
			)}
		</SafeAreaView>
	)
}

export default Appointments

const styles = StyleSheet.create({
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
	container_one: {
		paddingHorizontal: 10,
	},

	no_appointments_container_one: {
		width: "45%",
		height: 150,
	},


	no_appointments_container_two_text: {
		fontSize: 20,
		color: colors.white,
		fontFamily: "Inter-Regular",
	},

	no_appointments_container_two: {

		flexDirection: 'column',
		// alignItems: 'flex-start',
		width: '52%',
	},
	no_appointments_container: {
		width: '100%',
		height: 150,
		backgroundColor: colors.black,
		padding: 20,
		borderRadius: 10,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 30,

	},
	titleStyle: {
		marginHorizontal: 20,
	},



	card_list_tab_container: {
		marginBottom: 20,
	},


	activeTitle: {
		color: '#333', // Adjust text color for active tab
		borderBottomWidth: 0, // Add bottom border
		borderBottomColor: colors.accent_green,
	},
	inactiveTitle: {
		color: colors.smail_text_color,
	},


	card_list_scroll_container: {
		//paddingHorizontal: 10,
		//marginTop: 20,
		//marginBottom: 0,
	},

	top_appointment_container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},

	top_container_summary_container_sub: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 10,
	},

	appointment_hours: {
		fontSize: 10,
		color: colors.black,
		fontFamily: "Inter-Regular",
		textAlign: "center"
	},

	appointment_duration: {
		fontSize: 10,
		color: colors.smail_text_color,
		fontFamily: "Inter-Regular",
		textAlign: "center",
		marginBottom: 8,
	},

	appointment_time: {
		color: "#363636",
		fontSize: 12,
		marginHorizontal: 10,
		fontFamily: "Inter-Regular",
		fontWeight: '400'
	},

	top_container_appointment1: {
		fontSize: 12,
		color: "#363636",
		fontWeight: '400',
		fontFamily: "Inter-Regular",
		marginHorizontal: 10
	},
	top_container_appointment: {
		fontSize: 10,
		color: colors.smail_text_color,
		fontFamily: "Inter-Regular",
		// fontFamily: "Inter-Regular",
		marginBottom: 8,
	},

	top_container_summary_container: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},

	card_summary_text1: {
		color: colors.black,
		fontFamily: "Inter-Medium",
		fontSize: 14,
		fontWeight: '500'
	},
	card_summary_text2: {
		color: "#363636",
		fontFamily: "Inter-Regular",
		fontSize: 12,
		fontWeight: '400'
	},
	card_location_text: {
		color: "#646464",
		fontSize: 10,
		fontWeight: '400',
		fontFamily: 'Inter-Regular'
	},
	card_summary_text3: {
		color: colors.black,
		fontFamily: "Inter-Regular",
		fontSize: 12.5,
	},


	top_container_summary_text: {
		color: colors.accent_green,
		fontSize: 10,
		fontFamily: "Inter-Regular",
	},

	top_container_summary: {
		backgroundColor: colors.accent_green_light,
		height: 24,
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "auto",
		borderRadius: 10,
	},

	card_list_image_container_main: {
		flexDirection: "row",
		justifyContent: "space-between",
		//borderBottomWidth: 0.3,
		borderColor: colors.smail_text_color,
		//paddingBottom: 10,
	},

	top_container_img_circle_second: {
		flexDirection: "column",
		gap: 10
	},

	card_list_image_container: {
		flexDirection: "row",
		gap: 10,
		margin: 20,
		marginBottom: 0
	},

	top_container_img_icon: {
		width: 42,
		height: 42,
		borderRadius: 50,
	},

	top_container_img_circle: {
		width: 45,
		height: 45,
		borderRadius: 50,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 1,
	},


	container_main: {
		padding: 10,
		marginBottom: 50,
	},
	container_main_one: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		height: "100%",
	},

	card_list_container: {
		height: 126,
		//width: "100%",
		margin: 20,
		marginBottom: 15,
		//borderLeftWidth: 5,
		borderWidth: 0.5,
		//borderLeftColor: colors.accent_green,
		borderColor: "#D5D5D5",
		//padding: 10,
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		// shadowColor: colors.black,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 1,
		// },
		// shadowOpacity: 0.15,
		// shadowRadius: 2,
		// elevation: 1,
	},
	card_list_container3: {
		height: 126,
		//width: "100%",
		margin: 20,
		marginBottom: 15,
		//borderLeftWidth: 5,
		borderWidth: 0.5,
		//borderLeftColor: colors.accent_green,
		borderColor: "#D91F11",
		//padding: 10,
		backgroundColor: "#FFFAFA",
		borderRadius: 12,
		// shadowColor: colors.black,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 1,
		// },
		// shadowOpacity: 0.15,
		// shadowRadius: 2,
		// elevation: 1,
	},



	container: {
		flexGrow: 1,
		backgroundColor: colors.background,
		// backgroundColor: colors.white,
		position: 'relative',
	},

})


