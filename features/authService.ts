import AsyncStorage from '@react-native-async-storage/async-storage'; 
 
 
 
 
 
// Login user 
const login = async ( ) => { 
  const userInfo:any = await AsyncStorage.getItem('eezy-user-info')   
  return JSON.parse(userInfo)
}
  

// Logout
export const logout = () => {
  AsyncStorage.removeItem('eezy-user-info')
}
 
  

const authService = { 
  logout,
  login,  
   
}

export default authService
