import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import * as Haptics from 'expo-haptics';
import { colors } from "../css/colorsIndex";
import { useNavigation } from "@react-navigation/native";
import { Notification } from "../assets/svg/Notification";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Headline({ bookings, displayName }: any) {
  const navigation: any = useNavigation();

  const handleNotification = () => {
    navigation.navigate('NotificationScreen');
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleprofile = () => {
    navigation.navigate('Account')
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Filter bookings based on their status (Pending or Completed)
  const filteredBookings = bookings?.filter((booking: { bookingStatus: string; }) => booking?.bookingStatus === 'Accepted');

  return (
    <View style={styles.header}>
      <View style={styles.dashboard_titel_container}>
        <View style={styles.dashboard_profile_container}>
          <TouchableOpacity style={styles.dashboard_profile} onPress={handleprofile}>
            {/* @ts-ignore  */}
            {!displayName?.photo_url ? <FontAwesome5 name="user-alt" size={15} color={colors.smail_text_color} /> : <Image
              style={styles.image}		// @ts-ignore 
              source={{ uri: displayName?.photo_url }}
            />}

          </TouchableOpacity>
          <View>
            <Text style={styles.dashboard_profile_text}>Welcome, {displayName?.display_name}!</Text>
            <Text style={styles.dashboard_profile_text_one}>Stay Healthy Always</Text>
          </View>
        </View>
        <View style={styles.dashboard_calender_container_main}>
          <TouchableOpacity style={styles.dashboard_calender_container} onPress={handleNotification}>
            <Notification />
            {/* <Text style={styles.dashboard_calender_text}>{!filteredBookings?.length ? 0 : filteredBookings?.length}</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboard_profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: colors.smail_text_color,
    padding: 1,
  },

  dashboard_profile_text: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    fontWeight: 'bold',
    marginBottom: 6,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  dashboard_calender_container_main: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dashboard_profile_text_one: {
    color: '#454545',
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },


  dashboard_calender_container: {
    // width: 60,
    // height: 25,
    // justifyContent: 'center',
    // borderRadius: 50,
    // backgroundColor: colors.black,
    // flexDirection: 'row',
    // alignItems: 'center',
    // gap: 10,
  },

  dashboard_profile_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dashboard_calender_text: {
    color: colors.white,
    fontSize: 20,
    fontFamily: "Inter_400Regular"
  },
  dashboard_titel_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  header: {
  },
});