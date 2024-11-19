import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import * as Haptics from 'expo-haptics';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from '../../../components/Toast';
import moment from 'moment';
import { colors } from '../../../css/colorsIndex';
import TimeSlot from './TimeSlot';
import { baseUrl } from '../../../shared/baseUrl';
import { ChevronDown } from '../../../assets/svg/ChevronDown';
import { ChevronUp } from '../../../assets/svg/ChevronUp';

const RescheduleBooking = () => {
	const toastRef: any = useRef(null);
	const [selectedButtonIndex, setSelectedButtonIndex] = useState<any>(-1);
	const [selectedDate, setSelectedDate] = useState<any>(new Date());
	const [bookingSlot, setBookingSlot] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [day, setDay] = useState("");
	const [isActive, setIsActive] = useState<boolean>(true);

	const toggleSection = () => {
		setIsActive(!isActive);
	};
	const navigation: any = useNavigation();
	const route = useRoute();
	// @ts-ignore
	const { item, user } = route.params;
	const [input, setInput] = useState<any>({
		newDate: "",
		slot: "",
	});



	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				newDate: moment(selectedDate).format('YYYY-MM-DD'),
				slot: bookingSlot,
			});
		});
	}, [selectedDate, bookingSlot]);

	useEffect(() => {
		// Get the current day
		const currentDay = moment(selectedDate).format('dddd');
		setDay(currentDay);
	}, [selectedDate]);

	const onSubmit = async () => {
		setIsLoading(true);
		const { newDate, slot } = input;
		let missingFields = [];

		if (!newDate) missingFields.push("Booking Date");
		if (!slot) missingFields.push("Slot");

		if (missingFields.length > 0) {
			setIsLoading(false);
			Alert.alert("Missing Fields", `Please fill in the following fields: ${missingFields.join(", ")}`);
			return;
		}
		const currentBookingDate = moment.unix(user?.bookingDate?.seconds).format('YYYY-MM-DD');
		// Check if the new date is the same as the current booking date
		if (input.newDate === currentBookingDate) {
			setIsLoading(false);
			Alert.alert("Error", "The new booking date cannot be the same as the current booking date.");
			return;
		}

		try {
			const url = `${baseUrl}/rescheduleBooking/${user?.bookingId}`;
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(input),
			});

			if (response.status !== 200) {
				setIsLoading(false);
				Alert.alert("Failed to create booking");
				return;
			}

			const data = await response.json();
			if (data.status === "unavailable") {
				Alert.alert(
					"Slot Unavailable",
					"Please go back and select another slot",
					[
						{ text: "Cancel", style: "cancel" },
						{ text: "Back", onPress: () => navigation.goBack() },
					],
					{ cancelable: false }
				);

				await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			} else {
				await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
				navigation.navigate('SuccessReschedule');
			}
		} catch (error: any) {
			Alert.alert('Error', error.message);
			await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		} finally {
			setIsLoading(false);
		}
	};

	const getAvailableSlots = (day: string | number) => {
		const slots = item?.doctor?.availability[day];
		const availableSlots: any = [];

		if (slots) {
			Object.keys(slots).forEach(slot => {
				if (slots[slot] === 'available') {
					availableSlots.push(slot);
				}
			});
		}

		return availableSlots;
	};

	const renderAvailableSlots = () => {
		const availableSlots = getAvailableSlots(day);

		return (
			<View style={styles.content}>
				{availableSlots?.length > 0 ? (
					availableSlots.map((slot: any, index: any) => {
						const formattedItem = slot.replace('_', ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
						const isSelected = selectedButtonIndex === index;

						const itemStyle: any = {
							backgroundColor: isSelected ? colors.accent_green : colors.accent_green_light,
							opacity: 1,
							pointerEvents: 'auto',
						};

						return (
							<TouchableOpacity
								key={index}
								style={[styles.specialist_list_container, { ...itemStyle, backgroundColor: isSelected ? colors.accent_green : itemStyle.backgroundColor, color: isSelected && colors.white }]}
								onPress={() => {
									setSelectedButtonIndex(index);
									Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
									setBookingSlot(slot);
								}}
							>
								<Text style={[styles.specialist_text, { color: isSelected ? colors.white : 'black' }]}>
									{formattedItem}
								</Text>
							</TouchableOpacity>
						);
					})
				) : (
					<Text>No Available Slots</Text>
				)}
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Toast ref={toastRef} />
			<ScrollView contentContainerStyle={styles.scrollViewContent} contentInsetAdjustmentBehavior="automatic">
				<View style={styles.info_text_container_main}>
					<View style={styles.info_text_container}>
						<Text style={styles.info_text_information_one}>Reschedule Appointment</Text>
						<Text style={styles.info_text_information_text}>Select a suitable date and time slot below.</Text>
						<Text style={styles.info_text_information_text}>Payment Status - <Text style={user?.paymentStatus === "Paid" ? styles.info_text_payed : styles.info_text_notpay}>Paid</Text></Text>
						{/* {user?.paymentStatus} */}
						<Text style={styles.info_text_information_text}>Previous Date - <Text>{moment.unix(user?.bookingDate?.seconds).format('YYYY-MM-DD')}</Text></Text>
					</View>

					<View>
						<Text style={styles.info_text_information_one_main}>Booking Date</Text>
						<TimeSlot setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
					</View>

					<View style={styles.info_text_container_availability}>
						<Text style={styles.info_text_information_one_main}>Available Slot</Text>
						<TouchableOpacity onPress={toggleSection} style={styles.header}>
							<Text style={styles.headerText}>{day}</Text>
							{isActive ? <ChevronDown /> : <ChevronUp />}
						</TouchableOpacity>
						{isActive && renderAvailableSlots()}
					</View>
				</View>
				{/* <ModalLoading isLoading={isLoading} /> */}
			</ScrollView>
			<View style={styles.container_back_next}>
				<TouchableOpacity onPress={onSubmit} style={styles.buttonContainer}>
					<Text style={styles.buttonText}>
						{isLoading ?
							<ActivityIndicator color='white' size={20} /> : "Proceed"}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

export default RescheduleBooking;

const styles = StyleSheet.create({
	scrollViewContent: {
		paddingHorizontal: 20,
		paddingTop: 30,
		paddingBottom: 120,
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
		width: 328,
		height: 40,
		padding: 10,
		backgroundColor: colors.accent_green,
		borderRadius: 90,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: colors.accent_green_light,
		shadowOffset: {
			width: 4,
			height: 8,
		}

	},
	info_text_payed: {
		color: colors.red,
		padding: 5,
		borderRadius: 5,
	},
	info_text_notpay: {
		color: colors.accent_green,
		padding: 5,
		borderRadius: 5,
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 18,
		letterSpacing: 0.005,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#f4f4f4',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	activeHeader: {
		backgroundColor: '#e2e2e2',
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	content: {
		padding: 20,
		backgroundColor: '#fff',
	},

	info_text_container_timeSlot: {
		flexDirection: 'column',
		gap: 30,
	},

	info_text_container_availability: {
		flexDirection: 'column',
		gap: 20,
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
		// width: 120, 
		height: 35,
		borderRadius: 20,
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		borderWidth: 1,
		borderColor: colors.grayColor,
		// shadowColor: "#000",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 2,
		// },
		// shadowOpacity: 0.1,
		// shadowRadius: 1,
		// elevation: 2, // for Android
	},




	info_text_container_main: {
		flexDirection: 'column',
		gap: 20,
		marginBottom: 50,
	},

	info_text_information: {
		color: colors.black,
		fontSize: 12,
		fontFamily: "Inter-Regular",
		marginTop: 20,
		// marginBottom: 10,
	},
	info_text_information_one: {
		color: colors.smail_text_color,
		fontSize: 14,
		fontFamily: "Inter-Regular",
		marginBottom: 10,
	},
	info_text_information_one_main: {
		color: colors.smail_text_color,
		fontSize: 14,
		fontFamily: "Inter-Regular",
		// marginBottom: 10,
		marginTop: 40,

	},
	info_text_information_text: {
		color: colors.black,
		fontSize: 14,
		fontFamily: "Inter-Regular",
		marginBottom: 10,
	},


	info_text_container: {
		marginTop: 20,
	},



	info_icons_text_two: {
		fontSize: 14,
		color: colors.smail_text_color,
		fontFamily: "Inter-Regular",
	},

	info_icons_text_one: {
		fontSize: 16,
		color: colors.black,
		fontFamily: "Inter-Regular",
	},




	container_scrollview: {
		padding: 20,
	},



	container: {
		flexGrow: 1,
		backgroundColor: colors.white,

	},
})



