import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LinkingConfiguration from './LinkingConfiguration';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { login } from '@/features/authSlice';
import { SplashScreen } from 'expo-router';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
SplashScreen.preventAutoHideAsync();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth)

  React.useEffect(() => {
    dispatch(login());
  }, []);




  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}