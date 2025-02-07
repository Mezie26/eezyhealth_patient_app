import React, { useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	TextInput,
    Dimensions
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

const CompletedAppointmentDetails = () => {
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
                                <Text style={styles.header_text}>Medical Summary</Text>
                                <View style={styles.medical_summary_container}>
                                    <View style={{ backgroundColor: "transparent" }}>
                                        <Text style={styles.medical_summary_header}>Diagnosis</Text>
                                        <Text style={styles.medical_summary_text}>????</Text>
                                        <Text style={styles.medical_summary_header}>Prescriptions</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.bullet}>•</Text>
                                            <Text style={styles.itemText}>????</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.bullet}>•</Text>
                                            <Text style={styles.itemText}>????</Text>
                                        </View>
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
                                <Text style={styles.header_text}>Payment Information</Text>
                                <View style={styles.payment_info_container}>
                                    <View style={styles.consultation_container}>
                                        <Text style={styles.consultation_text}>Consultation Fee</Text>
                                        <Text style={styles.consultation_price}>????</Text>
                                    </View>
                                </View>
							</View>
						</View>
					</ScrollView>
				</RootSiblingParent >
                <BottomButton onPress={()=> navigation.navigate('AppointmentReview')} text={"Review"}/>
			</View>


		</View>
	);
}

export default CompletedAppointmentDetails;

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({
	header_text: {
		fontSize: 14,
		fontFamily: "Inter-Medium",
		fontWeight: '500',
		color: "#171717",
		marginTop: 20,
		marginHorizontal: 20
	},
    medical_summary_container: {
        width: width * 0.9,
        height: 220,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#D5D5D5",
        margin: 20,
        marginHorizontal: width * 0.03,
        marginBottom: 0,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Elevation for Android
        //elevation: 1,
    },
    medical_summary_header: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-Medium',
        color: "#171717",
        margin: 15,
        marginBottom: 5
    },
    medical_summary_text: {
        fontSize: 12,
        fontFamily: "Inter-Regular",
        fontWeight: '400',
        color: "#363636",
        marginHorizontal: 15
    },
    listItem: {
        flexDirection: "row",
        marginBottom: 5,
      },
    bullet: {
        fontSize: 18,
        marginHorizontal: 15,
        marginRight: 7,
        marginBottom: 10
      },
    itemText: {
        fontSize: 12,
        color: "#363636",
        fontWeight: '400',
        marginTop: 5,
        width: 320
      },
      no_medical_summary_container: {
        width: 370,
        height: 132,
        borderRadius: 12,
        borderWidth: 0.5,
        backgroundColor: "#FEFCE8",
        borderColor: "#FEF08A",
        margin: 20,
        marginBottom: 0,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Elevation for Android
        //elevation: 4,
    },
    no_medical_summary_text: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "Inter-Medium",
        color: "#854D0E",
        marginHorizontal: 5
    },
    no_medical_summary_text2: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: "Inter-Regular",
        color: "#A16207",
        marginLeft: 35,
        width: 300
    },
    payment_info_container: {
        width: width * 0.9,
        height: 60,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#D5D5D5",
        margin: 20,
        marginBottom: 150,
        marginHorizontal: width * 0.03,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // Elevation for Android
        //elevation: 4,
    },
    consultation_container: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginTop: 20, 
        backgroundColor: "transparent",
    },
    consultation_text: {
        fontSize: 12,
        fontFamily: "Inter-Regular",
        fontWeight: '400',
        color: "#171717",
        marginHorizontal: 20
    },
    consultation_price: {
        fontSize: 14,
        fontFamily: "Inter-Medium",
        fontWeight: '500',
        color: "#171717",
        marginHorizontal: 20
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