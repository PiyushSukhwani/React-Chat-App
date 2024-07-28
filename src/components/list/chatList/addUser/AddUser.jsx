import React, { useState } from "react";
import "./addUser.css";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useSelector } from "react-redux";

function AddUser({setAddMode}) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const currentUser = useSelector((state) => state.userAuth.currentUser);

  const handleAdd = async (e) => {
    if (currentUser.username === userName) return;
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    const currentUserId = currentUser.id.substring(0, 15);
    const userId = user.id.substring(0, 15);
    const combinedId =
      currentUserId > userId ? currentUserId + userId : userId + currentUserId;

    try {
      const res = await getDoc(doc(chatRef, combinedId));

      if (res.exists()) {
        return;
      } else {
        // const newChatRef = doc(chatRef, combinedId);

        await setDoc(doc(chatRef, combinedId), {
          createdAt: serverTimestamp(),
          messages: [],
        });

        await updateDoc(doc(userChatsRef, user.id), {
          chats: arrayUnion({
            chatId: combinedId,
            lastMessage: "",
            receiverId: currentUser.id,
            updatedAt: Date.now(),
          }),
        });

        await updateDoc(doc(userChatsRef, currentUser.id), {
          chats: arrayUnion({
            chatId: combinedId,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Date.now(),
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const queryUserName = formData.get("username");
    setUserName(queryUserName);

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", queryUserName));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      <div className="cross">
        <img src="cross3.png" alt="" onClick={() => setAddMode(false)}/>
      </div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Enter username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
}

export default AddUser;
