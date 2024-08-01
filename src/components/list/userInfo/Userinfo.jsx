import React from "react";
import "./userInfo.css";
import { useSelector } from "react-redux";
import { auth } from "../../../lib/firebase";

function Userinfo() {
  const currentUser = useSelector((state) => state.userAuth.currentUser);
  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
        <div className="icons">
          <img src="./edit.png" alt="" />
        </div>
      </div>
      <button className="logout" onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
}

export default Userinfo;
