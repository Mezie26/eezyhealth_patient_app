import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../../css/colorsIndex';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { getDoctorsCollection } from '../../../hooks/getDoctors';
import { getSpecializationCollection } from '../../../hooks/getSpecialization';
import { getDoctorsBySpecialization } from '../../../hooks/getDoctorsBySpecialization';
import Toast from '../../../components/Toast';
//import { TextInput } from 'react-native-paper';
import Rating from '../../../components/Rating';
import { Doctor } from '../../../assets/svg/Doctor';
import { Locations } from '../../../assets/svg/Location';
import { DotIcon } from '@/assets/svg/DotIcon';
import { FontAwesome6 } from '@expo/vector-icons';
import { Search } from '@/assets/svg/Search';


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


	const handlePress1 = (item: any) => {
		navigation.navigate('BookingAppointment', { item: item });
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
	};

	const handlePress2 = (item: any) => {
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
				//console.log(data)
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
				//console.log("item--item", JSON.stringify(data, null, 2))
			})
			.catch(error => {
				toastRef.current.error(error.message);
				Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
				setIsLoadingd(false);
			});
	}





	const renderItem = ({ item }: { item: any }) => {
		const isSelected = item.name === selectedItem;
		return (
		<TouchableOpacity
			style={[styles.specialist_list_container, isSelected && styles.selectedItem]}
			onPress={() => {
				setSelectedItem(item?.name); // Update the state with the selected item
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
				handleSearchedFeedback(item?.name)
				//console.log(item)
			}}
		>
			<Text style={[styles.specialist_text, isSelected && styles.selectedItemText]}>{item?.name}</Text>
		</TouchableOpacity>
	)};

	const renderItems = ({ item }: any) => (
		<View style={styles.no_appointments_container_three_sub} key={item}>
			<View style={styles.no_appointments_star}>
				<View style={{flexDirection: "row"}}>
					{!item?.photo_url ? (
						<FontAwesome6 name="user-doctor" size={45} style={{marginLeft: 10}}  color={colors.smail_text_color} />
					) : (
						<Image
						source={{ uri: item?.photo_url }}
						style={styles.top_container_img_doctor}
						resizeMode="cover"
					/>
					)}
					<View style={styles.doctors_details_text_container}>
							<Text style={styles.access_card_img_text_one}>Dr {item?.first_name} {item?.last_name}</Text>
							<View style={{flexDirection: "row"}}>
								<Text style={styles.access_card_img_text_two}>{item?.specialization}</Text>
								<View style={{marginTop: 10}}>
									<DotIcon />
								</View>
								<Text style={styles.access_card_img_text_two}>{item?.experience_yrs} Years Experience</Text>
							</View>
							<View style={styles.access_card_img_text_three_container}>
								<View style={{marginTop: 5, marginLeft: 7}}>
									<Locations color="#222222"/>
								</View>
								<Text style={styles.access_card_img_text_three}>{item?.hospital}</Text>
							</View>
					</View>
				</View>
				<View style={{alignItems: "flex-end", marginHorizontal: 10}}>
					<Rating rating={item?.rating || 0} />
				</View>
			</View>
			<View style={styles.no_appointments_star_flex_two}>
				{/*<View style={styles.no_appointments_star_doctor}>
					<View style={styles.container_active_doctor}>
						<View style={styles.container_active_doctor_color_one}>
							<View style={styles.container_active_doctor_color_two}>
							</View>
						</View>
						<View>
							<Text style={styles.container_active_doctor_text}>Active</Text>
						</View>
					</View>
				</View>*/}
				<TouchableOpacity style={styles.top_container_img_doctor_container1} onPress={() => handlePress1(item)}>
					<Text style={styles.top_container_img_doctor_container_text1}>Book Appointment</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.top_container_img_doctor_container2} onPress={() => handlePress2(item)}>
					<Text style={styles.top_container_img_doctor_container_text2}>View Doctor</Text>
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
					{/*<TextInput
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
					/>*/}
					<Search />
					<TextInput 
					value={result}
					onChangeText={handleSpecializationChange}
					style={styles.inputBoxText}
					placeholder='Find a Doctor'
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
				<Text style={styles.list_of_doctors_heading}>List of Doctors</Text>
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
		backgroundColor: "#FCFCFC",
		fontFamily: "Inter-Regular",
		fontSize: 14,
		height: 50,
		borderRadius: 10,
		marginHorizontal: 10
	},
	specialist_text: {
		color: "#363636",
		textAlign: "center",
		fontSize: 14,
		fontWeight: '400',
		fontFamily: "Inter-Regular"

	},
	specialist_list_container: {
		width: 158,
		height: 48,
		backgroundColor: colors.white,
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		marginBottom: 25
	},

	selectedItem: {
		backgroundColor: "#FCFCFC", // Change color when selected
		borderColor: "#44CE2D"
	  },

	selectedItemText: {
		color: "#44CE2D"
	},

	specialist_container_list: {
		flexDirection: "row",
		gap: 20,
		marginBottom: 5,
		marginHorizontal: 10
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

	list_of_doctors_heading: {
		fontSize: 14,
		fontFamily: "Inter-Regular",
		fontWeight: "500",
		color: "#171717",
		marginHorizontal: 20,
		marginVertical: 15,
		marginTop: 7
	},

	doctors_details_text_container: {
		//flexDirection: 'column',
		//marginHorizontal: 10
	},
	// Start card styles
	access_card_img_text_three: {
		color: "#646464",
		fontSize: 10,
		fontFamily: 'Inter-Regular',
		fontWeight: "400",
		marginTop: 6
	},

	access_card_img_text_two: {
		color: "#363636",
		fontSize: 12,
		fontFamily: 'Inter-Regular',
		//marginBottom: 5,
		fontWeight: "400",
		marginHorizontal: 10,
		marginTop: 5
	},
	access_card_img_text_three_container: {
		flexDirection: "row",
		//alignItems: "center",
		//gap: 5,
		marginTop: 5
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
		width: 40,
		height: 40,
		borderRadius: 64,
		marginLeft: 10
	},
	top_container_img_doctor_container_text2: {
		color: "#44CE2D",
		fontSize: 14,
		fontWeight: 500,
		fontFamily: "Inter-Regular"
	},

	top_container_img_doctor_container2: {
		width: 162,
		height: 40,
		borderRadius: 12,
		borderWidth: 0.5,
		borderColor: "#44CE2D",
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		margin: 10
	},

	top_container_img_doctor_container_text1: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: 500,
		fontFamily: "Inter-Regular"
	},

	top_container_img_doctor_container1: {
		width: 162,
		height: 40,
		borderRadius: 12,
		backgroundColor: "#44CE2D",
		justifyContent: "center",
		alignItems: "center",
		margin: 10
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
		fontSize: 14,
		fontWeight: '500',
		fontFamily: 'Inter-Regular',
		marginHorizontal: 10,
		//marginVertical: 5
		//marginBottom: 5,
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
		height: 158,
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderRadius: 12,
		backgroundColor: "#F9FAFB",
		//flexDirection: 'row',
		//justifyContent: "space-between",
		marginBottom: 20,
		//borderWidth: 1,
		//borderColor: colors.grayColor,
	},
	no_appointments_star_doctor: {
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},

	no_appointments_star_flex_two: {
		flexDirection: 'row',
		//alignItems: 'center',
		//justifyContent: 'center',
	},

	no_appointments_star_flex: {
		//flexDirection: "row",
		//alignItems: 'center',
	},

	no_appointments_star: {
		flexDirection: 'row',
		justifyContent: "space-between",
		//alignItems: "flex-end"

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
		//marginTop: 10,
		marginHorizontal: 20,
	},


	searchContainer: {
		height: 40,
		backgroundColor: "#FCFCFC",
		borderRadius: 12,
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		flexDirection: 'row',
		//justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
		marginBottom: 20,
		marginTop: 30,
		marginHorizontal: 20
	},

	inputBoxText: {
		fontSize: 14,
		fontWeight: 400,
		fontFamily: "Inter-Regular",
		color: "#171717",
		paddingHorizontal: 10,
		width: 350
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
		backgroundColor: colors.background,
	}
})


