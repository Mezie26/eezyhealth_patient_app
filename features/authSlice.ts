import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
 import AsyncStorage from '@react-native-async-storage/async-storage';
   
const initialState:any = { 

  user:   null,
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '',  
 
}
 

// Login user
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    return await authService.login()

  } catch (error: any) {  
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||error.response.data.errors[0].message
      error.message ||
      error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

 

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {   
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''  
    },

      setUserInfo: (state, action) => {
      state.user = action.payload
    },

    logoutUser: state => {
      AsyncStorage.removeItem('eezy-user-info')
      state.user = null
    }
  },

  extraReducers: (builder) => {
    builder
      //  Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload 
      }) 
      .addCase(login.rejected, (state:any, action) => {
        state.isLoading  = false
        state.isError  = true
        state.message  = action.payload
        state.data  = [] 
      })

        .addCase(logout.fulfilled, (state) => {
        state.user = null 
        state.userToken = null 
      })
      
 
      
  },
})

export const { reset ,setUserInfo ,logoutUser} = authSlice.actions
export default authSlice.reducer




 