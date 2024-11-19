import React from 'react';
import { StyleSheet, Platform, TouchableOpacity, Linking, Text, View, } from 'react-native';
import { colors } from '../../../css/colorsIndex';
import { Locations } from '../../../assets/svg/Location';
import { Phone } from '../../../assets/svg/Phone';
import { Info } from '../../../assets/svg/Info';


const AboutUs = () => {


  return (
    <View style={styles.infoContainer}  >
      <Text style={styles.AboutUsText}>About us</Text>
      <Text style={styles.AboutUsSubText}>Eezy Health is an innovative online healthcare application and website designed to connect doctors and patients seamlessly. The platform offers a range of features including appointment scheduling, online consultations, and video calling. Patients can easily book appointments with their preferred doctors and consult with them remotely through secure video calls, making healthcare more accessible and convenient. Doctors benefit from streamlined appointment management and the ability to reach and treat patients beyond geographical constraints. Eezy Health aims to simplify the healthcare experience, enhancing the efficiency and effectiveness of medical consultations.
      </Text>
      <View style={styles.aboutLine} />
      <View style={styles.textAddress}>
        <View style={styles.locationCover}>
          <Locations />
        </View>
        <View style={styles.address}>
          <Text style={styles.address1}>75 Opebi Road, Ikeja, Lagos State</Text>

        </View>
      </View>
      <View style={styles.textAddress}>
        <View style={styles.locationCover}>
          <Phone />
        </View>
        <View style={styles.address}>
          <Text style={styles.address}>+234 2013 300 308</Text>

        </View>
      </View>
      <View style={styles.textAddress}>
        <View style={styles.locationCover}>
          <Info />
        </View>
        <View>
          <TouchableOpacity style={styles.address} onPress={() => Linking.openURL('mailto:iinfo@outcess.com')}>
            <Text style={styles.address}>info@outcess.com</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
};


export default AboutUs;


const styles = StyleSheet.create({

  infoContainer: {
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    flex: 1
  },

  address1: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  },
  address: {
    fontSize: 14,
    marginRight: 60,
    fontFamily: 'Poppins-Regular',
  },

  locationIcon: {
    color: colors.accent_green,
    justifyContent: 'center',
    textAlign: 'center'
  },

  locationCover: {

    marginLeft: 40,
    marginRight: 15,
  },

  textAddress: {
    flexDirection: 'row',
    paddingTop: 40,
  },

  aboutLine: {
    borderBottomColor: '#BEC3D5',
    borderBottomWidth: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
  },




  AboutUsText: {
    marginLeft: 40,
    marginTop: 40,
    fontWeight: '900',
    fontSize: 30,
    fontFamily: 'Poppins-ExtraBold'
  },
  AboutUsSubText: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Poppins-Regular'

  }
})