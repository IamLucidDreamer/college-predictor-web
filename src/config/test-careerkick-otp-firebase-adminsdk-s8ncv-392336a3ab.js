// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWu2ZEL8IdZZ0CnvVh4BEgHDReXSQ-7fI",
  authDomain: "admission-careerkick.firebaseapp.com",
  projectId: "admission-careerkick",
  storageBucket: "admission-careerkick.appspot.com",
  messagingSenderId: "611357425351",
  appId: "1:611357425351:web:d4cdc6d689b41d91e508e2",
  measurementId: "G-NKNV525BD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)