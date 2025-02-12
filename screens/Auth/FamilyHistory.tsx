import { Back } from "@/assets/svg/Back";
import { ProgressBar5 } from "@/assets/svg/ProgressBar5";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import {Checkbox} from "react-native-paper";

const FamilyHistory = () => {
    const navigation = useNavigation();
    const [parent, setParent] = useState(false);
    const [sibling, setSibling] = useState(false);
    const [grandparent, setGrandparent] = useState(false);
    const [parent1, setParent1] = useState(false);
    const [sibling1, setSibling1] = useState(false);
    const [grandparent1, setGrandparent1] = useState(false);
    const [parent2, setParent2] = useState(false);
    const [sibling2, setSibling2] = useState(false);
    const [grandparent2, setGrandparent2] = useState(false);
    const [parent3, setParent3] = useState(false);
    const [sibling3, setSibling3] = useState(false);
    const [grandparent3, setGrandparent3] = useState(false);
    
    const [otherText, setOtherText] = useState("");

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() =>navigation.goBack()}>
                <Back />
            </TouchableOpacity>
            <View style={{justifyContent: "center", alignItems: "center", marginBottom: 30}}>
                <ProgressBar5 />
            </View>
            <Text style={styles.headerText}>Family History</Text>
            <Text style={styles.titleText}>Select conditions that run in your family:</Text>
            <ScrollView>
                <Text style={styles.checkBoxHeader}>Heart Disease</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={parent ? "checked" : "unchecked"}
                        onPress={() => setParent(!parent)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setParent(!parent)}>Parent</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={sibling ? "checked" : "unchecked"}
                        onPress={() => setSibling(!sibling)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setSibling(!sibling)}>Sibling</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={grandparent ? "checked" : "unchecked"}
                        onPress={() => setGrandparent(!grandparent)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setGrandparent(!grandparent)}>Grandparent</Text>
                </View>
                <Text style={styles.checkBoxHeader}>Diabetes</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={parent1 ? "checked" : "unchecked"}
                        onPress={() => setParent1(!parent1)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setParent1(!parent1)}>Parent</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={sibling1 ? "checked" : "unchecked"}
                        onPress={() => setSibling1(!sibling1)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setSibling1(!sibling1)}>Sibling</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={grandparent1 ? "checked" : "unchecked"}
                        onPress={() => setGrandparent1(!grandparent1)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setGrandparent1(!grandparent1)}>Grandparent</Text>
                </View>
                <Text style={styles.checkBoxHeader}>High Blood Pressure</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={parent2 ? "checked" : "unchecked"}
                        onPress={() => setParent2(!parent2)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setParent2(!parent2)}>Parent</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={sibling2 ? "checked" : "unchecked"}
                        onPress={() => setSibling2(!sibling2)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setSibling2(!sibling2)}>Sibling</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={grandparent2 ? "checked" : "unchecked"}
                        onPress={() => setGrandparent2(!grandparent2)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setGrandparent2(!grandparent2)}>Grandparent</Text>
                </View>
                <Text style={styles.checkBoxHeader}>Cancer</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={parent3 ? "checked" : "unchecked"}
                        onPress={() => setParent3(!parent3)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setParent3(!parent3)}>Parent</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={sibling3 ? "checked" : "unchecked"}
                        onPress={() => setSibling3(!sibling3)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setSibling3(!sibling3)}>Sibling</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
                    <Checkbox
                        status={grandparent3 ? "checked" : "unchecked"}
                        onPress={() => setGrandparent3(!grandparent3)}
                        color="#44CE2D"
                    />
                    <Text onPress={() => setGrandparent3(!grandparent3)}>Grandparent</Text>
                </View>
                <Text style={styles.otherInputBoxHeader}>Other Conditions</Text>
                <TextInput
                    value={otherText}
                    onChangeText={setOtherText}
                    style={styles.inputBox}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.backButton1} onPress={() =>navigation.goBack()}>
                        <Text style={styles.backButton1Text}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={() =>navigation.navigate('LifestyleInformation')}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default FamilyHistory;

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
    checkBoxHeader: {
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        color: "#171717",
        lineHeight: 20,
        letterSpacing: -0.5,
        margin: 20,
        marginVertical: 10
    },
    otherInputBoxHeader: {
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        color: "#171717",
        lineHeight: 20,
        letterSpacing: -0.5,
        margin: 20,
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