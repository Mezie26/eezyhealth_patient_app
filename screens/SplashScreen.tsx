import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';

const SplashScreenWidth = Dimensions.get('window').width + 250;

const SplashScreen = ({ navigation }: any) => {
 setTimeout(() => {
  navigation.replace('OnboardingScreen');
 }, 5000);

 return (
  <View style={[styles.splashContainer, { width: SplashScreenWidth }]}>
   <Text>
    yes
   </Text>
  </View>
 );
};

export default SplashScreen;

const styles = StyleSheet.create({
 splashContainer: {
  flex: 1,
  backgroundColor: '#fff',
 },
});
