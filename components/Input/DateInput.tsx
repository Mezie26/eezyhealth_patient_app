import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import { windowHeight } from '../../utils/Dimentions';

interface Props {
	label: string;
	value: Date;
	onChangeText: (date: Date) => void;
	error: string;
	mode?: 'date' | 'month' | 'year';
}

const DateInput = ({ label, value, onChangeText, error, mode = 'date' }: Props) => {
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleConfirm = (selectedDate: Date) => {
		setShowDatePicker(false);
		onChangeText(selectedDate);
	};
	const formatDate = (dateValue: number | Date | any) => {
		if (dateValue instanceof Date && !isNaN(dateValue)) {
			return dateValue.toLocaleDateString();
		}
		return ''; // Return an empty string if the value is not a valid date
	};

	return (
		<View style={styles.inputContainer}>
			<TextInput
				mode="outlined"
				label={label}
				style={[styles.text_input, error ? styles.errorBorder : null]}
				value={formatDate(value)}
				right={<TextInput.Icon icon="calendar" onPress={() => setShowDatePicker(true)} />}
				editable={true}
				theme={{
					colors: { onSurfaceVariant: '#797a7d' },
					roundness: 14, // Specify the border radius here
				}}
				activeOutlineColor="#43CE2E"
			/>

			<DateTimePickerModal
				isVisible={showDatePicker}
				mode={mode} // Mode can be 'date', 'time', 'datetime', 'month', or 'year'
				date={value instanceof Date ? value : new Date()}
				onConfirm={(date) => {
					setShowDatePicker(false);
					handleConfirm(date);
				}}
				onCancel={() => setShowDatePicker(false)}
				display="spinner"
			/>
		</View>
	);
};

export default DateInput;

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		height: windowHeight / 15,
		borderRadius: 16,
	},
	errorBorder: {
		borderColor: 'red',
	},
	text_input: {
		backgroundColor: "#F0F4F8",
		fontSize: 14,
		borderRadius: 20,
	},
});
