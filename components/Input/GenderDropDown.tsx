import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from '../../css/colorsIndex';
import { ChevronDown } from '../../assets/svg/ChevronDown';
import { ChevronUp } from '../../assets/svg/ChevronUp';

const emojisWithIcons = [
    { title: 'Male' },
    { title: 'Female' },
];



const GenderDropdown = ({ setGender }: any) => {
    const handleSelect = (selectedItem: { title: any; }, index: any) => {
        setGender(selectedItem.title); // Update bookingChannel state when item is selected

    };
    return (
        <SelectDropdown
            data={emojisWithIcons}
            onSelect={handleSelect}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) || 'Select gender'}
                        </Text>
                        {isOpened ? <ChevronUp /> : <ChevronDown />}
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: colors.accent_green_light}) }}
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

export default GenderDropdown;

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        //width: '100%',
        height: 40,
        //backgroundColor: '#E9ECEF',
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: colors.smail_text_color,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        margin: 15
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '400',
        color: '#646464',
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
        fontSize: 14,
        fontWeight: '400',
        color: colors.black,
        margin: 10
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

