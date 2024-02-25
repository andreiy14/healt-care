// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtTF8OdJGf7TngbEvG_ATKCxyL-Ysara4",
  authDomain: "health-care-525bd.firebaseapp.com",
  projectId: "health-care-525bd",
  storageBucket: "health-care-525bd.appspot.com",
  messagingSenderId: "927400115373",
  appId: "1:927400115373:web:90745ac80e765c5b761a24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

