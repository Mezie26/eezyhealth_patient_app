import { Back } from "@/assets/svg/Back";
import { ProgressBar2 } from "@/assets/svg/ProgressBar2";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";


const CurrentMedication = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() =>{navigation.navigate('SignUp')}}>
                <Back />
            </TouchableOpacity>
            <View style={{justifyContent: "center", alignItems: "center", marginBottom: 30}}>
                <ProgressBar2 />
            </View>
            <Text style={styles.headerText}>Current Medication</Text>
            <Text style={styles.titleText}>Please list all current medications</Text>
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
    inputBoxHeader: {
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        color: "#171717",
        lineHeight: 20,
        letterSpacing: -0.5,
        margin: 20
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
	},
    nextButton: {
        width: 156,
        height: 40,
        top: 50,
        left: 248,
        borderRadius: 12,
        backgroundColor: "#44CE2D",
        justifyContent: "center",
        alignItems: "center"
    },
    nextButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500"
    }
})