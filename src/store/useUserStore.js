import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// initial state
const initialState = {
  // authStatus: false,
  currentUser: null,
  isLoading: true,
};

// Async thunk to fetch user info from Firestore
export const fetchUserInfo =
  createAsyncThunk();
  // "userAuth/fetchUserInfo",
  // async (uid) => {
  //   try {
  //     if (!uid) {
  //       return null;
  //     }

  //     const docRef = doc(db, "users", uid);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       return docSnap.data();
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     throw error;
  //   }
  // }

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      console.log("store credentials", state.currentUser, state.isLoading);
    },

    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUserInfo.pending, (state) => {
  //       state.isLoading = true; // Set loading state to true when fetch starts
  //     })
  //     .addCase(fetchUserInfo.fulfilled, (state, action) => {
  //       state.isLoading = false; // Set loading state to false when fetch succeeds
  //       state.currentUser = action.payload;
  //       state.authStatus = true;
  //     })
  //     .addCase(fetchUserInfo.rejected, (state) => {
  //       state.isLoading = false; // Set loading state to false when fetch fails
  //       state.currentUser = null;
  //       state.authStatus = false;
  //     });
  // },
});

export const { setCurrentUser, setLoading } = userAuthSlice.actions;
export default userAuthSlice.reducer;
