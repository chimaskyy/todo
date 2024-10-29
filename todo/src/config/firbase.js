// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGUPp_nt6kUz968_5-a5N44SbL4S9Vw1g",
  authDomain: "todo-d19d9.firebaseapp.com",
  projectId: "todo-d19d9",
  storageBucket: "todo-d19d9.appspot.com",
  messagingSenderId: "524589850934",
  appId: "1:524589850934:web:0a1d1dcf5e18d2e83c5397",
  measurementId: "G-67EYGP81MB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);