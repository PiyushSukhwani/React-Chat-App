import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  chatId: null,
  user: null,
  isReceiverBlocked: false,
  isCurrentUserBlocked: false,
};

const userChatSlice = createSlice({
  name: "userChat",
  initialState,
  reducers: {
    changeChat: (state, action) => {
      const { user, chatId } = action.payload;
      const { currentUser } = action.payload;

      if (user.blocked.includes(currentUser.id)) {
        state.chatId = chatId;
        state.user = null;
        state.isCurrentUserBlocked = true;
        state.isReceiverBlocked = false;
      } else if (currentUser.blocked.includes(user.id)) {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = true;
      } else {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = null;
        state.isReceiverBlocked = false;
      }
    },

    changeBlock: (state, action) => {
      state.isReceiverBlocked = !state.isReceiverBlocked;
    },
  },
});

export const { changeChat, changeBlock } = userChatSlice.actions;
export default userChatSlice.reducer;
