import { SuccessImage } from "@/assets/svg/SuccessImage";
import Navigation from "@/Navigation";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const CompletedAppointmentReview = () => {
    const navigation: any = useNavigation();

    return(
        <View style={styles.container}>
            <SuccessImage />
            <Text style={styles.headerText}>Thank You!</Text>
            <Text style={styles.bodyText}>Thank you for sharing your thoughts. We appreciate your feedback</Text>
            <TouchableOpacity style={{marginTop: 50}} onPress={()=> navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Return Home</Text>
            </TouchableOpacity>
        </View>
    )
};

export default CompletedAppointmentReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: 16,
        color: "#171717",
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        marginTop: 30
    },
    bodyText: {
        fontSize: 14,
        color: "#363636",
        fontFamily: "Inter-Regular",
        fontWeight: "400",
        width: 276,
        textAlign: 'center',
        margin: 10
    },
    buttonText: {
        color: "#44CE2D",
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
    },
})