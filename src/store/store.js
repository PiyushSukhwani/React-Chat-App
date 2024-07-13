import { configureStore } from "@reduxjs/toolkit";
import useUserStore from "./useUserStore";
import useChatStore from "./useChatStore";

const store = configureStore({
  reducer: {
    userAuth: useUserStore,
    userChat: useChatStore,
  },
});

export default store;