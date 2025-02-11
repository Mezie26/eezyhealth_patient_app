// styles.js
import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './colorsIndex';

const {width} = Dimensions.get("window");

export const button = StyleSheet.create({
  login_account: {
    //padding: 15,
    marginTop: 10,
    marginBottom: 10,
    width: width * 0.9,
    marginHorizontal: width * 0.03,
    height: 40,
    borderRadius: 12,
    backgroundColor:  colors.accent_green,
    justifyContent: 'center',
    alignItems: 'center',
    //shadowColor: "#000",
    //shadowOffset: {
     // width: 0,
    //  height: 2,
    //},
    //shadowOpacity: 0.25,
    //shadowRadius: 3.84,
    //elevation: 5, // for Android
	},
	
	 login_account_text: {
    textAlign: 'center',
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Inter_Medium",
    fontWeight: "500",
    lineHeight: 20
  },
});
