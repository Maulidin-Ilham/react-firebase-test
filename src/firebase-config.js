import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwYoAZASrvBJuM9gRdSuyrS9S8S-TQX1Y",
  authDomain: "react-firebase-test-dfa14.firebaseapp.com",
  projectId: "react-firebase-test-dfa14",
  storageBucket: "react-firebase-test-dfa14.appspot.com",
  messagingSenderId: "775207407321",
  appId: "1:775207407321:web:9ac5b1ee0d3395418938c8",
  measurementId: "G-8HKTHP3NYQ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
