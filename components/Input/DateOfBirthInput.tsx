import * as React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import { CalenderIcon3 } from '@/assets/svg/CalenderIcon3';

interface Props {
	label: string;
	value: Date;
	onChangeText: (date: Date) => void;
	error: string;
	mode?: 'date' | 'month' | 'year';
}

const DateOfBirth = ({ label, value, onChangeText, error, mode = 'date' }: Props) => {
	const [showDatePicker, setShowDatePicker] = useState(false);
    const [trial, setTrial] = useState("")

	const handleConfirm = (selectedDate: Date) => {
		setShowDatePicker(false);
		onChangeText(selectedDate);
	};

    const formatDate = (dateValue: number | Date): string => {
        let date: Date;
    
        if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
            date = dateValue;
        } else if (typeof dateValue === "number") {
            date = new Date(dateValue);
        } else {
            return ""; // Invalid date
        }
    
        // Extract day, month, year
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    };

	return (
        <View>
            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
                <TextInput
                    value={formatDate(value)}
                    style={styles.input}
                />
                <CalenderIcon3 />

			    <DateTimePickerModal
				    isVisible={showDatePicker}
				    mode='date' // Mode can be 'date', 'time', 'datetime', 'month', or 'year'
				    date={value instanceof Date ? value : new Date()}
				    onConfirm={(date) => {
					    setShowDatePicker(false);
					    handleConfirm(date);
				    }}
				    onCancel={() => setShowDatePicker(false)}
				    display="spinner"
			    />
		    </TouchableOpacity>
        </View>
	);
};

export default DateOfBirth;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        margin: 15,
        marginBottom: 20
      },
    icon: {
        marginRight: 8,
      },
    input: {
        flex: 1,
        fontSize: 14,
		fontWeight: 400,
		fontFamily: "Inter-Regular",
		color: "#363636"
      },
});
