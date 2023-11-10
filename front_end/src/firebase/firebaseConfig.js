// Import the functions you need from the SDKs you need

import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa7nY3QuL3860QQBWUjyuryBY6uCG15ps",
  authDomain: "adamstore-435c7.firebaseapp.com",
  projectId: "adamstore-435c7",
  storageBucket: "adamstore-435c7.appspot.com",
  messagingSenderId: "378325288235",
  appId: "1:378325288235:web:a1702585b6e95556b6316e",
  measurementId: "G-GZKXR8B1S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);