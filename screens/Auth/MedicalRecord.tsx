import { Back } from "@/assets/svg/Back";
import { ProgressBar1 } from "@/assets/svg/ProgressBar1";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import {Checkbox} from "react-native-paper";

const MedicalRecord = () => {
    const navigation = useNavigation();
    const [diabetes, setDiabetes] = useState(false);
    const [heartDisease, setHeartDisease] = useState(false);
    const [highBP, setHighBP] = useState(false);
    const [asthma, setAsthma] = useState(false);
    const [cancer, setCancer] = useState(false);
    const [arthritis, setArthritis] = useState(false);
    const [depression, setDepression] = useState(false);
    const [other, setOther] = useState(false);
    const [otherText, setOtherText] = useState("");

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() =>{navigation.navigate('SignUp')}}>
                <Back />
            </TouchableOpacity>
            <View style={{justifyContent: "center", alignItems: "center", marginBottom: 30}}>
                <ProgressBar1 />
            </View>
            <Text style={styles.headerText}>Medical Condition</Text>
            <Text style={styles.titleText}>Select all that apply.</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                <Checkbox
                    status={diabetes ? "checked" : "unchecked"}
                    onPress={() => setDiabetes(!diabetes)}
                    color="#44CE2D"
                />
                <Text onPress={() => setDiabetes(!diabetes)}>Diabetes</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                <Checkbox
                    status={heartDisease ? "checked" : "unchecked"}
                    onPress={() => setHeartDisease(!heartDisease)}
                    color="#44CE2D"
                />
                <Text onPress={() => setHeartDisease(!heartDisease)}>Heart Disease</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                <Checkbox
                    status={highBP ? "checked" : "unchecked"}
                    onPress={() => setHighBP(!highBP)}
                    color="#44CE2D"
                />
                <Text onPress={() => setHighBP(!highBP)}>High Blood Pressure</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                <Checkbox
                    status={asthma ? "checked" : "unchecked"}
                    onPress={() => setAsthma(!asthma)}
                    color="#44CE2D"
                />
                <Text onPress={() => setAsthma(!asthma)}>Asthma</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                <Checkbox
                    status={cancer ? "checked" : "unchecked"}
                    onPress={() => setCancer(!cancer)}
                    color="#44CE2D"
                />
                <Text onPress={() => setCancer(!cancer)}>Cancer</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                <Checkbox
                    status={arthritis ? "checked" : "unchecked"}
                    onPress={() => setArthritis(!arthritis)}
                    color="#44CE2D"
                />
                <Text onPress={() => setArthritis(!arthritis)}>Arthritis</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                <Checkbox
                    status={depression ? "checked" : "unchecked"}
                    onPress={() => setDepression(!depression)}
                    color="#44CE2D"
                />
                <Text onPress={() => setDepression(!depression)}>Depression/Anxiety</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                <Checkbox
                    status={other ? "checked" : "unchecked"}
                    onPress={() => setOther(!other)}
                    color="#44CE2D"
                />
                <Text onPress={() => setOther(!other)}>Other</Text>
            </View>
            <Text style={styles.inputBoxHeader}>If other, please specify:</Text>
            <TextInput
                value={otherText}
                onChangeText={setOtherText}
                style={styles.inputBox}
            />
            <TouchableOpacity style={styles.nextButton} onPress={() =>navigation.navigate('CurrentMedication')}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MedicalRecord;

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