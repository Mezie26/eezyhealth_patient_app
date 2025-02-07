//import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { colors } from '../../../css/colorsIndex';
import { Locations } from '@/assets/svg/Location';
import {BlurView} from 'expo-blur'
import { CallLogo } from '@/assets/svg/CallLogo';
import { CalenderIcon } from '@/assets/svg/CalenderIcon';
import { TimeIcon } from '@/assets/svg/TimeIcon';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { CardImage } from '@rneui/base/dist/Card/Card.Image';

const UpcomingAppointmentCard = () => {
    return (
        <View>
            <View style={{flexDirection: 'row', marginTop: 10, margin: 10, justifyContent: 'space-between', alignItems: "center"}}>
				<View style={{flexDirection: 'row'}}>
                    <FontAwesome6 name="user-doctor" size={45} style={styles.CardImageIcon}  color={colors.smail_text_color} />
                    {/*<Image
                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/eezyhealth-2023.appspot.com/o/profileImages%2FZ?alt=media&token=21ee0260-d2c5-42b3-af69-258593b96612"}}
                        style={styles.cardImage}
                        resizeMode="contain"
                    />*/}
                    <View style={styles.cardDetailsContainer}>
                        <Text style={styles.cardDoctorName}>Dr ????</Text>
                        <Text style={styles.cardDoctorSpecialization}>Doctor Specialization??</Text>
                    </View>
                </View>
                <CallLogo />
            </View>
            <View style={styles.cardLocationContainer}>
                <Locations color="#ffffff"/>
                <Text style={styles.cardLocationText}>Doctor Location??</Text>
            </View>
            <BlurView style={styles.cardDateContainer} intensity={90} tint='light'>
                <View style={{flexDirection: 'row'}}>
                    <CalenderIcon />
                    <Text style={styles.cardDateAndTime}>Apmt date</Text>
                </View>
                <View style={{ width: 1, height: 21, backgroundColor: colors.accent_green}}></View>
                <View style={{flexDirection: 'row'}}>
                    <TimeIcon />
                    <Text style={styles.cardDateAndTime}>Apmt Time</Text>
                </View>
            </BlurView>
        </View>
    )
};

export default UpcomingAppointmentCard;

const styles = StyleSheet.create({
    CardImageIcon: {
        width: 50,
		height: 50,
		borderRadius: 25,
		marginLeft: 10,
        padding: 5,
        backgroundColor: '#ffffff',
        overflow: 'hidden'
    },
    cardImage: {
        width: 50,
		height: 50,
		borderRadius: 100,
		marginLeft: 10
    },
    cardDetailsContainer: {
        marginTop: 5,
		marginLeft: 10,
		marginRight: 25,
    },
    cardDoctorName: {
        color: colors.white,
		fontSize: 16,
		marginBottom: 7,
		textAlign: 'left',
        fontWeight: '600'
    },
    cardDoctorSpecialization: {
        color: colors.white,
		fontSize: 13,
		fontFamily: 'Inter-Regular',
		marginBottom: 7,
    },
    cardLocationContainer: {
        flexDirection: "row",
		alignItems: "center",
		gap: 1,
		marginLeft: 18,
    },
    cardLocationText: {
        color: colors.white,
		fontSize: 12,
		fontFamily: 'Inter-Regular',
        fontWeight: 400,
        marginBottom: 4
    },
    cardDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        //opacity: 0.5,
        margin: 7,
        marginHorizontal: 17,
        borderRadius: 12,
        height: 37,
        padding: 8,
        borderColor: colors.white,
        borderWidth: 1,
        overflow: 'hidden',
    },
    cardDateAndTime: {
        color: colors.accent_green,
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        marginLeft: 3,
        marginTop: 2
    },
})