import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-apllication.firebaseapp.com",
  projectId: "react-chat-apllication",
  storageBucket: "react-chat-apllication.appspot.com",
  messagingSenderId: "225150547435",
  appId: "1:225150547435:web:e17d89c62251d69a42d5ae"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore()
export const storage = getStorage()