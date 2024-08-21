import React from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import { useSelector } from "react-redux";

const Home = () => {
    const chatId = useSelector((state) => state.userChat.chatId);
  return (
    <div className="chat-container">
      <List />
      {chatId && <Chat />}
      {/* {chatId && <Detail />} */}
    </div>
  );
};

export default Home;
