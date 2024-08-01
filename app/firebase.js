// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxixyFC_I4yf8sHFKb6c-PzGyRySpDcy8",
  authDomain: "pantry-tracker-22cb8.firebaseapp.com",
  projectId: "pantry-tracker-22cb8",
  storageBucket: "pantry-tracker-22cb8.appspot.com",
  messagingSenderId: "1084631880833",
  appId: "1:1084631880833:web:9e962a047490384804a980",
  measurementId: "G-YFTW2XW4HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)