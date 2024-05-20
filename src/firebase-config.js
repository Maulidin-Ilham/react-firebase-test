import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9BV51TWMhe8dA6lXgRq_NfZRPxggJm1I",
  authDomain: "react-vite-firebase-84570.firebaseapp.com",
  projectId: "react-vite-firebase-84570",
  storageBucket: "react-vite-firebase-84570.appspot.com",
  messagingSenderId: "994159189357",
  appId: "1:994159189357:web:ceef9fc2e0728a2be64e64",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
