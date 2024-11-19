import React from 'react';
import { Platform, Text, useColorScheme } from 'react-native'; // Don't forget to import Text
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import DoctorProfile from '../screens/App/Doctor/DoctorProfile';
import { AppointmentIcon } from '@/assets/svg/Appointments';
import { Back } from '@/assets/svg/Back';
import { EezyLogo } from '@/assets/svg/EezyLogo';
import { HomeIcon } from '@/assets/svg/Home';
import { MessageIcon } from '@/assets/svg/Message';
import { SettingsIcon } from '@/assets/svg/Settings';
import AppointmentDetails from '@/screens/App/Appointment/AppointmentDetails';
import BookingAppointment from '@/screens/App/Appointment/BookingAppointment';
import RescheduleBooking from '@/screens/App/Appointment/RescheduleBooking';
import BillingDetails from '@/screens/App/BillingDetails/BillingDetails';
import ChannelScreen from '@/screens/App/Chat/ChannelScreen';
import DoctorOfTheMonth from '@/screens/App/Doctor/DoctorOfTheMonth';
import SearchDoctor from '@/screens/App/Home/SearchDoctor';
import Medicalinfo from '@/screens/App/Medicalinfo/Medicalinfo';
import AboutUs from '@/screens/App/Profile/AboutUs';
import EditAccount from '@/screens/App/Profile/EditAccount';
import PaymentHistory from '@/screens/App/Profile/PaymentHistory';
import Questionaire from '@/screens/App/Questionaire/Questionaire';
import EnterVitals from '@/screens/App/VitalsHistory/EnterVitals';
import VitalsHistory from '@/screens/App/VitalsHistory/VitalsHistory';
import VitalsLogging from '@/screens/App/VitalsHistory/VitalsLogging';
import SuccessBookings from '@/screens/SuccessScreens/SuccessBookings';
import SuccessQuestionaire from '@/screens/SuccessScreens/SuccessQuestionaire';
import SuccessReschedule from '@/screens/SuccessScreens/SuccessReschedule';
import Appointments from '@/screens/App/Appointment/Appointments';
import Message from '@/screens/App/Appointment/Message';
import Home from '@/screens/App/Home/Home';
import Account from '@/screens/App/Profile/Account';
import { RootTabParamList } from '@/types';
import { Colors } from '@/css/colorsIndex';



const BottomTab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator();

function RootNavigator() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: Colors[colorScheme].TopTab },
      headerTintColor: Colors[colorScheme].headerTintColor,
      headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Inter-Regular', },
    }}>

      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />

      < Stack.Screen name="ChannelScreen" component={ChannelScreen}
        options={{
          title: 'Chat', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Text>ddd</Text>
              {/* <Back/> */}
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />

      <Stack.Screen name="SearchDoctor" component={SearchDoctor}
        options={{
          title: 'Search Doctor', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />
      <Stack.Screen name="DoctorOfTheMonth" component={DoctorOfTheMonth}
        options={{
          title: 'Doctor Of The Month', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{
          title: 'Doctor Profile',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.goBack();
              }}
            >
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }}
      />

      < Stack.Screen name="VitalsHistory" component={VitalsHistory}
        options={{
          title: 'Vitals History', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />
      < Stack.Screen name="BookingAppointment" component={BookingAppointment}
        options={{
          title: 'Booking Appointment', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />
      <Stack.Screen name="Questionaire" component={Questionaire} options={{ headerShown: false }} />
      <Stack.Screen name="SuccessQuestionaire" component={SuccessQuestionaire} options={{ headerShown: false }} />
      < Stack.Screen name="SuccessBookings" component={SuccessBookings} options={{ headerShown: false }} />

      < Stack.Screen name="Medicalinfo" component={Medicalinfo}
        options={{
          title: 'Medical Infomation', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />
      < Stack.Screen name="BillingDetails" component={BillingDetails}
        options={{
          title: 'Booking Details', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />



      < Stack.Screen name="PaymentHistory" component={PaymentHistory}
        options={{
          title: 'Payment History', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />
      < Stack.Screen name="AboutUs" component={AboutUs}
        options={{
          title: 'Company Info', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo />
            </View>
          ),
        }} />
      < Stack.Screen name="EditAccount" component={EditAccount}
        options={{
          title: 'Edit Account', headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }} />
      < Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
        options={{
          title: 'Appointment Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              navigation.goBack();
            }}>
              <Back />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }} >


        < Stack.Screen name="EnterVitals" component={EnterVitals}
          options={{
            title: 'Enter Vitals', headerLeft: () => (
              <TouchableOpacity onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.goBack();
              }}>
                <Back />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.imageHeader2}>
                <EezyLogo
                />
              </View>
            ),
          }} />
        < Stack.Screen name="VitalsLogging" component={VitalsLogging}
          options={{
            title: 'Enter Vitals', headerLeft: () => (
              <TouchableOpacity onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.goBack();
              }}>
                <Back />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.imageHeader2}>
                <EezyLogo
                />
              </View>
            ),
          }} />

        < Stack.Screen name="RescheduleBooking" component={RescheduleBooking}
          options={{
            title: 'Reschedule Booking', headerLeft: () => (
              <TouchableOpacity onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.goBack();
              }}>
                <Back />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.imageHeader2}>
                <EezyLogo
                />
              </View>
            ),
          }} />
        < Stack.Screen name="SuccessReschedule" component={SuccessReschedule}
          options={{
            title: 'Success Reschedule', headerLeft: () => (
              <TouchableOpacity onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.goBack();
              }}>
                <Back />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.imageHeader2}>
                <EezyLogo />
              </View>
            ),
          }} />
      </Stack.Group>
    </Stack.Navigator >
  );
}

function BottomTabNavigator() {
  const colorScheme = useColorScheme();


  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    return (
      <View style={{
        flexDirection: 'row',
        height: Platform.OS === 'android' ? 60 : 80,
        paddingBottom: Platform.OS === 'android' ? 10 : 30,
        paddingTop: 15,
        backgroundColor: Colors[colorScheme].background, // Use dynamic color scheme
        borderTopWidth: 0.5, // Add top border
        borderTopColor: Colors[colorScheme].borderColor, // Set top border color
      }}>
        {state.routes.map((route: { key: string | number; name: any; }, index: React.Key | null | undefined) => {
          const { options } = descriptors[route.key];
          const label = options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              handlePress();
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const Icon = options.tabBarIcon;

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              // @ts-ignore  
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center' }}
            >
              {Icon({ color: isFocused ? Colors[colorScheme].buttonTab : Colors[colorScheme].inactiveTab, size: 20 })}
              <Text style={{ color: isFocused ? Colors[colorScheme].buttonTab : Colors[colorScheme].inactiveTab, fontSize: 12 }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 80,
          paddingBottom: Platform.OS === 'android' ? 10 : 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarIconStyle: {
          width: 20,
          height: 20,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTitle: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} secondaryColor={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          title: 'Appointments',
          headerShown: true,
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo
              />
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <AppointmentIcon size={size} color={color} secondaryColor={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Message"
        component={Message}
        options={{
          title: 'Message',
          headerShown: true,
          headerRight: () => (
            <View style={styles.imageHeader2}>
              <EezyLogo />
            </View>
          ),
          tabBarIcon: ({ size, color }) => (
            <MessageIcon size={size} color={color} secondaryColor={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon size={size} color={color} secondaryColor={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  imageHeader2: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  imageHeader: {
    // marginRight: 15,
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});

export default RootNavigator;