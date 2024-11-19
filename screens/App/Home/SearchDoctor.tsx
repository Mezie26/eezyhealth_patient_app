import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { getDoctorsCollection } from '../../../hooks/getDoctors';
import { getSpecializationCollection } from '../../../hooks/getSpecialization';
import { getDoctorsBySpecialization } from '../../../hooks/getDoctorsBySpecialization';
import Toast from '../../../components/Toast';
import { TextInput } from 'react-native-paper';
import Rating from '../../../components/Rating';
import { Doctor } from '../../../assets/svg/Doctor';
import { Locations } from '../../../assets/svg/Location';


const SearchDoctor = () => {
	const toastRef: any = useRef(null);
	const navigation: any = useNavigation();
	const [specialization, setSpecialization] = useState({});
	const [result, setResult] = useState('');
	const [selectedItem, setSelectedItem] = useState('');
	const [doctors, setDoctors] = useState<any>([]);
	const [isLoadingd, setIsLoadingd] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const route = useRoute();
	// @ts-ignore
	const { search } = route?.params || {}




	const handlePress = (item: any) => {
		navigation.navigate('DoctorProfile', { item: item });
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};


	const handleSpecializationChange = (text: any) => {
		setResult(text)
	};

	const filteredDoctors = doctors?.filter((doctor: { specialization: string; }) =>
		doctor?.specialization?.toLowerCase().includes(result?.toLowerCase())
	);



	useEffect(() => {
		setIsLoading(true);
		getSpecializationCollection()
			.then(data => {
				setSpecialization(data); // Process the specialization data here
				setIsLoading(false);
			})
			.catch(error => {
				toastRef.current.error(error);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		setIsLoadingd(true);
		getDoctorsCollection()
			.then(data => {
				setDoctors(data); // Process the Doctors data here
				setIsLoadingd(false);
			})
			.catch(error => {
				toastRef.current.error(error);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
				setIsLoadingd(false);
			});
	}, []);

	useEffect(() => {
		if (search !== undefined) {
			setIsLoadingd(true);
			getDoctorsBySpecialization({ specialization: search })
				.then(data => {
					setDoctors(data); // Process the Doctors data here
					setIsLoadingd(false);
				})
				.catch(error => {
					toastRef.current.error(error.message);
					Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
					setIsLoadingd(false);
				});
		}

	}, []);




	const handleSearchedFeedback = (selectedItem: any) => {
		setIsLoadingd(true);
		getDoctorsBySpecialization({ specialization: selectedItem })
			.then(data => {
				setDoctors(data); // Process the Doctors data here
				setIsLoadingd(false);
			})
			.catch(error => {
				toastRef.current.error(error.message);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
				setIsLoadingd(false);
			});
	}





	const renderItem = ({ item }: { item: any }) => (
		<TouchableOpacity
			style={styles.specialist_list_container}
			onPress={() => {
				setSelectedItem(item?.name); // Update the state with the selected item
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
				handleSearchedFeedback(item?.name)
			}}
		>
			<Text style={styles.specialist_text}>{item?.name}</Text>
		</TouchableOpacity>
	);

	const renderItems = ({ item }: any) => (
		<View style={styles.no_appointments_container_three_sub} key={item}>
			<View style={styles.no_appointments_star}>
				<View style={styles.access_card_img_text_dr}>
					<Text style={styles.access_card_img_text_one}>{item?.first_name}</Text>
					<View style={styles.access_card_img_text_three_container}>
						<Locations />
						<Text style={styles.access_card_img_text_three}>{item?.location}</Text>
					</View>
					<Text style={styles.access_card_img_text_two}>{item?.specialization}</Text>
				</View>
				<View style={styles.no_appointments_star_flex}>
					<Rating rating={item?.rating || 0} />
				</View>
			</View>
			<View style={styles.no_appointments_star_flex_two}>
				<View style={styles.no_appointments_star_doctor}>
					<View style={styles.container_active_doctor}>
						<View style={styles.container_active_doctor_color_one}>
							<View style={styles.container_active_doctor_color_two}>
							</View>
						</View>
						<View>
							<Text style={styles.container_active_doctor_text}>Active</Text>
						</View>
					</View>
					<Image
						source={{ uri: item?.photo_url }}
						style={styles.top_container_img_doctor}
						resizeMode="contain"
					/>
				</View>
				<TouchableOpacity style={styles.top_container_img_doctor_container} onPress={() => handlePress(item)}>
					<Text style={styles.top_container_img_doctor_container_text}>View Doctor</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
	return (
		<SafeAreaView style={styles.container}>
			<Toast ref={toastRef} />
			<View  >
				{/* <View style={styles.dashboard_titel_container}>
					<TouchableOpacity onPress={handleBack}>
						<MaterialIcons name="keyboard-backspace" size={24} color={colors.black} />
					</TouchableOpacity>
					<View>
						<Text style={styles.dashboard_profile_text_one}>Select a Doctor</Text>
					</View>
					<View style={styles.dashboard_calender_container_main}>
						<TouchableOpacity style={styles.dashboard_calender_container} onPress={handleAppointment}>
							<FontAwesome5 name="calendar-alt" size={16} color={colors.white} />
							<Text style={styles.dashboard_calender_text}>{!filteredBookings?.length ? 0 : filteredBookings?.length}</Text>
						</TouchableOpacity>
					</View>
				</View> */}

				<View style={styles.searchContainer}>
					<TextInput
						mode="outlined"
						label="Doctor, Health, issues, Location"
						style={styles.text_input}
						value={result}
						onChangeText={handleSpecializationChange}
						theme={{
							colors: { onSurfaceVariant: '#A7A9AC' },
							roundness: 14 // Specify the border radius here
						}}
						// {...rest}
						activeOutlineColor="#43CE2E"
						autoCapitalize="none"
						autoCorrect={false}
					/>
				</View>
				<View style={styles.specialist_container_list}>
					{isLoading ?
						<View style={styles.specialist_list_container_loader_two}>
							<ActivityIndicator color='black' size={20} />
						</View>
						:
						<FlatList
							// @ts-ignore 
							data={specialization}
							renderItem={renderItem}
							keyExtractor={(item, index) => index.toString()}
							horizontal={true}
							showsHorizontalScrollIndicator={true}
							contentContainerStyle={styles.flatListContent}
						/>}
				</View>
				<ScrollView>
					<View style={styles.no_appointments_container_three}>
						{!isLoading || filteredDoctors?.length > 0 && (
							<TouchableOpacity>
								<Text style={styles.no_appointments_container_three_text}>Active Doctors</Text>
							</TouchableOpacity>
						)}

						{isLoadingd ?
							<View style={styles.specialist_list_container_loader}>
								<ActivityIndicator color='black' size={20} />
							</View>
							: !filteredDoctors || filteredDoctors?.length === 0 ?
								<View style={styles.specialist_list_doctors_icons}>
									<Doctor />
									<Text> No Doctor with Specialization</Text>
								</View> :

								<FlatList
									// @ts-ignore 
									data={filteredDoctors}
									scrollEnabled={false}
									renderItem={renderItems}
									keyExtractor={(item, index) => index.toString()}
									contentContainerStyle={{ paddingBottom: 300 }}
								/>}
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

export default SearchDoctor

const styles = StyleSheet.create({
	text_input: {
		backgroundColor: "#F0F4F8",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		height: 50,
		borderRadius: 10,
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

	specialist_container_list: {
		flexDirection: "row",
		gap: 20,
		marginBottom: 10,
	},
	flatListContent: {
		gap: 10,
		marginLeft: 10,
	},
	specialist_list_doctors_icons: {
		flexDirection: "column",
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 100,
	},

	// Start card styles
	access_card_img_text_three: {
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Inter-Regular'
	},

	access_card_img_text_two: {
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Inter-Regular',
		marginBottom: 5,
	},
	access_card_img_text_three_container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
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
	top_container_img_doctor: {
		width: 80,
		height: 150,
		borderRadius: 10,
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



	access_card_img_text_one: {
		color: colors.black,
		fontSize: 12,
		fontFamily: 'Inter-Regular',
		marginBottom: 5,
	},
	container_active_doctor: {
		top: 10,
		position: 'absolute',
		flexDirection: 'row',
		right: 100,
		alignItems: 'center',
		gap: 5,
	},
	access_card_img_text_dr: {
		marginTop: 0,
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
	no_appointments_star_doctor: {
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},

	no_appointments_star_flex_two: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},

	no_appointments_star_flex: {
		flexDirection: "row",
		alignItems: 'center',
	},

	no_appointments_star: {
		flexDirection: 'column',
		justifyContent: 'space-between',

	},
	//End card styles

	specialist_list_container_loader_two: {
		height: 'auto',
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: "center",
		width: "100%"
	},
	specialist_list_container_loader: {
		height: 'auto',
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: "center",
		paddingVertical: 20,
		marginTop: 200,
	},

	no_appointments_container_three_text: {
		color: colors.black,
		fontSize: 16,
		marginBottom: 10,
	},

	no_appointments_container_three: {
		marginTop: 20,
		marginHorizontal: 10,
	},


	searchContainer: {
		marginHorizontal: 10,
		marginTop: 10,
		marginBottom: 10,
	},

	dashboard_calender_text: {
		color: colors.white,
		fontSize: 20,
		fontFamily: "Inter-Regular"
	},

	dashboard_calender_container: {
		width: 60,
		height: 25,
		justifyContent: 'center',
		borderRadius: 50,
		backgroundColor: colors.black,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},

	dashboard_calender_container_main: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	dashboard_profile_text_one: {
		color: colors.black,
		fontSize: 14,
		fontFamily: "Inter-Regular",
	},


	dashboard_titel_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 30,
		marginTop: 10,
		marginHorizontal: 10,
	},

	container: {
		flexGrow: 1,
		backgroundColor: "#F0F4F8",
	}
})


