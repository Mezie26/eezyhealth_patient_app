import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";


export default function UpdateVitals() {
    const navigation: any = useNavigation();
    const route = useRoute();
    // @ts-ignore
    const { input, item, user, pricing } = route.params;


    const [weight, setWeight] = useState("");
    const handleWeightInput = (text: string) => {
        // Allow only numbers and a single decimal point
        const numericValue = text.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-dot characters
        // Prevent multiple dots
        if ((numericValue.match(/\./g) || []).length > 1) return
        setWeight(numericValue);
      };

    const [highestBloodPressure, sethighestBloodPressure] = useState("");
    const handleHighestBloodPressureInput = (text: string) => {
        // Allow only numbers and a single decimal point
        const numericValue = text.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-dot characters
        // Prevent multiple dots
        if ((numericValue.match(/\./g) || []).length > 1) return
        sethighestBloodPressure(numericValue);
      };

    const [lowestBloodPressure, setLowestBloodPressure] = useState("");
    const handleLowestBloodPressureInput = (text: string) => {
        // Allow only numbers and a single decimal point
        const numericValue = text.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-dot characters
        // Prevent multiple dots
        if ((numericValue.match(/\./g) || []).length > 1) return
          setLowestBloodPressure(numericValue);
        };

    
    const [temperature, setTemperature] = useState("");
    const handleTemperatureInput = (text: string) => {
        // Allow only numbers and a single decimal point
        const numericValue = text.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-dot characters
        // Prevent multiple dots
        if ((numericValue.match(/\./g) || []).length > 1) return
        setTemperature(numericValue);
      };


    const [heartRate, setHeartRate] = useState("");
    const handleHeartRateInput = (text: string) => {
        // Allow only numbers and a single decimal point
        const numericValue = text.replace(/[^0-9.]/g, ''); // Remove non-numeric and non-dot characters
        // Prevent multiple dots
        if ((numericValue.match(/\./g) || []).length > 1) return
        setHeartRate(numericValue);
      };
    
    return (
        <View style={styles.container}>
            <Text style={styles.headerTexts}>Please provide some vitals metrics</Text>
            <Text style={styles.headerTexts}>Weight</Text>
            <TextInput
                value={weight}
                onChangeText={handleWeightInput}
                style={styles.longInputBox}
                placeholder="kg"
                keyboardType="decimal-pad"/>
            <Text style={styles.headerTexts}>Blood Pressure</Text>
            <View style={{flexDirection: "row", margin: 20, justifyContent: "space-between"}}>
                <TextInput
                    value={highestBloodPressure}
                    onChangeText={handleHighestBloodPressureInput}
                    style={styles.shortInputBox}
                    placeholder="Systolic Pressure"
                    keyboardType="decimal-pad"/>
                <TextInput
                    value={lowestBloodPressure}
                    onChangeText={handleLowestBloodPressureInput}
                    style={styles.shortInputBox}
                    placeholder="Diastolic Pressure"
                    keyboardType="decimal-pad"/>
            </View>
            <Text style={styles.headerTexts}>Temperature</Text>
            <TextInput
                value={temperature}
                onChangeText={handleTemperatureInput}
                style={styles.longInputBox}
                placeholder="°C"
                keyboardType="decimal-pad"/>
            <Text style={styles.headerTexts}>Heart Rate</Text>
            <TextInput
                value={heartRate}
                onChangeText={handleHeartRateInput}
                style={styles.longInputBox}
                placeholder="bpm"
                keyboardType="decimal-pad"/>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("BillingDetails", { item, input, user, load: false, pricing })}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const {width} = Dimensions.get("window")


const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    headerTexts: {
        fontSize: 14,
        fontWeight: '500',
        color: "#171717",
        marginTop: 30,
        marginHorizontal: 20,
        fontFamily: "Inter-Medium"
    },
    longInputBox: {
        width: 380,
        height: 40,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#D5D5D5",
        backgroundColor: "#FFFFFF",
        margin: 20,
        padding: 10
    },
    shortInputBox: {
        width: 180,
        height: 40,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#D5D5D5",
        backgroundColor: "#FFFFFF",
        //margin: 20,
        padding: 10
    },
    nextButtonContainer: {
        //marginTop: 160
        position: "absolute",
        bottom: 20,
        justifyContent: "center",
        alignItems: "center",
        //marginHorizontal: 35
    },
    nextButton: {
        width: width * 0.9,
        height: 48,
        backgroundColor: "#44CE2D",
        borderRadius: 12,
        //margin: 20,
        marginHorizontal: width * 0.05,
        justifyContent: "center",
        alignItems: "center",
    },
    nextButtonText: {
        color: "#FFFFFF",
        fontFamily: "Inter-Medium",
        fontSize: 14,
        fontWeight: '500'
    }
})