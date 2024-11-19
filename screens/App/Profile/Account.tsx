import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../../css/colorsIndex'
import { SmallVerify } from '../../../assets/svg/SmailVerify'
import * as Haptics from 'expo-haptics';
import { login, logoutUser } from '../../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { useNavigation } from '@react-navigation/native';
import { ProfileColorImage } from '../../../assets/svg/Profile_color_image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserCircle } from '../../../assets/svg/UserCircle';
import { Medical } from '../../../assets/svg/Medical';
import { AngleRight } from '../../../assets/svg/AngleRight';
import { Creditcard } from '../../../assets/svg/CreditCard';
import { Activity } from '../../../assets/svg/Activity';
import { Logout } from '../../../assets/svg/Logout';
import { Infocirlceo } from '../../../assets/svg/Infocirlceo';
export const width = Dimensions.get("window").width - 300;
export const Height = Dimensions.get("window").height - 410


const Account = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state: any) => state.auth);
	useEffect(() => {
		dispatch(login());
	}, [dispatch]); // Only dispatch is a dependency


	const navigation: any = useNavigation();
	// Function to handle logout
	const handleLogout = async () => {
		try {
			await AsyncStorage.clear();
			// Call the logoutUser action and trigger any additional logout functionality
			dispatch(logoutUser());
			// Provide haptic feedback for logout
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
			// Navigate to the login screen or any other appropriate screen 
		} catch (error) {
		}
	};

	return (
		<ScrollView style={styles.container}>
			<ProfileColorImage />
			<View style={styles.top_container_main}>
				<View style={styles.top_nav_container}>
					<Text style={styles.top_nav_title}>Profile</Text>
				</View>
				<View style={styles.top_container}>
					<View style={styles.top_container_sub}>
						<View style={styles.top_container_img}>
							<View style={styles.top_container_img_sub}>
								<View style={styles.top_container_img_circle}>
									{!user?.photo_url ? (
										<UserCircle />
									) : (
										<Image style={styles.image} source={{ uri: user?.photo_url }} />
									)}
								</View>
								<View>
									<Text style={styles.profile_text1}>
										{!user?.display_name ? "N/A" : `${user?.display_name}`}
									</Text>
									<Text style={styles.profile_text2}>
										{!user?.email ? "N/A" : user?.email}
									</Text>
								</View>
							</View>
							<View style={styles.profile_text_img}>
								<SmallVerify />
							</View>
						</View>
						<TouchableOpacity style={styles.profile_text_img_btn} onPress={() => navigation.navigate("EditAccount")}>
							<Text style={styles.profile_text_img_btn_text}>Profile Info</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			{/* List section */}
			<View style={styles.logput_container_main}>
				<View>
					<TouchableOpacity style={styles.list_item_container} onPress={() => navigation.navigate("Medicalinfo")}>
						<View style={styles.list_item_image_container}>
							<Medical />
							<Text>Medical Information</Text>
						</View>
						<AngleRight />
					</TouchableOpacity>
					<TouchableOpacity style={styles.list_item_container} onPress={() => navigation.navigate("PaymentHistory")}>
						<View style={styles.list_item_image_container}>
							<Creditcard />
							<Text>Payment History</Text>
						</View>
						<AngleRight />
					</TouchableOpacity>
					<TouchableOpacity style={styles.list_item_container} onPress={() => navigation.navigate("VitalsHistory")}>
						<View style={styles.list_item_image_container}>
							<Activity />
							<Text>Vitals History</Text>
						</View>
						<AngleRight />
					</TouchableOpacity>
					<TouchableOpacity style={styles.list_item_container} onPress={() => navigation.navigate("AboutUs")}>
						<View style={styles.list_item_image_container}>
							<Infocirlceo />
							<Text>About Us</Text>
						</View>
						<AngleRight />
					</TouchableOpacity>

				</View>
				<TouchableOpacity style={styles.logout_container} onPress={handleLogout}>

					<Logout />
					<Text style={styles.logout_container_text}>Logout</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default Account;


const styles = StyleSheet.create({
	image: {
		width: 43,
		height: 43,
		borderRadius: 50,
	},

	top_nav_title: {
		color: colors.black,
		fontSize: 16,
		fontFamily: "Inter_500Medium",
		textAlign: "center"
	},

	logout_container_text: {
		color: colors.white,
		fontSize: 16,
		marginLeft: 10,
		fontFamily: "Inter_500Medium",
	},

	logput_container_main: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 10,
		position: "relative",
		// height: Height,
		zIndex: 99999,
	},

	logout_container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		width: '100%',
		backgroundColor: colors.red,
		borderRadius: 50,
		paddingHorizontal: 10,
		marginTop: 20,
	},





	list_item_image_container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
		gap: 12,
	},

	list_item_container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		marginBottom: 10,
		borderBottomWidth: 0.3,
		borderBottomColor: colors.smail_text_color,
		justifyContent: 'space-between',
	},

	profile_text_img_btn_text: {
		color: colors.white,
		fontSize: 15,
		fontFamily: "Inter_500Medium",
	},

	profile_text_img_btn: {
		backgroundColor: colors.accent_green,
		borderRadius: 5,
		padding: 8,
		marginHorizontal: 20,
		marginTop: 45,
		width: "100%",
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},

	profile_text_img: {
		width: 20,
		height: 20,
		marginRight: 30,
	},

	profile_text1: {
		color: colors.black,
		fontSize: 14,
		fontFamily: "Inter-Regularr"
	},

	profile_text2: {
		color: colors.smail_text_color,
		fontSize: 13,
		fontFamily: "Inter-Regularr"
	},


	top_container_img_circle: {
		width: 47.42,
		height: 49.68,
		borderRadius: 50,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: colors.accent_green,
		padding: 1,
	},

	top_container_img_sub: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	top_container_img: {
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	top_container_main: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		marginTop: 40,
	},
	top_container_sub: {

		padding: 10,
		width: '100%',
		// maxWidth: 350,
		height: 150,
		backgroundColor: colors.white,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	top_container: {
		marginHorizontal: 10,
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'center',
	},
	top_nav_container: {
		marginTop: 20,
		marginBottom: 40,
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flexGrow: 1,
		backgroundColor: colors.white,
		position: 'relative',
	},
});



