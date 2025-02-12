import { Back } from "@/assets/svg/Back";
import { ProgressBar2 } from "@/assets/svg/ProgressBar2";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";


const CurrentMedication = () => {
    const navigation = useNavigation();

    const [currentMedication1, setCurrentMedication1] = useState("");
    const [currentMedication2, setCurrentMedication2] = useState("");
    const [currentMedication3, setCurrentMedication3] = useState("");


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() =>navigation.goBack()}>
                <Back />
            </TouchableOpacity>
            <View style={{justifyContent: "center", alignItems: "center", marginBottom: 30}}>
                <ProgressBar2 />
            </View>
            <Text style={styles.headerText}>Current Medication</Text>
            <Text style={styles.titleText}>Please list all current medications</Text>
            <TextInput
                value={currentMedication1}
                onChangeText={setCurrentMedication1}
                style={styles.inputBox}
                placeholder="current medication"
            />
            <TextInput
                value={currentMedication2}
                onChangeText={setCurrentMedication2}
                style={styles.inputBox}
                placeholder="current medication"
            />
            <TextInput
                value={currentMedication3}
                onChangeText={setCurrentMedication3}
                style={styles.inputBox}
                placeholder="current medication"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton1} onPress={() =>navigation.goBack()}>
                    <Text style={styles.backButton1Text}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() =>navigation.navigate('Allergies')}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CurrentMedication;

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 70
    },
    backButton: {
        margin: 20
    },
    headerText: {
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "Inter-Medium",
        lineHeight: 24,
        letterSpacing: -0.5,
        color: "#171717",
        marginHorizontal: 20
    },
    titleText: {
        fontSize: 12,
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        color: "#363636",
        lineHeight: 20,
        letterSpacing: -0.5,
        marginHorizontal: 20,
        marginVertical: 10
    },
    inputBox: {
		width: width * 0.9,
		height: 40,
		borderRadius: 12,
		marginHorizontal: width * 0.05,
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		paddingVertical: 10,
		paddingHorizontal: 14,
        marginVertical: 10
	},
    buttonContainer: {
        flexDirection: "row",
        gap: 16,
        //width: width * 0.9,
        //marginHorizontal: width * 0.035,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 70
    },
    backButton1: {
        width: 182,
        height: 40,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#44CE2D",
        padding: 8,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center"
    },
    backButton1Text: {
        color: "#44CE2D",
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500"
    },
    nextButton: {
        width: 182,
        height: 40,
        borderRadius: 12,
        padding: 8,
        backgroundColor: "#44CE2D",
        justifyContent: "center",
        alignItems: "center"
    },
    nextButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500"
    },
})