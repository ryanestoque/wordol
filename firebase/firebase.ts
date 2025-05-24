// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtX7K448fewYDhVfjsZitAWqbPTSvMAP8",
  authDomain: "wordol.firebaseapp.com",
  projectId: "wordol",
  storageBucket: "wordol.firebasestorage.app",
  messagingSenderId: "742222147069",
  appId: "1:742222147069:web:aacb066a830c59b1053d94",
  measurementId: "G-EY3NVKDJGZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);