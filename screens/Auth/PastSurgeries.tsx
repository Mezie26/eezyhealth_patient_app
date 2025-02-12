import { Back } from "@/assets/svg/Back";
import { CalenderIcon2 } from "@/assets/svg/CalenderIcon2";
import { ProgressBar4 } from "@/assets/svg/ProgressBar4";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";


const PastSurgeries = () => {
    const navigation = useNavigation();

    const [surgeryName, setSurgeryName] = useState("");
    const [date, setDate] = useState("");


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() =>navigation.goBack()}>
                <Back />
            </TouchableOpacity>
            <View style={{justifyContent: "center", alignItems: "center", marginBottom: 30}}>
                <ProgressBar4 />
            </View>
            <Text style={styles.headerText}>Past Surgeries & Procedures</Text>
            <Text style={styles.titleText}>List any surgeries or major medical procedures:</Text>
            <TextInput
                value={surgeryName}
                onChangeText={setSurgeryName}
                style={styles.inputBox}
                placeholder="surgery/procedure name"
            />
            <View style={styles.inputContainer}>
        		<TextInput
          			style={styles.input}
          			value={date}
          			onChangeText={setDate}
          			placeholder="dd/mm/yy"
          			placeholderTextColor="#D1D1D1"
        		/>
                <CalenderIcon2 />
      		</View>
            <TouchableOpacity>
                <Text style={styles.addSurgeryText}>+ Add Another Surgery</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton1} onPress={() =>navigation.goBack()}>
                    <Text style={styles.backButton1Text}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() =>navigation.navigate('FamilyHistory')}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PastSurgeries;

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
        marginHorizontal: 20,
        marginTop: 17
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
    inputContainer: {
		width: width * 0.9,
		marginHorizontal: width * 0.05,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		borderRadius: 12,
		paddingHorizontal: 10,
		backgroundColor: "#fff", // Ensure a background color
	},
	input: {
		width: 320,
		height: 40,
		fontSize: 14,
		fontWeight: "400",
		fontFamily: "Inter-Regular",
	},
    addSurgeryText: {
        fontSize: 12,
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        color: "#44CE2D",
        textAlign: "right",
        marginHorizontal: width * 0.05,
        marginTop: 10
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