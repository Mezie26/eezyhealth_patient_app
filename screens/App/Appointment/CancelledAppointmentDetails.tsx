import React, { useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TextInput
} from "react-native";
import { useState } from "react";
import moment from "moment";
import * as Haptics from 'expo-haptics';
import { colors } from "../../../css/colorsIndex";
import { TouchableOpacity } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserCircle } from "../../../assets/svg/UserCircle";
import { ID } from "../../../assets/svg/ID";
import { NewCalender } from "../../../assets/svg/NewCalender";
import Toast from "@/components/Toast";
import { DoctorProfilePic } from "@/assets/svg/DoctorProfile";
import { Locations } from "@/assets/svg/Location";
import BottomButton from "@/components/BottomButton";
import { InfoLightIcon } from "@/assets/svg/InfoLightIcon";

const CancelledAppointmentDetails = () => {
	const navigation: any = useNavigation();
	const route = useRoute();
	// @ts-ignore
	const { item } = route.params;
	const toastRef = useRef<any>(null); // Replace with your actual toast reference


	// Remove underscore from item and capitalize first letter
	const formattedItem = item?.slot?.replace('_', ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


	return (
		<View style={styles.container}>
			<Toast ref={toastRef} />
			<View style={styles.container_sub}>
				<RootSiblingParent>
					<ScrollView contentContainerStyle={styles.scrollViewContent}
						showsVerticalScrollIndicator={false}
						showsHorizontalScrollIndicator={false}>
						<View style={styles.topboxContainer}>
							<View style={styles.booked_text_nett}>
								<View style={styles.booked_text_container_main}>
									<View style={styles.booked_text_container}>
										{item.photo_url ? < Image
											source={{ uri: item?.photo_url }}
											style={styles.top_container_img_icon}
										/> : <DoctorProfilePic />}
									</View>
									<Text style={styles.bookeding_text}>Dr. {item?.doctorName}</Text>
									<Text style={styles.bookeding_text_two}>Specialization??{item?.Specialization}</Text>
									<View style={{flexDirection: 'row', marginTop: 5}}>
										<Locations color="#646464"/>
										<Text style={styles.bookeding_text_three}>{item?.hospital}</Text>
									</View>
                                    <View style={{flexDirection: 'row', marginTop: 7}}>
                                        <Text style={styles.bookeding_section_text_two_sub}>{moment.unix(item?.bookingDate?.seconds).format('Do MMMM, YYYY')}</Text>
                                        <View style={{ width: 1, height: 15, backgroundColor: "#D5D5D5"}}></View>
                                        <Text style={styles.bookeding_section_text_two_sub}>{formattedItem}</Text>
                                    </View>
								</View>
                                <Text style={styles.header_text}>Reason for Cancelation</Text>
                                <View style={styles.medical_summary_container}>
                                    <View style={{ backgroundColor: "transparent" }}>
                                        <Text style={styles.medical_summary_text}>????</Text>
                                    </View>
                                </View>
                                {/*<View style={styles.no_medical_summary_container}>
                                    <View style={{flexDirection: 'row', margin: 15}}>
                                        <InfoLightIcon />
                                        <Text style={styles.no_medical_summary_text}>Summary Notes Pending</Text>
                                    </View>
                                    <Text style={styles.no_medical_summary_text2}>
                                    Your doctor is currently reviewing and finalizing your visit notes. This usually takes a few hours and will be available by End of Day.
                                    </Text>
                                </View>*/}
							</View>
						</View>
					</ScrollView>
				</RootSiblingParent >

			</View>


		</View>
	);
}

export default CancelledAppointmentDetails;



const styles = StyleSheet.create({
	header_text: {
		fontSize: 14,
		fontFamily: "Inter-Medium",
		fontWeight: '500',
		color: "#171717",
		marginTop: 60,
		marginHorizontal: 20
	},
    medical_summary_container: {
        width: 370,
        height: 130,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#D5D5D5",
        margin: 20,
        marginTop: 10,
        marginBottom: 0,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 4,
    },
    medical_summary_text: {
        fontSize: 12,
        fontFamily: "Inter-Regular",
        fontWeight: '400',
        color: "#363636",
        marginHorizontal: 15,
        margin: 10
    },
	top_container_img_icon: {
		width: 88,
		height: 88,
		borderRadius: 100,
	},
	bookeding_text_two: {
		color: "#363636",
		fontSize: 12,
		fontFamily: "Inter-Regular",
		fontWeight: '400',
		marginTop: 5,
	},
	bookeding_text_three: {
		fontFamily: "Inter-Regular",
		fontSize: 10,
		fontWeight: '400',
		color: "#646464",
		marginTop: 2,
	},

	bookeding_section_text_two_sub: {
		color: "#363636",
		fontSize: 12,
		fontFamily: "Inter-Regular",
		fontWeight: '400',
		marginHorizontal: 20,
	},
	bookeding_text: {
		color: colors.black,
		fontSize: 14,
		fontFamily: "Inter-Medium",
		fontWeight: '500'
	},
	booked_text_container_main: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
	},

	booked_text_container: {
		width: 88,
		height: 88,
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
        marginBottom: 15
	},

	booked_text_nett: {},
	topboxContainer: {
		gap: 2,
		paddingTop: 10,
	},
	container_sub: {
		margin: 10,
	},
	container: {
		flexGrow: 1,
		backgroundColor: colors.white,
	},
	scrollViewContent: {
		paddingBottom: 150,
	},
});