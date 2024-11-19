import React, { useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image
} from "react-native";
import moment from "moment";
import * as Haptics from 'expo-haptics';
import { colors } from "../../../css/colorsIndex";
import { TouchableOpacity } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserCircle } from "../../../assets/svg/UserCircle";
import { ID } from "../../../assets/svg/ID";
import { NewCalender } from "../../../assets/svg/NewCalender";
import Toast from "@/components/Toast";

const AppointmentDetails = () => {
	const navigation: any = useNavigation();
	const route = useRoute();
	// @ts-ignore
	const { item } = route.params;
	const toastRef = useRef<any>(null); // Replace with your actual toast reference


	// Remove underscore from item and capitalize first letter
	const formattedItem = item?.slot?.replace('_', ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

	const handleNext = (item: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		navigation.navigate('RescheduleBooking', { booking: item });
	};
	const handleVitals = (item: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		navigation.navigate('EnterVitals', { booking: item });
	};




	return (
		<View style={styles.container}>
			<Toast ref={toastRef} />
			<View style={styles.container_sub}>
				<RootSiblingParent>

					<ScrollView contentContainerStyle={styles.scrollViewContent}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}>
						<View style={styles.topboxContainer}>
							<View style={styles.topboxTextContainer} >
								<Text style={styles.topboxTextContainer_text_nett}>You will receive a confirmation mail </Text>
							</View>

							<View style={styles.booked_text_nett}>
								<View>
									<Text style={styles.topboxTextContainer_text_nett}>Booked for</Text>
								</View>
								<View style={styles.booked_text_container_main}>
									<View style={styles.booked_text_container}>
										{item.photo_url ? < Image
											source={{ uri: item?.photo_url }}
											style={styles.top_container_img_icon}
										/> : <UserCircle />}

									</View>
									<View>
										<Text style={styles.bookeding_text}>{item?.doctorName}</Text>
										<Text style={styles.bookeding_text_two}>Consultation with  {item?.title}  {item?.doctorName}</Text>
									</View>
								</View>
								<View style={styles.booked_text_container_main_two}>
									<Text style={styles.bookeding_section_two}>Patient Vitals</Text>
									<View style={styles.bookeding_section_text_container}>
										<UserCircle />
										<Text style={styles.bookeding_section_text_two_sub}>{item?.patientName}</Text>
									</View>

									<TouchableOpacity style={styles.bookeding_section_two_color_container2} onPress={() => handleVitals(item)}>
										<Text style={styles.bookeding_section_two_color_text}>Patient Vitals</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.booked_text_container_main_two}>
									<Text style={styles.bookeding_section_two}>Date & Time</Text>
									<View style={styles.bookeding_section_text_container}>
										<Text>Booking Channel</Text>
										<Text style={styles.bookeding_section_text_two_sub}>{item?.bookingChannel}</Text>
									</View>
									<View style={styles.bookeding_section_text_container}>
										<NewCalender />
										<Text style={styles.bookeding_section_text_two_sub}>{moment.unix(item?.bookingDate?.seconds).format('Do MMMM, YYYY')}</Text>
									</View>

									<TouchableOpacity style={styles.bookeding_section_two_color_container} onPress={() => handleNext(item)}>
										<Text style={styles.bookeding_section_two_color_text}>Request Cancellation </Text>
									</TouchableOpacity>
								</View>
								<View style={styles.booked_text_container_main_two}>
									<Text style={styles.bookeding_section_two}>Booking ID</Text>
									<View style={styles.bookeding_section_text_container}>
										<ID />
										<Text style={styles.bookeding_section_text_two_sub}>{item?.bookingId}</Text>
									</View>
								</View>
								<View style={styles.booked_text_container_main_two}>
									<Text style={styles.bookeding_section_two}>Appointment</Text>
									<View style={styles.bookeding_section_text_container}>
										<Text style={styles.bookeding_section_text_two_sub}>{formattedItem}</Text>
										<Text
											style={[
												styles.bookeding_section_two,
												item?.bookingStatus === "Accepted"
													? styles.bookingStatus_green
													: item?.bookingStatus === "Done"
														? styles.bookingStatus_green
														: item?.bookingStatus === "Declined"
															? styles.bookingStatus_red
															: styles.bookingStatus_yellow
											]}
										>
											{item?.bookingStatus}
										</Text>

									</View>
									<View style={styles.bookeding_section_text_container}>
										<Text style={styles.bookeding_section_text_two_sub}>Hospital</Text>
									</View>
									<Text style={styles.bookeding_text_two}>{item?.hospital}</Text>
								</View>
							</View>
						</View>
					</ScrollView>
				</RootSiblingParent >
			</View>


		</View>
	);
}

export default AppointmentDetails



