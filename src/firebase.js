// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_T8rdegLHk_o32RS7-pl5Oaxu0l6I-Wc",
  authDomain: "wa-web-status-download.firebaseapp.com",
  projectId: "wa-web-status-download",
  storageBucket: "wa-web-status-download.appspot.com",
  messagingSenderId: "359789584516",
  appId: "1:359789584516:web:689c5646607ca13c8ea2d1",
  measurementId: "G-9ZLE2JEEXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);