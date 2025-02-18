import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {  initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR6sB-kXz28VKj_YkcsVCXwGJzbLowYlk",
  authDomain: "eezyhealth-2023.firebaseapp.com",
  projectId: "eezyhealth-2023",
  storageBucket: "eezyhealth-2023.appspot.com",
  messagingSenderId: "72049647211",
  appId: "1:72049647211:web:7271047f3e1bea7c031b2e",
  measurementId: "G-7YPEH921Y7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Initialize Auth with persistence
// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// Initialize Firestore
const db = getFirestore(app);

export { auth, db ,storage };