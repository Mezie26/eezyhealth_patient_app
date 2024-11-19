import AsyncStorage from '@react-native-async-storage/async-storage';

let user; // Declare user at the top level to make it accessible outside the try block

export async function getUserAuthorizationConfig() {
  try {
    const info = await AsyncStorage.getItem('userfutti');
    if (!info) {
      throw new Error('User information not found in AsyncStorage');
    }

    user = JSON.parse(info);
    if (!user || !user.idToken) {
      throw new Error('User information or idToken is missing or invalid.');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.idToken}`,
      },
    };

    return config;
  } catch (error) {
    console.error('Error while getting user authorization config:', error);
    return null; // You can return null or handle the error in your application logic.
  }
}
