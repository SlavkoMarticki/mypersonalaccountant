import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOZOdYNRlNmfVuCnehTQcCmqyiUcThX-E",
  authDomain: "mypersonalaccountant-b2463.firebaseapp.com",
  projectId: "mypersonalaccountant-b2463",
  storageBucket: "mypersonalaccountant-b2463.appspot.com",
  messagingSenderId: "893261272573",
  appId: "1:893261272573:web:e55fc185df84ea7c377594",
  measurementId: "G-BDJ62W7C2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();