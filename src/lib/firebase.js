import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged, updateEmail, updatePassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: "react-chat-apllication.firebaseapp.com",
  // projectId: "react-chat-apllication",
  // storageBucket: "react-chat-apllication.appspot.com",
  // messagingSenderId: "225150547435",
  // appId: "1:225150547435:web:e17d89c62251d69a42d5ae"

  authDomain: "chatapp-a2a85.firebaseapp.com",
  projectId: "chatapp-a2a85",
  storageBucket: "chatapp-a2a85.appspot.com",
  messagingSenderId: "1080932165160",
  appId: "1:1080932165160:web:52c4e82972448fa640b71d"
};

const app = initializeApp(firebaseConfig);

 const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged }
