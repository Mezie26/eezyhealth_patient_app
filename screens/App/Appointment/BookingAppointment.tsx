import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../../css/colorsIndex'
import * as Haptics from 'expo-haptics';
import { useNavigation, useRoute } from '@react-navigation/native';
import TimeSlot from './TimeSlot';
import ESelectDropdown from '../../../components/Input/SelectDropdown';
import Toast from '../../../components/Toast';
import moment from 'moment';
import BottomButton from '../../../components/BottomButton';
import { ChevronDown } from '../../../assets/svg/ChevronDown';
import { ChevronUp } from '../../../assets/svg/ChevronUp';

const BookingAppointment = () => {
	const toastRef: any = useRef(null);
	const [selectedButtonIndex, setSelectedButtonIndex] = useState<any>(-1);
	const [selectedDate, setSelectedDate] = useState<any>(new Date());
	const [bookingChannel, setBookingChannel] = useState("");
	const [bookingSlot, setBookingSlot] = useState("");
	const [day, setDay] = useState("");
	const navigation: any = useNavigation();
	const route = useRoute();
	// @ts-ignore
	const { item, user, pricing } = route.params;
	const [input, setInput] = useState<any>({
		bookingChannel: "",
		bookingDate: "",
		slot: "",
	});

	useEffect(() => {
		setInput((prevState: any) => ({
			...prevState,
			bookingChannel: bookingChannel,
			bookingDate: moment(selectedDate)?.format("DD-MMM-YY"),
			slot: bookingSlot,
		}));
	}, [bookingChannel, selectedDate, bookingSlot]);

	useEffect(() => {
		const currentDay = moment(selectedDate).format('dddd');
		setDay(currentDay);
	}, [selectedDate]);

	const getAvailableSlots = (day: string | number) => {
		const slots = item?.availability[day];
		const availableSlots: any = [];

		if (slots) {
			Object.keys(slots).forEach(slot => {
				if (slots[slot] === "available") { availableSlots.push(slot); }
			});
		}

		return availableSlots;
	};

	const [isActive, setIsActive] = useState<boolean>(true);

	const toggleSection = () => {
		setIsActive(!isActive);
	};

	const availableSlots = getAvailableSlots(day);

	const renderContent = () => {
		return (
			<View style={styles.content}>
				{availableSlots?.length > 0 ? (
					availableSlots.map((slot: any, index: any) => {
						const formattedItem = slot.replace('_', ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
						const isSelected = selectedButtonIndex === index;

						const itemStyle: any = {
							backgroundColor: isSelected ? colors.accent_green : colors.accent_green_light,
						};

						return (
							<TouchableOpacity
								key={index}
								style={[styles.specialist_list_container, itemStyle]}
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

	const onSubmit = async () => {
		const { bookingChannel, bookingDate, slot } = input;
		let missingFields = [];

		if (!bookingChannel) missingFields.push("Booking Channel");
		if (!bookingDate) missingFields.push("Booking Date");
		if (!slot) missingFields.push("Slot");

		if (missingFields.length > 0) {
			Alert.alert("Missing Fields", `Please fill in the following fields: ${missingFields.join(", ")}`);
			return;
		}

		navigation.navigate('BillingDetails', { item, input, user, load: false, pricing });
	};

	return (
		<View style={styles.container}>
			<Toast ref={toastRef} />
			<ScrollView contentContainerStyle={styles.scrollViewContent} contentInsetAdjustmentBehavior="automatic">
				<View style={styles.info_text_container_main}>
					<View style={styles.info_text_container}>
						<Text style={styles.info_text_information_one}>Book Appointment</Text>
						<Text style={styles.info_text_information_text}>Select a suitable date and time slot below.</Text>
						<Text style={styles.info_text_information_text}>Appointment Price - ₦{pricing[0]?.pricing}</Text>
					</View>

					<View style={styles.info_text_container}>
						<Text style={styles.info_text_information_one}>Select a Channel</Text>
						<View style={styles.info_text_container_timeSlot}>
							<ESelectDropdown setBookingChannel={setBookingChannel} />
						</View>
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
						{isActive && renderContent()}
					</View>
				</View>
			</ScrollView>
			{/* <View style={styles.container_back_next}>
				<TouchableOpacity onPress={onSubmit} style={styles.buttonContainer}>
					<Text style={styles.buttonText}>
						Book Appointment
					</Text>
				</TouchableOpacity>
			</View> */}
			<BottomButton onPress={onSubmit} text={"Book Appointment"} />
		</View>
	);
};

export default BookingAppointment;

const styles = StyleSheet.create({


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
		fontFamily: "Inter_500Medium",
		marginTop: 20,
		// marginBottom: 10,
	},
	info_text_information_one: {
		color: colors.smail_text_color,
		fontSize: 14,
		fontFamily: "Inter_500Medium",
		marginBottom: 10,
	},
	info_text_information_one_main: {
		color: colors.smail_text_color,
		fontSize: 14,
		fontFamily: "Inter_500Medium",
		// marginBottom: 10,
		marginTop: 40,

	},
	info_text_information_text: {
		color: colors.black,
		fontSize: 14,
		fontFamily: "Inter_300Light",
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




	scrollViewContent: {
		padding: 20,
		paddingBottom: 120,
	},



	container: {
		position: "relative",
		flexGrow: 1,
		backgroundColor: colors.white,

	},
})