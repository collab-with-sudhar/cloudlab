// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore';
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUGEgGHKjPmySYKRjkddFRqjKoi1zzirY",
  authDomain: "terminal-eb5ea.firebaseapp.com",
  projectId: "terminal-eb5ea",
  storageBucket: "terminal-eb5ea.firebasestorage.app",
  messagingSenderId: "92747730635",
  appId: "1:92747730635:web:8de14ed5d1ab2a6285554e",
  measurementId: "G-N257466FR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);
