import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from '../../css/colorsIndex';
import { ChevronDown } from '../../assets/svg/ChevronDown';
import { ChevronUp } from '../../assets/svg/ChevronUp';

const emojisWithIcons = [
	{ title: 'Online' },
	{ title: 'Face To Face' },
];



const ESelectDropdown = ({ setBookingChannel }: any) => {
	const handleSelect = (selectedItem: { title: any; }, index: any) => {
		setBookingChannel(selectedItem.title); // Update bookingChannel state when item is selected

	};
	return (
		<SelectDropdown
			data={emojisWithIcons}
			onSelect={handleSelect}
			renderButton={(selectedItem, isOpened) => {
				return (
					<View style={styles.dropdownButtonStyle}>
						<Text style={styles.dropdownButtonTxtStyle}>
							{(selectedItem && selectedItem.title) || 'Select channels'}
						</Text>
						{isOpened ? <ChevronDown /> : <ChevronUp />}
					</View>
				);
			}}
			renderItem={(item, index, isSelected) => {
				return (
					<View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: colors.accent_green_light }) }}
						key={index}>
						<Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
					</View>
				);
			}}
			showsVerticalScrollIndicator={false}
			dropdownStyle={styles.dropdownMenuStyle}
		/>
	);
};

export default ESelectDropdown;

const styles = StyleSheet.create({
	dropdownButtonStyle: {
		width: '100%',
		height: 50,
		backgroundColor: '#E9ECEF',
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500',
		color: '#151E26',
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownButtonIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
	dropdownMenuStyle: {
		backgroundColor: '#E9ECEF',
		borderRadius: 8,
	},
	dropdownItemStyle: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500',
		color: '#151E26',
	},
	dropdownItemIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
});

