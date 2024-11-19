import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FormInput from '../../../components/Input/FormInput';
import { colors } from '../../../css/colorsIndex';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateInput from '../../../components/Input/DateInput';
import BottomButton from '../../../components/BottomButton';
import * as Haptics from 'expo-haptics';
import { useRoute } from '@react-navigation/native';
import { saveVitalsData } from '../../../hooks/saveVitalsData';


const EnterVitals = ({ navigation }: any) => {
	const route = useRoute();
	// @ts-ignore
	const { booking } = route.params;
	const [isLoading, setIsLoading] = useState(false);
	const [input, setInput] = useState({
		temperature: '',
		pulse: '',
		bloodPressure: '',
		breathingRate: '',
		date: new Date().toLocaleDateString(),
		doctorId: '',
		userId: '',
		bookingId: '', // Extract only necessary field
	});


	useEffect(() => {
		setInput((prevState: any) => ({
			...prevState,
			doctorId: booking?.doctorId || '',
			userId: booking?.userId || '',
			bookingId: booking?.bookingId || '',
		}));
	}, [booking?.doctorId, booking?.userId, booking?.bookingId]);


	const handleLogVitals = async () => {
		setIsLoading(true);
		try {
			await saveVitalsData(input?.userId, input);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			navigation.navigate('Home', { load: true });
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	// Handle form input change
	const handleChange = (name: string, value: string) => {
		setInput({ ...input, [name]: value });
	};

	return (
		<View style={styles.scrollViewContainer}>
			<KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
				<View style={styles.FormInput}>
					<FormInput
						label="Temperature"
						placeholder="Body Temperature"
						value={input.temperature}
						onChangeText={(text: any) => handleChange('temperature', text)}
					/>
					<FormInput
						label="Pulse"
						placeholder="Pulse"
						value={input.pulse}
						onChangeText={(text: any) => handleChange('pulse', text)}
					/>
					<FormInput
						label="Blood Pressure"
						placeholder="Blood Pressure"
						value={input.bloodPressure}
						onChangeText={(text: any) => handleChange('bloodPressure', text)}
					/>
					<FormInput
						label="Breathing Rate"
						placeholder="Breathing rate"
						value={input.breathingRate}
						onChangeText={(text: any) => handleChange('breathingRate', text)}
					/>
				</View>

				<View style={styles.modalTextInputdate}>
					<DateInput
						label="Date"
						value={input.date}
						onChangeText={(text: any) => handleChange('date', text)}
						error={''}
					/>
				</View>
			</KeyboardAwareScrollView>
			<BottomButton onPress={handleLogVitals} text="Save Vitals" isLoading={isLoading} />
		</View>
	);
};

export default EnterVitals;



const styles = StyleSheet.create({

	FormInput: {
		gap: 10
	},
	modalTextInputdate: {
		marginTop: 8
	},
	container: {
		flex: 1,
		paddingBottom: 150,
		padding: 10,
		height: "100%"
	},
	scrollViewContainer: {
		flexGrow: 1,
		backgroundColor: colors.white
	},



})


