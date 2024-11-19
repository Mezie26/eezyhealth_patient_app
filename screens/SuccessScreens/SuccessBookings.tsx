import * as Haptics from 'expo-haptics';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../css/colorsIndex'
import { SuccessIcon } from '../../assets/svg/SuccessIcon'
import { useNavigation, useRoute } from '@react-navigation/native'
import { baseUrl } from '../../shared/baseUrl';
import { ProgressBar } from 'react-native-paper';
import Toast from '../../components/Toast';

const SuccessBookings = () => {
	const toastRef: any = useRef(null);
	const route = useRoute();
	// @ts-ignore
	const { userId, doctorId, bookingId, user } = route.params;
	const navigation: any = useNavigation();
	const [isLoading, setIsLoading] = useState(false);



	const handleBack = () => {
		navigation.navigate('Home', { load: true });
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
	};
	const [rating, setRating] = useState(0);
	const [input, setInput] = useState<any>({
		doctorId: '',
		rating: '',
		userId: ''
	});
	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				doctorId: doctorId,
				userId: userId,
			});
		});
	}, [doctorId, rating, userId]);

	const handleVitalsLogging = (item: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		navigation.navigate('VitalsLogging', { booking: item, doctorId: doctorId, userId: userId, bookingId: bookingId, user: user });
	};


	const onSubmit = async () => {
		setIsLoading(true);
		try {
			const url = baseUrl + `/rateDoctor/${userId}/${doctorId}`;

			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(input),
			});

			if (!response.ok) {
				setIsLoading(false);
				// throw new Error('Network response was not ok');
			}
			toastRef.current.success('Rating Created!');
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			setTimeout(() => {
				handleBack()
			}, 2000);
			setIsLoading(false);
		} catch (error: any) {
			toastRef.current.error(error.message);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			setIsLoading(false);
		}
	};


	return (
		<SafeAreaView style={styles.container}>
			<Toast ref={toastRef} />
			{isLoading && <ProgressBar progress={0.3} color={colors.accent_green} indeterminate={isLoading} />}
			<View style={styles.container_main}>
				<SuccessIcon />
				<View style={styles.container_main_text_container}>
					<Text>Successful</Text>
					<Text style={styles.container_main_text}>Appointment Booked Successfully!</Text>
					{/* <RatingComponent
						userId={userId}
						doctorId={doctorId}
						maxStars={5}
						imageSize={40}
						setRating={setRating}
						rating={rating}
					/> */}
					<View style={styles.container_main_text_view}>
						<TouchableOpacity style={styles.okay_btn} onPress={handleVitalsLogging}>
							<Text style={styles.login_account_text2} >Enter Vitals</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.okay_btn} onPress={handleBack}>
							<Text style={styles.login_account_text2} >Okay</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View >
		</SafeAreaView>
	)
}

export default SuccessBookings

const styles = StyleSheet.create({

	container_main_text_view: {
		flexDirection: "row",
		gap: 20,
	},
	login_account_text2: {
		color: colors.white,
		fontSize: 16,
		fontFamily: "Inter-Regular",

	},

	okay_btn: {
		// width: 103,
		height: 40,
		backgroundColor: colors.accent_green,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginTop: 80,
		paddingHorizontal: 15,
	},

	container_main_text_container: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
	},

	container_main_text: {
		color: colors.smail_text_color,
		fontFamily: "Inter-Regular",
		fontSize: 14,
	},

	container_main: {
		marginHorizontal: 30,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: "center",
		margin: "auto",
		width: "100%",
		height: "100%",
	},

	container: {
		flexGrow: 1,
		backgroundColor: colors.white,
	},
})
