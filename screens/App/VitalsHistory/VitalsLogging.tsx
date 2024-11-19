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


const VitalsLogging = ({ navigation }: any) => {
	const route = useRoute();
	// @ts-ignore
	const { booking, doctorId, userId, bookingId, user } = route.params;
	const [isLoading, setIsLoading] = useState<any>(false);

	// Updated input state
	const [input, setInput] = useState({
		name: "",
		userId: '',
		vitals: [
			{
				temperature: '',
				pulse: '',
				bloodPressure: '',
				breathingRate: '',
				comment: '',
				recommendation: '',
				upload: {},
				date: new Date().toLocaleDateString(),
				doctorId: '',
				bookingId: '',
			}
		]
	});

	// Set the initial values when component mounts
	useEffect(() => {
		setInput((prevState) => ({
			...prevState,
			name: `${user?.first_name} ${user?.last_name}`,
			userId,
			vitals: prevState.vitals.map((vital) => ({
				...vital,
				doctorId,
				bookingId
			}))
		}));
	}, [bookingId, doctorId, userId]);

	// Save vitals to database
	const handleLogVitals = async () => {
		setIsLoading(true);
		try {
			await saveVitalsData(userId, input); // Call saveVitalsData with userId and vitals data object 
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			navigation.navigate('Home', { load: true }); // Navigate to Home on success
		} catch (error) {
			console.error('Error saving vitals:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle form input changes for vitals fields
	const handleVitalsChange = (name: string, value: string) => {
		setInput((prevState) => ({
			...prevState,
			vitals: prevState.vitals.map((vital, index) =>
				index === 0 ? { ...vital, [name]: value } : vital
			),
		}));
	};

	return (
		<View style={styles.scrollViewContainer}>
			<KeyboardAwareScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
				<View style={styles.FormInput}>
					<FormInput
						label="Temperature"
						placeholder="Body Temperature"
						value={input.vitals[0].temperature}
						onChangeText={(text: string) => handleVitalsChange('temperature', text)}
					/>
					<FormInput
						label="Pulse"
						placeholder="Pulse"
						value={input.vitals[0].pulse}
						onChangeText={(text: string) => handleVitalsChange('pulse', text)}
					/>
					<FormInput
						label="Blood Pressure"
						placeholder="Blood Pressure"
						value={input.vitals[0].bloodPressure}
						onChangeText={(text: string) => handleVitalsChange('bloodPressure', text)}
					/>
					<FormInput
						label="Breathing Rate"
						placeholder="Breathing rate"
						value={input.vitals[0].breathingRate}
						onChangeText={(text: string) => handleVitalsChange('breathingRate', text)}
					/>
				</View>

				<View style={styles.modalTextInputdate}>
					<DateInput
						label="Date"
						value={input.vitals[0].date}
						onChangeText={(text) => handleVitalsChange('date', text)}
						error={''}
					/>
				</View>
			</KeyboardAwareScrollView>
			<BottomButton onPress={handleLogVitals} text="Save Vitals" isLoading={isLoading} />
		</View>
	);
};

export default VitalsLogging;



const styles = StyleSheet.create({

	FormInput: {
		gap: 10
	},
	modalTextInputdate: {

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


