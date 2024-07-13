import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// initial state
const initialState = {
  currentUser: null,
  isLoading: true,
};

// Async thunk to fetch user info from Firestore
export const fetchUserInfo = createAsyncThunk(
  'userAuth/fetchUserInfo',
  async (uid, thunkAPI) => {
    try {
      if (!uid) {
        return null;
      }
      
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
);

// userAuth slice
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    // Add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true; // Set loading state to true when fetch starts
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false when fetch succeeds
        state.currentUser = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false; // Set loading state to false when fetch fails
        state.currentUser = null;
      });
  },
});

export default userAuthSlice.reducer;