const styles = StyleSheet.create({

	bookingStatus_green: {
		color: colors.accent_green,
		padding: 5,
		backgroundColor: '#dbf6d7'
	},
	bookingStatus_yellow: {
		color: colors.star,
		paddingHorizontal: 6,
		paddingVertical: 3,
		backgroundColor: '#856404',
		borderRadius: 20,
	},
	bookingStatus_red: {
		color: colors.red,
		padding: 5,
		backgroundColor: '#fff0ea'
	},
	container_main_one: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		height: "100%",
	},
	top_container_img_icon: {
		width: 42,
		height: 42,
		borderRadius: 50,
	},

	bookeding_section_text_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginTop: 30,
	},

	bookeding_section_two_color_text: {
		color: colors.accent_green,
		fontSize: 12.5,
		fontFamily: "Inter-Regular",
	},
	bookeding_section_two_color_container2: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.accent_green_light,
		paddingVertical: 5,
		paddingHorizontal: 10,
		width: 120,
		marginTop: 20,
		borderRadius: 20,
		borderWidth: 0.5,
		borderColor: colors.border_color,
	},
	bookeding_section_two_color_container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.accent_green_light,
		paddingVertical: 5,
		paddingHorizontal: 10,
		width: 160,
		marginTop: 20,
		borderRadius: 20,
		borderWidth: 0.5,
		borderColor: colors.border_color,
	},
	bookeding_section_two: {
		color: colors.smail_text_color,
		fontSize: 12.5,
		fontFamily: "Inter-Regular",
	},

	bookeding_text_two: {
		color: colors.smail_text_color,
		fontSize: 12.5,
		fontFamily: "Inter-Regular",
		marginTop: 5,
	},

	bookeding_section_text_two_sub: {
		color: colors.black,
		fontSize: 12.5,
		fontFamily: "Inter-Regular",
	},
	bookeding_section_text_two: {
		color: colors.black,
		fontSize: 12.5,
		fontFamily: "Inter-Regular",
		marginTop: 20,
	},
	bookeding_text: {
		color: colors.black,
		fontSize: 12.5,
		fontFamily: "Poppins-Bold",
	},

	booked_text_container_main_two: {
		marginTop: 25,
		borderBottomWidth: 0.4,
		borderBottomColor: colors.smail_text_color,
		paddingBottom: 30,
	},
	booked_text_container_main: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginTop: 20,
		borderBottomWidth: 0.4,
		borderBottomColor: colors.smail_text_color,
		paddingBottom: 30,
	},

	booked_text_container: {
		borderWidth: 1,
		borderColor: colors.accent_green,
		width: 40,
		height: 40,
		borderRadius: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	booked_text_nett: {
		marginTop: 20,
		marginHorizontal: 10,
	},

	topboxTextContainer_text_nett: {
		color: colors.smail_text_color,
		fontSize: 12.5,
		fontFamily: "Inter-Regular",
		marginTop: 10,
	},

	booking_text_border: {
		borderBottomWidth: .4,
		borderBottomColor: colors.border_color,
	},

	booking_text_container_main: {
		marginTop: 40,
	},

	topboxSpace_text_one_text: {
		color: colors.white,
		fontSize: 16,
		fontFamily: "Inter-Regular",
	},
	topboxSpace_text_one: {
		color: colors.white,
		fontSize: 20,
		fontFamily: "Inter-Regular",
	},
	topboxSpace_text_two: {
		color: colors.white,
		fontSize: 14,
		fontFamily: "Inter-Regular",
	},

	booking_text_content: {
		width: "100%",
		paddingVertical: 15,
	},

	booking_text: {},

	booking_text_container: {
		backgroundColor: colors.white,
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 10,
		borderWidth: 0.4,
		borderColor: colors.border_color,
	},

	topboxSpacebottom: {
		color: colors.white,
		fontSize: 25,
		fontFamily: "Poppins-BlackItalic",
	},

	topboxSpace: {
		width: 60,
		height: 60,
		borderRadius: 50,
		backgroundColor: colors.grayColor,
	},

	topboxInnerContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},

	topboxContainer: {
		gap: 2,
		paddingTop: 10,
	},

	topboxTextContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	topboxText: {
		marginTop: 20,
		fontSize: 20,
		fontFamily: "",
		textAlign: "center",
		width: "100%",
	},

	topbox: {
		marginTop: 10,
		height: 180,
		width: "100%",
		backgroundColor: colors.accent_green,
		borderRadius: 10,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
		gap: 2,
		padding: 20,
		borderWidth: 0.4,
		borderColor: colors.border_color,
	},


	container_sub: {
		margin: 10,
	},
	container: {
		flexGrow: 1,
		backgroundColor: colors.white,
	},
	scrollViewContent: {
		paddingBottom: 150,
	},


	input: {
		borderColor: "black",
		borderWidth: 2,
		padding: 10,
		marginTop: 15,
	},
});

