import { StarIcon2 } from "@/assets/svg/StarIcon2";
import BottomButton from "@/components/BottomButton";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";


const AppointmentReview = () => {
    const navigation: any = useNavigation();
    const [reviewText, onChangeReviewText] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Give a Feedback</Text>
            <View style={{justifyContent: "center", alignItems: 'center', margin: 40}}>
                <Text style={styles.reviewText}>How was your Experience with</Text>
                <Text style={styles.reviewText}>Dr ????</Text>
                <View style={{flexDirection: 'row', margin: 17, gap: 5}}>
                    <StarIcon2 /> <StarIcon2 /> <StarIcon2 /> <StarIcon2 /> <StarIcon2 />
                </View>
            </View>
            <Text style={styles.headerText}>Write your Review</Text>
            <View style={styles.inputBoxContainer}>
                <TextInput 
                    value={reviewText}
                    onChangeText={onChangeReviewText}
                    style={styles.inputBox}
                    placeholder='Your review here'
                    multiline={true}
                    maxLength={250}
                />
            </View>
            <Text style={styles.reviewTextCount}>{reviewText.length}/250</Text>
            <BottomButton onPress={()=> navigation.navigate('SuccessAppointmentReview')} text={"Submit Review"}/>
        </View>
    )
};

export default AppointmentReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "Inter-Medium",
        color: "#171717",
        margin: 20
    },
    reviewText: {
        fontSize: 12,
        fontFamily: "Inter-Regular",
        fontWeight: '400',
        color: "#363636"
    },
    inputBoxContainer: {
		width: 390,
		height: 128,
		borderColor: "#D5D5D5",
		borderWidth: 0.5,
		borderRadius: 8,
		marginHorizontal: 20,
	},
	inputBox: {
		padding: 10,
		textAlignVertical: 'top',
		fontSize: 14,
		fontWeight: 400,
		fontFamily: "Inter-Regular"
	},
    reviewTextCount: {
		marginTop: 5,
        marginHorizontal: 20,
		fontSize: 12,
		fontWeight: 400,
		color: "#646464",
		textAlign: "right"
	},
})