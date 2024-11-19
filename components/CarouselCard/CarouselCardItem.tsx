import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native"
import { colors } from '../../css/colorsIndex';
export const SLIDER_WIDTH = Dimensions.get('window').width + 130
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
import * as Haptics from 'expo-haptics';
import moment from 'moment';
import { Locations } from '../../assets/svg/Location';
import DoctorProfile from '../../screens/App/Doctor/DoctorProfile';
import Calendar from '../../assets/svg/Calendar';
import Clock from '../../assets/svg/Clock';
import { Cock } from '../../assets/svg/Cock';


const CarouselCardItem = ({ item, navigation }: any) => {
  // Remove underscore from item and capitalize first letter
  const formattedItem = item?.slot?.replace('_', ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const handleDetails = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('AppointmentDetails', { item: item });
  };

  return (
    <View  >
      <View style={styles.access_card_container}>
        <View style={styles.access_card_container_sub_one}>
          <Cock />
          <Text style={styles.access_card_container_sub_one_text}>UPCOMING APPOINTMENT</Text>
        </View>
        <View style={styles.access_card_img}>
          <View style={styles.access_card_img_pics}>

            {!item?.doctorPhotoUrl ? <View style={styles.access_card_img_center}>
              <DoctorProfile />
            </View> :
              <Image
                source={{ uri: item?.doctorPhotoUrl }}
                style={styles.top_container_img_icon_pics}
              />}
          </View>
          <View style={styles.access_card_img_text}>
            <Text style={styles.access_card_img_text_one}>Dr {item?.doctorName}</Text>
            <Text style={styles.access_card_img_text_two}>{item?.specialization}</Text>
            <Text style={styles.access_card_img_text_two}>{item?.bookingChannel}</Text>
            <View style={styles.access_card_img_text_three_container}>
              <Locations />
              <Text style={styles.access_card_img_text_three}>
                {item?.hospital}</Text>
            </View>
          </View>
        </View>
        <View style={styles.top_container_calender_main_sub}>
          <View style={styles.top_container_calender_main}>
            <Calendar />
            <View>
              <Text style={styles.top_container_date}>Date</Text>
              <Text style={styles.top_container_date_time}>{moment.unix(item?.bookingDate?.seconds).format('Do MMMM, YYYY')}</Text>
            </View>
          </View>
          <View style={styles.top_container_calender_main}>
            <Clock />
            <View>
              <Text style={styles.top_container_date}>Time</Text>
              <Text style={styles.top_container_date_time}>{formattedItem}</Text>
            </View>
          </View>
        </View>
        <View style={styles.top_reschedule_container}>
          <TouchableOpacity  >
            <Text style={styles.top_container_reschedule}> </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDetails(item)} >
            <Text style={styles.top_container_date_Details}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({

  access_card_img_center: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center"
  },

  top_container_date_Details: {
    color: colors.black,
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },


  top_container_reschedule: {
    color: colors.smail_text_color,
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  top_reschedule_container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20
  },
  top_container_date: {
    color: colors.smail_text_color,
    fontSize: 12,
    marginBottom: 2,
  },
  top_container_date_time: {
    color: colors.black,
    fontSize: 12,
  },

  top_container_calender: {
    fontSize: 20
  },
  top_container_calender_main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  top_container_calender_main_sub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.smail_text_color,
    margin: 20,
  },
  top_container_img_icon_pics: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  access_card_img_text_three_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  access_card_img_text_one: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 5,
  },
  access_card_img_text_two: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginBottom: 5,
  },
  access_card_img_text_three: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },


  access_card_img_text: {
    marginTop: 20,
  },

  access_card_img_pics: {
    width: 100,
    height: "auto",
  },

  access_card_img: {
    borderRadius: 50,
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  access_card_container_sub_one_text: {
    color: colors.white,
    fontSize: 15,
    fontFamily: "Inter-Regular",
  },

  access_card_container_sub_one: {
    width: "100%",
    backgroundColor: colors.accent_green,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
  },

  access_card_container: {
    width: "100%",
    backgroundColor: colors.white,
    marginTop: 40,
    flexDirection: "column",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grayColor,
  },




})

export default CarouselCardItem