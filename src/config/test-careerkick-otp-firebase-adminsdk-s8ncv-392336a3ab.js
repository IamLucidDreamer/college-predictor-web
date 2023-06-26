// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvX_osu5VSr4ice6gTr0Y7ZT9jiZADyqM",
  authDomain: "test-careerkick-otp.firebaseapp.com",
  projectId: "test-careerkick-otp",
  storageBucket: "test-careerkick-otp.appspot.com",
  messagingSenderId: "564663081460",
  appId: "1:564663081460:web:4b2d7d376ba46a6aa681a1",
  measurementId: "G-D4KF3ZK6M3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)