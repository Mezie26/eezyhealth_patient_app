import React from 'react'
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { colors } from '../../css/colorsIndex';
import DoctorProfile from '../../screens/App/Doctor/DoctorProfile';
export const SLIDER_WIDTH = Dimensions.get('window').width + 130
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }: any) => {

    return (
        <View style={styles.container} key={index}>
            <Text style={styles.image}>
                <DoctorProfile />
            </Text>
            <Text style={styles.header}>{item.title}</Text>
            <Text style={styles.body}>
                <Text style={styles.number}>{item.naira}</Text>
                {item.body}
                <Text style={styles.cent}>{item.cent}</Text>
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({

    number: {
        fontSize: 20,
    },

    container: {
        backgroundColor: colors.accent_green,
        borderRadius: 8,
        width: ITEM_WIDTH,
        height: 140,
        // paddingBottom: 40,
    },

    fingerHome: {
        fontSize: 120,
        overflow: 'visible',
        padding: 10,
    },
    cent: {
        fontSize: 25,
        fontFamily: 'Poppins-SemiBold',
    },
    image: {
        width: 200,
        height: 190,
        color: 'rgba(255,255,255,0.05)',
        left: 250,
        bottom: -60,
        overflow: 'visible',
        position: 'absolute',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        position: 'absolute',
        top: 20, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
        color: '#fff',
        fontFamily: 'Poppins-Regular'
    },
    body: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: 'center',
        position: 'absolute',
        top: 52, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
    }
})

export default CarouselCardItem