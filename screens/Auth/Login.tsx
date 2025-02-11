import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormInput from "../../components/Input/FormInput";
import PasswordInput from "../../components/Input/PasswordInput";
import { button } from "../../css/button";
import { colors } from "../../css/colorsIndex";
import { useAppDispatch } from "../../hooks/useStore";
import * as Haptics from 'expo-haptics';
import Toast from "../../components/Toast";
import { login, setUserInfo } from "../../features/authSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from "../../shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { StreamChat } from 'stream-chat';
import axios from 'axios';
import { EezyLogo } from "@/assets/svg/EezyLogo";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const toastRef: any = useRef(null);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<any>(true);
  const [showPassword, setShowPassword] = useState(false);
  // Initialize Stream Chat client
  const apiKey = '4g6sfwegs7he';
  const client: any = StreamChat.getInstance(apiKey);

  const [icons, setIcons] = useState<any>("eye-off-outline");
  const togglePasswordVisiblity = () => {
    setIcons(!icons ? "eye-outline" : "eye-off-outline");
    if (icons === "eye-off-outline" && password === true) {
      setIcons("eye-outline");
      setPassword(false);
    } else {
      setIcons("eye-off-outline");
      setPassword(true);
    }
  };
  // Example handleAuthError function
  const handleAuthError = (error: any) => {
    // Safely access the error code and message
    const errorCode = error.code;
    const errorMessage = error.message;

    // Show a user-friendly error message to the user.
    switch (errorCode) {
      case "auth/invalid-email":
        toastRef.current.error("The email address you entered is invalid.");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case "auth/wrong-password":
        toastRef.current.error("The password you entered is incorrect.");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case "auth/user-not-found":
        toastRef.current.error("No user found with this email.");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case "auth/user-disabled":
        toastRef.current.error("This user account has been disabled.");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      default:
        toastRef.current.error(errorMessage);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  };




  const loginHandler = async () => {
    setisLoading(true);
    try {
      // Sign in the user with email and password using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user: any = userCredential.user;

      // Fetch user information from Firestore
      const userCollectionRef = collection(db, 'users');
      const q = query(userCollectionRef, where('uid', '==', user?.uid));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map(doc => doc.data());

      if (userData.length === 0) {
        throw new Error('User not found');
      }

      const userInfo = userData[0];
      setUserInfo(userInfo);
      await AsyncStorage.setItem('eezy-user-info', JSON.stringify(userInfo));

      // Get Stream Chat token from Firebase Cloud Function
      const { data } = await axios.post('https://us-central1-eezyhealth-2023.cloudfunctions.net/generateTokenForUser', {
        userId: user?.uid,  // Pass the user's UID
      });



      const streamToken = data.streamToken;
      if (!streamToken) {
        throw new Error('Stream Chat token not found');
      }

      // Check if the user is already connected
      if (client?.userId !== user?.uid) {
        // Disconnect if already connected
        await client.disconnectUser();

        // Connect user to Stream Chat
        await client.connectUser(
          {
            id: user?.uid,        // Firebase UID
            name: userInfo?.display_name || 'Anonymous', // Name from Firestore
            image: userInfo?.photo_url || 'https://example.com/default-avatar.png', // Optional
          },
          streamToken // Stream Chat token from Cloud Function
        );
      }
      // Store chat information in AsyncStorage
      const chatInfo = {
        chatApiKey: "4g6sfwegs7he",
        chatUserId: user?.uid,  // Use actual user ID from Firebase
        chatUserName: userInfo?.display_name || 'Anonymous',
        chatUserToken: streamToken,
      };

      await AsyncStorage.setItem('chatInfo', JSON.stringify(chatInfo));
      // Dispatch login action or navigate to the home screen
      // @ts-ignore
      dispatch(login());
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    } catch (error: any) {
      setisLoading(false);
      handleAuthError(error);
    } finally {
      setisLoading(false); // Ensure loading state is reset
    }
  };




  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
      <Toast ref={toastRef} />
      <View style={styles.container_main}>
        <View style={styles.titleContainer}>
          <EezyLogo />
          <Text style={styles.titleContainer_login_text}>Welcome back</Text>
          <Text style={styles.titleContainer_login_text2}>Welcome back! Please enter your details.</Text>
        </View>
        <Text style={styles.inputBoxHeader}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(userEmail: React.SetStateAction<string>) => setEmail(userEmail)}
          style={styles.inputBox}
          placeholder="Enter your email"
          clearButtonMode="always"
          keyboardType="email-address"
        />
        <Text style={styles.inputBoxHeader}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
          	secureTextEntry={!showPassword}
          	value={password}
          	onChangeText={setPassword}
          	placeholder="Enter password"
          	placeholderTextColor="#D1D1D1"
        	/>
        	<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          	<Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
        	</TouchableOpacity>
      	</View>
        {/*<View style={styles.address}>
          <FormInput
            label="Email Address"
            labelValue={email}
            onChangeText={(userEmail: React.SetStateAction<string>) => setEmail(userEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <PasswordInput
          label="Password"
          labelValue={password}
          onChangeText={(userPassword: React.SetStateAction<boolean>) => setPassword(userPassword)}
          onPress={togglePasswordVisiblity}
          iconType="lock"
          secureTextEntry={true}
        />*/}
        <View style={styles.address_login}>
        <TouchableOpacity onPress={() => { navigation.navigate('ForgetPassword'); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) }}>
            <Text style={styles.login_forgot_text}>Forgot Password</Text>
        </TouchableOpacity>
          <TouchableOpacity style={[button.login_account, styles.login_account]} onPress={loginHandler}>
            <Text style={button.login_account_text}>
              {isLoading ?
                <ActivityIndicator
                  color='white'
                  size={20} /> :
                "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.login_forgot_text_container}>
          <View style={styles.login_account_signup}>
            <Text style={styles.login_account_text1}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('SignUp');
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            >
              <Text style={styles.login_account_text2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Login;

const {width} = Dimensions.get("window")

const styles = StyleSheet.create({
  inputBoxHeader: {
		fontSize: 14,
		fontWeight: "500",
		fontFamily: "Inter-Medium",
		color: "#171717",
		lineHeight: 20,
    margin: 20
	},
  inputBox: {
		width: width * 0.9,
		height: 44,
		borderRadius: 12,
		marginHorizontal: width * 0.03,
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		paddingVertical: 10,
		paddingHorizontal: 14,
	},
	inputContainer: {
		width: width * 0.9,
		marginHorizontal: width * 0.03,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 0.5,
		borderColor: "#D5D5D5",
		borderRadius: 12,
		paddingHorizontal: 10,
		backgroundColor: "#fff", // Ensure a background color
	},
	input: {
		width: 320,
		height: 40,
		fontSize: 14,
		fontWeight: "400",
		fontFamily: "Inter-Regular",
	},

  address_login: {
    marginTop: 20,
  },
  address: {
    marginBottom: 10
  },

  login_account: {
    //height: 40,
    //marginTop: 10
  },
  container_main: {
    margin: 10,
  },


  or_fingerprint: {
    fontSize: 70,
    color: colors.accent_green
  },
  print_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    gap: 40,
  },
  or: {
    color: "#B0B0B0",
    fontSize: 16,
  },



  login_forgot_text_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 5,
  },
  login_account_text2: {
    color: "#44CE2D",
    fontFamily: "Inter-Medium",
    fontSize: 14,
    fontWeight: "500",
    //lineHeight: 20,
    letterSpacing: -0.5
  },
  login_account_text1: {
    color: "#363636",
    fontFamily: "Inter-Regular",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: -0.5
  },

  login_account_signup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 5,
  },


  titleContainer_login_text2: {
    color: "#363636",
    fontSize: 14,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    lineHeight: 22,
    marginTop: 10
  },

  login_forgot_text: {
    color: "#44CE2D",
    fontSize: 14,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: -0.5,
    marginBottom: 10,
    marginHorizontal: 10,
    textAlign: "right"
  },


  titleContainer_login_text: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#171717",
    fontWeight: "500",
    lineHeight: 24,
    marginTop: 20
  },

  titleContainer: {
    marginTop: 70,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    //gap: 10,
  },

  signOutContainerTwoSubtextSign: {
    fontSize: 20,
    fontWeight: "300",
    color: "#676767"
  },


  signOutContainerTwoSubtext2box1: {
    width: 48,
    height: 48,
    backgroundColor: "#262626",
    display: "flex",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center"
  },

  signOutContainerTwoSubtext2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },

  signOutContainerTwoSubtext1: {
    margin: 10,
  },

  signOutContainerTwoSub: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  signOutContainerTwo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },


  signOutContainersubtext: {
    fontSize: 24,
    marginRight: 5,
  },

  signOutContainersub: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  signOutContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 95,

  },

  userAltIconflexsub1: {
    width: "18%",
    textAlign: "center",
    padding: 20,
  },

  userAltIconflex: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#262626',
    padding: 1,
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 10,
  },

  userAltIconflex1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    marginHorizontal: 30,
    marginVertical: 1,
    borderWidth: 2,
    borderColor: '#262626',
    padding: 1,
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 10,
  },

  userAltIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginVertical: 10,
  },
  icon: {
    marginRight: 12,
  },

  loginForgot: {
    position: "absolute",
    right: 1,
    bottom: -30,
    fontSize: 17,
  },


  errorText: {
    fontSize: 10,
    color: 'red',
    marginLeft: 45,
  },
  eyeOutline: {
    position: "absolute",
    right: -28,
    bottom: 15,
  },

  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    // padding: 22,
  },


  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  text3: {
    fontSize: 16,
    textAlign: "center",
    color: "#20549D",
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
  },

  logininput: {
    height: 56,
    padding: 1,
    fontSize: 16,
    borderColor: "#262626",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#262626",
    width: 280,
    color: colors.white
  },
  logininput2: {
    height: 56,
    padding: 1,
    fontSize: 16,
    borderColor: "#262626",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#262626",
    width: 240,
    color: colors.white
  },

  logintext1: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "#20549D",
    fontWeight: "400",
    fontFamily: "Poppins-ExtraBold",
  },
  logintext2: {
    fontSize: 15,
    textAlign: "center",
    color: "#20549D",
    fontFamily: "Poppins-Regular",
  },

  text1: {
    color: colors.white,
    fontSize: 36,
    fontFamily: "Poppins-Regular",
    margin: 25,
  },


  logColor1: {
    backgroundColor: "#172748",
    width: "100%",
    paddingTop: 70
  },


});

