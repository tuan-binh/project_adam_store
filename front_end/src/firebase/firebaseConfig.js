// Import the functions you need from the SDKs you need

import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQZDHu0FjgmneTvWkaDIU4e1puQq7STJY",
  authDomain: "testupload-31e66.firebaseapp.com",
  projectId: "testupload-31e66",
  storageBucket: "testupload-31e66.appspot.com",
  messagingSenderId: "135444517507",
  appId: "1:135444517507:web:89eda4c5bdd9c930d881b6",
  measurementId: "G-PG1YTLF3ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);