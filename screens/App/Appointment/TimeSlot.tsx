import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DatePicker from 'react-native-modern-datepicker';
import PropTypes from 'prop-types';
import { colors } from '../../../css/colorsIndex';
import moment from 'moment';
import * as Haptics from 'expo-haptics';

const TimeSlot = ({ setSelectedDate, selectedDate }: any) => {
	const convertToISOString = (dateString: any) => {
		// Parse the input date string using Moment.js
		const parsedDate = moment(dateString, 'YYYY/MM/DD');
		// Format the parsed date as an ISO 8601 string
		return parsedDate.toISOString();
	};

	const handleDateChange = (date: any) => {
		setSelectedDate(convertToISOString(date)); // Update selectedDate state when date changes 
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Add haptic feedback
	};

	const currentDate = moment().format('YYYY/MM/DD'); // Get current date in required format

	return (
		<View style={styles.container}>
			<DatePicker
				mode="calendar" // Use calendar mode to disable time picker
				selected={selectedDate} // Pass selectedDate as the selected prop
				onDateChange={handleDateChange} // Pass handleDateChange function as prop 
				minimumDate={currentDate} // Disable past dates
				options={{
					selectedTextColor: colors.white,
					mainColor: colors.accent_green,
				}}
			/>
			<Text style={styles.containerText}>
				SELECTED DATE: {selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : 'No date selected'}
			</Text>
		</View>
	);
}

TimeSlot.propTypes = {
	setSelectedDate: PropTypes.func.isRequired,
	selectedDate: PropTypes.string,
};

export default TimeSlot;

const styles = StyleSheet.create({
	containerText: {
		color: colors.smail_text_color,
		fontSize: 12,
		fontFamily: "Inter-Regular",
		marginLeft: 5,
	},
	container: {
		marginTop: 10,
	},
});
