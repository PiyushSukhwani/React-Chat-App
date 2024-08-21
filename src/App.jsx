import React, { useEffect, useState } from "react";
// import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { Provider, useDispatch, useSelector } from "react-redux";
// import { fetchUserInfo } from "./store/useUserStore";
import Register from "./components/register/Register";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import store from "./store/store";
import PrivateRoute from "./components/AuthLayout";
import Home from "./Home";

function App() {
  // const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.userAuth.isLoading);
  const [isLoading, setLoading] = useState(true);
  // const currentUser = useSelector((state) => state.userAuth.currentUser);
  // const chatId = useSelector((state) => state.userChat.chatId);

  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, async (user) => {
  //     try {
  //       if (user) {
  //         await dispatch(fetchUserInfo(user.uid));
  //       } else {
  //         dispatch(fetchUserInfo(null));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [dispatch]);

  // if (isLoading) return <div className="loading">Loading...</div>;

  // return (
  //   <div>
  //     {currentUser ? (
  //       <div className="chat-container">
  //         <List />
  //         {chatId && <Chat />}
  //         {/* {chatId && <Detail />} */}
  //       </div>
  //     ) : (
  //       <Register />
  //     )}
  //     <Notification />
  //   </div>
  // );

  // return !isLoading ? (
  //   <div>
  //     <Outlet />
  //   </div>
  // ) : null;

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
