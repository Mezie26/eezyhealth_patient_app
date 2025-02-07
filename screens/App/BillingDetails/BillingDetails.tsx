import React, { useEffect, useRef, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	Alert,
	ActivityIndicator,
	Modal
} from "react-native";
import * as Haptics from 'expo-haptics';
import Toast from "../../../components/Toast";
import { colors } from "../../../css/colorsIndex";
import { TouchableOpacity } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { useNavigation, useRoute } from "@react-navigation/native";
import { timeSlot } from "../../../hooks/helpers";
import { baseUrl } from "../../../shared/baseUrl";
import { Paystack, paystackProps } from "../../../components/PaystackWebView";
import axios from "axios";
import { UserCircle } from "../../../assets/svg/UserCircle";
import { CalenderIcon2 } from "@/assets/svg/CalenderIcon2";
import { SwitchIcon } from "@/assets/svg/SwitchIcon";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const BillingDetails = () => {
	const navigation: any = useNavigation();
	const route = useRoute();
	// @ts-ignore
	const { input, item, user, pricing } = route.params;
	// Access the price
	const price = parseFloat(pricing[0]?.pricing.replace(/,/g, ''));
	const [refNumber, setRefNumber] = useState("");
	const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

	const uid = user?.uid
	const [isLoading, setIsLoading] = useState(false);
	const [bookID, setBookID] = useState<any>([]);
	const toastRef: any = useRef(null);
	const [pay, setPay] = useState(false);
	const [billingDetail, setBillingDetail] = useState({
		billingName: user?.display_mame,
		billingEmail: user?.email,
		billingMobile: user?.phone_number,
		amount: price,
	});






	useEffect(() => {
		setBillingDetail((prevState: any) => {
			return ({
				...prevState,
				billingName: user?.display_mame,
				billingEmail: user?.email,
				amount: price,
			});
		});
	}, [user, item, price, setBillingDetail]);


	useEffect(() => {
		if (bookID?.bookingId) {
			navigation.navigate('SuccessBookings', { userId: uid, doctorId: item?.doctorId, item: item, bookingId: bookID?.bookingId, user: user });
		}
	}, [bookID?.bookingId])


	const onSubmit = async () => {
		setIsLoading(true);
		try {
			const url = `${baseUrl}/bookDoctorAppointment/${uid}/${item?.uid}`;
			const response: any = await axios.post(url, input, {
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.status !== 200) {

				setIsLoading(false);
				Alert.alert("Failed to create booking");
				return;
			}

			setIsLoading(false);
			if (response.data.status === "unavailable") {

				Alert.alert(
					"Slot Unavailable",
					"Please go back and select another slot",
					[
						{ text: "Back", onPress: () => navigation.goBack() },
					],
					{ cancelable: false }
				);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			} else {
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
				setBookID(response.data)

			}
		} catch (error: any) {
			Alert.alert(error.message);
			// toastRef.current.error(error.message);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			setIsLoading(false);
		}
	};

	const handleDoctorAvailability = async () => {
		setIsLoading(true);

		try {
			// Ensure the bookingDate exists in the input before processing
			if (!input?.bookingDate) {
				throw new Error("Booking date is missing");
			}

			// Helper function to convert date string to the day of the week
			const getDayFromDate = (dateString: string) => {
				const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

				// Split the "09-Oct-24" format to extract day, month, and year
				const [day, month, year] = dateString.split('-');

				// Create a new Date object using the month, day, and year (assuming year is 2024)
				const dateObj = new Date(`${month} ${day}, 20${year}`);

				// Get the index of the day (0 = Sunday, 6 = Saturday)
				const dayIndex = dateObj.getDay();

				// Return the corresponding day name (e.g., "Monday", "Tuesday")
				return daysOfWeek[dayIndex];
			};

			// Convert the booking date to a day of the week
			const dayOfWeek = getDayFromDate(input.bookingDate);

			// Define the input payload for the request with the dynamic day of the week
			const requestBody = {
				doctorId: item?.doctorId || "",  // Use item?.doctorId or a default empty string
				day: dayOfWeek,                  // Dynamically calculated day from bookingDate
				slot: input?.slot || "",          // Use item?.slot or a default empty string
				availability: "available"        // Set availability to "available"
			};

			// Make the POST request to update doctor availability
			const url = `${baseUrl}/updateDoctorAvailability`;
			const response = await axios.post(url, requestBody, {
				headers: { 'Content-Type': 'application/json' },
			});

			// Check for non-200 response status and handle the error
			if (response.status !== 200) {
				setIsLoading(false);
				Alert.alert("Failed to create booking");
				return;
			}



			setIsLoading(false);

			// Handle slot unavailability based on response data
			if (response.data.status === "unavailable") {
				Alert.alert(
					"Slot Unavailable",
					"Please go back and select another slot",
					[
						{ text: "Back", onPress: () => navigation.goBack() },
					],
					{ cancelable: false }
				);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			} else {
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
				handleNext();  // Proceed to the next step or screen
			}
		} catch (error: any) {
			// Handle any errors that occur
			Alert.alert(error.message || 'An error occurred');
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			setIsLoading(false);
		}
	};






	const handleNext = () => {
		setPay(true)
		paystackWebViewRef?.current?.startTransaction();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};

	return (
		<RootSiblingParent>
			<Toast ref={toastRef} />
			<ScrollView style={styles.container}
				contentInsetAdjustmentBehavior="automatic">
				<View style={styles.topboxContainer}>
					{/*<View style={styles.topboxTextContainer} >
						<Text style={styles.topboxTextContainer_text_nett}>You will receive a confirmation mail </Text>
					</View>*/}

					<View style={styles.booked_text_nett}>
						<Text style={styles.topboxTextContainer_text_nett}>Booking Info</Text>
						<View style={styles.booked_text_container_main_two}>
							<View style={{flexDirection: "row", marginTop: 10, marginLeft: 15}}>
								<CalenderIcon2 />
								<Text style={styles.bookeding_section_two}>Date and Time</Text>
							</View>
							<Text style={styles.booking_date_text}>{input?.bookingDate}</Text>
							<Text style={styles.booking_date_text}>{timeSlot(input)}</Text>
							<View style={{flexDirection: "row", marginTop: 10, marginLeft: 15}}>
								<SwitchIcon />
								<Text style={styles.bookeding_section_two}>Communication Channel</Text>
							</View>
							<Text style={styles.booking_date_text}>{input?.bookingChannel}</Text>
							{/*<View style={styles.topboxInnerContainer_details}>
								<View style={styles.bookeding_section_text_container}>
									<View style={styles.topboxInnerContainer}>
										<Text style={styles.bookeding_section_text_two_sub}>Time Slot : </Text>
										<Text style={styles.bookeding_section_text_two_sub}>{timeSlot(input)}</Text>
									</View>
								</View>
								<View style={styles.topboxInnerContainer}>
									<Text style={styles.bookeding_section_text_two_sub}>Booking Channel : </Text>
									<Text style={styles.bookeding_section_text_two_sub}>{input?.bookingChannel}</Text>
								</View>
								<View style={styles.topboxInnerContainer}>
									<Text>Booking Date :</Text>
									<Text>{input?.bookingDate}</Text>
								</View>
							</View>*/}
						</View>
						<Text style={styles.topboxTextContainer_text_nett}>Doctor Info</Text>
						<View style={styles.doctor_info_container}>
							<View style={styles.booked_text_container}>
								{!item?.photo_url ? <FontAwesome6 name="user-doctor" size={24} color="black" /> 
								: <Image
									style={styles.image}		// @ts-ignore 
									source={{ uri: item?.photo_url }}
								/>}
							</View>
							<View style={{flexDirection: "column"}}>
								<Text style={styles.bookeding_text}>{item?.first_name} {item?.last_name}</Text>
								<Text style={styles.bookeding_text_two}>{item?.specialization}</Text>
								<Text style={styles.bookeding_text_two}>{item?.hospital}</Text>
							</View>
						</View>
						<Text style={styles.topboxTextContainer_text_nett}>Payment Info</Text>
						<View style={styles.payment_info_box_container}>
							<View style={{flexDirection: 'row', margin: 14, justifyContent: 'space-between', alignItems: "center"}}>
								<Text style={styles.consultation_text}>Consultation Fee</Text>
								<Text style={styles.consultation_fee}>₦{pricing[0]?.pricing}</Text>
							</View>
						</View>
						{/*<View style={styles?.booked_text_container_main_two}>
							<Text style={styles?.bookeding_section_text_two_sub}>Booking Channel</Text>

							<Text style={styles?.bookeding_section_two}>{input?.bookingChannel === "Online" ? "Online" : "Physical appointment"}</Text>
							<View style={styles?.bookeding_section_text_container}>
								<Text style={styles?.bookeding_section_text_two_sub}>Hospital</Text>
							</View>
							<Text style={styles?.bookeding_text_two}>{item?.hospital}</Text>
						</View>*/}
					</View>
				</View>

				<Paystack
					amount={billingDetail?.amount as number}
					billingEmail={billingDetail?.billingEmail as string}
					billingName={billingDetail?.billingName as string}
					phone={billingDetail?.billingMobile} // Changed billingMobile to phone
					activityIndicatorColor={colors?.accent_green}
					paystackKey="pk_test_ef4c125c1c19ff96aabef9d613d5b49b1c83718b"
					refNumber={refNumber}
					onCancel={(e: any) => {
						toastRef.current.error("Transaction Cancelled!");
						Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
						setPay(false);
					}}
					onSuccess={(response: { [x: string]: any }) => {
						const responseObject = (response?.["transactionRef"] as any)?.["message"];
						if (responseObject === "Approved") {
							Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
							onSubmit()
							setPay(false);
						}
					}}
					metadata={{ paymentType: "Appointment" }}
					//@ts-ignore
					ref={paystackWebViewRef}
					uid={uid}
					doctorId={item?.doctorId}
				/>
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
			</ScrollView>
			<View style={styles.container_back_next}>
				<TouchableOpacity onPress={handleNext} style={styles.buttonContainer} >
					<Text style={styles.buttonText}>
						Proceed
					</Text>
				</TouchableOpacity>
			</View>
		</RootSiblingParent>
	);
}

export default BillingDetails



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

	container_back_next: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 20,
		paddingTop: 30,
		paddingBottom: 50,
		position: "absolute",
		bottom: 0,
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "rgba(31, 31, 31, 0.08)",
		height: 40,
		zIndex: 100
	},

	buttonText: {
		fontStyle: 'normal',
		fontFamily: 'Inter-Medium',
		fontWeight: '500',
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: 0.005,
		color: '#FFFFFF',
	},

	buttonContainer: {
		width: 380,
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


	topboxInnerContainer_details: {
		flexDirection: "column",
		gap: 10,
		color: colors.black,
		fontSize: 14,
		fontFamily: "Poppins-Bold",
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
	bookeding_section_two_color_container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.accent_green_light,
		paddingVertical: 5,
		paddingHorizontal: 10,
		width: 120,
		marginTop: 20,
		borderRadius: 20,
		borderWidth: 0.2,
		borderColor: colors.border_color,
	},
	bookeding_section_two: {
		color: colors.black,
		fontSize: 12,
		fontFamily: "Inter-Medium",
		fontWeight: '500',
		margin: 5,
		marginHorizontal: 10
	},

	booking_date_text: {
		fontSize: 12,
		fontWeight: '400',
		fontFamily: "Inter-Regular",
		color: "#646464",
		marginHorizontal: 50,
		marginBottom: 5
	},

	bookeding_text_two: {
		color: "#646464",
		fontSize: 12,
		fontFamily: "Inter-Reguler",
		fontWeight: "400",
		marginTop: 5,
	},

	payment_info_box_container: {
		height: 52,
		backgroundColor: "#FCFCFC",
		borderWidth: 0.5,
		borderRadius: 12,
		borderColor: "#D5D5D5",
		marginBottom: 20,
		//alignItems: "center",
		//justifyContent: "center"
	},

	consultation_text: {
		fontSize: 12,
		fontWeight: '400',
		fontFamily: 'Inter-Regular',
		color: "#171717"
	},

	consultation_fee: {
		fontSize: 14,
		fontWeight: '500',
		fontFamily: 'Inter-Medium',
		color: colors.black,
		lineHeight: 20
	},

	bookeding_section_text_two_sub: {
		color: colors.black,
		fontSize: 12.5,
		fontFamily: "Inter-Reguler",
	},
	bookeding_section_text_two: {
		color: colors.black,
		fontSize: 12.5,
		fontFamily: "Inter-Regular",
		marginTop: 20,
	},
	bookeding_text: {
		color: "#363636",
		fontSize: 12,
		fontFamily: "Inter-Medium",
		fontWeight: '500',
		marginTop: 18
	},

	booked_text_container_main_two: {
		height: 158,
		backgroundColor: "#FCFCFC",
		//marginTop: 25,
		borderRadius: 12,
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		marginBottom: 25,
	},
	booked_text_container_main: {
		flexDirection: 'row',
		// alignItems: 'center',
		gap: 10,
		marginTop: 40,
		borderBottomWidth: 0.4,
		borderBottomColor: colors.smail_text_color,
		paddingBottom: 30,
	},

	doctor_info_container: {
		width: "100%",
		height: 100,
		backgroundColor: "#FCFCFC",
		borderRadius: 12,
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		flexDirection: "row",
		marginBottom: 15
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
		margin: 15,
		marginRight: 5
	},

	image: {
		width: 34,
		height: 34,
		borderRadius: 50,
	},

	booked_text_nett: {
		//marginTop: 10,
		marginHorizontal: 20,
	},

	topboxTextContainer_text_nett: {
		color: colors.black,
		fontSize: 14,
		fontFamily: "Inter-Regular",
		fontWeight: '500',
		marginTop: 10,
		marginBottom: 15
	},




	booking_text_container_main: {
		marginTop: 40,
	},



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
		width: "100%",
		//gap: 2,
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


	container: {
		flexGrow: 1,
		backgroundColor: colors.white,
		padding: 10,
	},


	input: {
		borderColor: "black",
		borderWidth: 2,
		padding: 10,
		marginTop: 15,
	},
});

