import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { setCurrentUser, setLoading } from "./store/useUserStore";

const AuthHook = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.userAuth);

  const signup = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        username
      );
      const user = userCredential.user;
      return { user };
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  const updateEmail = (email) => currentUser.updateEmail(email);
  const updatePassword = (password) => currentUser.updatePassword(password);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setLoading(true));
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const authUserDoc = await getDoc(docRef);

        if (authUserDoc.exists()) {
          dispatch(setCurrentUser(authUserDoc.data()));
          console.log("yes");
        } else {
          dispatch(setCurrentUser(null));
          console.log("no");
        }
      } else {
        dispatch(setCurrentUser(null));
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);


  return {
    currentUser,
    isLoading,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
};

export default AuthHook;
