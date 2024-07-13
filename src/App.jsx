import React, { useEffect } from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
// import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "./store/useUserStore";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userAuth.isLoading);
  const currentUser = useSelector((state) => state.userAuth.currentUser);
  const chatId = useSelector((state) => state.userChat.chatId)

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          await dispatch(fetchUserInfo(user.uid));
        } else {
          dispatch(fetchUserInfo(null)); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    });

    return () => {
      unSub();
    };
  }, [dispatch]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {/* {chatId && <Detail />} */}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );  
}

export default App;