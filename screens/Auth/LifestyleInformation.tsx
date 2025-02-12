import { Back } from "@/assets/svg/Back";
import { ProgressBar6 } from "@/assets/svg/ProgressBar6";
import CollapsibleSelector from "@/components/CollapsibleSelector";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const LifestyleInformation = () => {
    const navigation = useNavigation();

    const [selectedExerciseHabit, setSelectedExerciseHabit] = useState(null);
    const [selectedSmokingStatus, setSelectedSmokingStatus] = useState(null);
    const [selectedAlcoholConsumption, setSelectedAlcoholConsumption] = useState(null);

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() =>navigation.goBack()}>
                <Back />
            </TouchableOpacity>
            <View style={{justifyContent: "center", alignItems: "center", marginBottom: 30}}>
                <ProgressBar6 />
            </View>
            <Text style={styles.headerText}>Lifestyle Information</Text>
            <Text style={styles.titleText}>Select conditions that run in your family:</Text>
            <ScrollView>
            <Text style={styles.collapsibleHeader}>Exercise Habits</Text>
            <View style={{ justifyContent: "center", paddingHorizontal: 20 }}>
                <CollapsibleSelector
                    options={["Sedentary (little to no exercise)", "Light (1-2 times per week)", "Moderate (3-4 times per week)", "Active (5+ times per week)"]}
                    selected={selectedExerciseHabit}
                    onSelect={setSelectedExerciseHabit}
                />
            </View>
            <Text style={styles.collapsibleHeader}>Smoking Status</Text>
            <View style={{ justifyContent: "center", paddingHorizontal: 20 }}>
                <CollapsibleSelector
                    options={["Never smoked", "Former Smoker", "Current smoker"]}
                    selected={selectedSmokingStatus}
                    onSelect={setSelectedSmokingStatus}
                />
            </View>
            <Text style={styles.collapsibleHeader}>Alcohol Consumption</Text>
            <View style={{ justifyContent: "center", paddingHorizontal: 20 }}>
                <CollapsibleSelector
                    options={["Never", "Occasionally", "Weekly", "Daily"]}
                    selected={selectedAlcoholConsumption}
                    onSelect={setSelectedAlcoholConsumption}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton1} onPress={() =>navigation.goBack()}>
                    <Text style={styles.backButton1Text}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={() =>navigation.navigate('Home')}>
                    <Text style={styles.nextButtonText}>Complete</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}

export default LifestyleInformation;

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
    collapsibleHeader: {
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        color: "#171717",
        lineHeight: 20,
        letterSpacing: -0.5,
        marginHorizontal: 20,
        marginTop: 17
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 80
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