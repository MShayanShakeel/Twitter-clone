// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore  } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDOtdg0K21KzHTKLI47lRwJ1nT-XVU8eB8",
  authDomain: "twitter-clone-8839b.firebaseapp.com",
  projectId: "twitter-clone-8839b",
  storageBucket: "twitter-clone-8839b.appspot.com",
  messagingSenderId: "573639999923",
  appId: "1:573639999923:web:151f48d0db6ccdc2408bc6",
  measurementId: "G-40DP024LNE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const imgDB = getStorage(app);
const txtDB = getFirestore(app);
const db = getFirestore(app);

export { app, auth, imgDB, txtDB , db };
