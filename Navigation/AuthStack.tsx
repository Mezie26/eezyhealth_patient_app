import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPassword from '@/screens/Auth/ForgetPassword/ForgetPassword';
import ForgetpasswordSuccess from '@/screens/Auth/ForgetPassword/ForgetpasswordSuccess';
import Login from '@/screens/Auth/Login';
import OnboardingScreen from '@/screens/Auth/Onboarding/OnboardingScreen';
import SignUp from '@/screens/Auth/SignUp';
import Verification from '@/screens/Auth/Verification';
import SuccessCreated from '@/screens/SuccessScreens/SuccessCreated';
import SuccessOkay from '@/screens/SuccessScreens/SuccessOkay';
import SucessVerification from '@/screens/SuccessScreens/SucessVerification';
import AppStack from './AppStack';
import SplashScreen from '@/screens/SplashScreen';
import MedicalRecord from '@/screens/Auth/MedicalRecord';
import CurrentMedication from '@/screens/Auth/CurrentMedication';
import Allergies from '@/screens/Auth/Allergies';
import PastSurgeries from '@/screens/Auth/PastSurgeries';
import FamilyHistory from '@/screens/Auth/FamilyHistory';
import LifestyleInformation from '@/screens/Auth/LifestyleInformation';
import ResetPasswordEmail from '@/screens/Auth/ForgetPassword/ResetPasswordEmail';
import SetNewPassword from '@/screens/Auth/ForgetPassword/SetNewPassword';
import SuccessPasswordReset from '@/screens/Auth/ForgetPassword/SuccessPasswordReset';


const Stack = createNativeStackNavigator();

const AuthStack = () => {


  const screens = [
    { name: 'SplashScreen', component: SplashScreen },
    { name: 'OnboardingScreen', component: OnboardingScreen },
    { name: 'Login', component: Login },
    { name: 'SignUp', component: SignUp },
    { name: 'MedicalRecord', component: MedicalRecord},
    { name: 'CurrentMedication', component: CurrentMedication},
    { name: 'Allergies', component: Allergies},
    { name: 'PastSurgeries', component: PastSurgeries},
    { name: 'FamilyHistory', component: FamilyHistory},
    { name: 'LifestyleInformation', component: LifestyleInformation},
    { name: 'Verification', component: Verification },
    { name: 'SucessVerification', component: SucessVerification },
    { name: 'SuccessCreated', component: SuccessCreated },
    { name: 'SuccessOkay', component: SuccessOkay },
    { name: 'ForgetPassword', component: ForgetPassword },
    { name: 'SetNewPassword', component: SetNewPassword },
    { name: 'ResetPasswordEmail', component: ResetPasswordEmail },
    { name: 'SuccessPasswordReset', component: SuccessPasswordReset },
    { name: 'ForgetpasswordSuccess', component: ForgetpasswordSuccess },
    { name: 'Home', component: AppStack },
  ];
  return (
    <Stack.Navigator initialRouteName="OnboardingScreen" screenOptions={{ headerShown: false }}>
      {screens.map((screen) => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component}  />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;