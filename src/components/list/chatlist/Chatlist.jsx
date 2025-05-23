import React from "react";
import "./Chatlist.css";
import { useState } from "react";
import Adduser from "./adduser/Adduser";
import { useUserStore } from "../../../lib/userStore";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { getDoc } from "firebase/firestore";
import { useChatStore } from "../../../lib/chatStore";
const Chatlist = () => {
  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();
  const [chats, setChats] = useState([]);
  const [addmode, setaddmode] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.uid),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const userData = userDocSnap.data();

          return { ...item, userData };
        });
        const chatList = await Promise.all(promises);
        setChats(chatList.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.uid]);

  const handleSelect = async (chat) => {
    if (!chat.chatId || !chat.userData || !chat.userData.uid) {
      console.error("Invalid chat or user data", chat);
      return; // Guard clause to prevent errors
    }

    console.log("Selected chat:", chat);
    changeChat(chat.chatId, chat.userData);
  };

  return (
    <div className="chatbox flex-1 overflow-y-scroll no-scrollbar">
      <div className="chatlist">
        <div className="sb bg-[rgba(17,25,40,0.5)] flex-1 rounded-[10px] gap-5 flex items-center">
          <img
            src="./search.png"
            alt="search"
            className="w-5 h-5 cursor-pointer "
          />
          <input
            className="border-none outline-none flex-1"
            type="text"
            placeholder="Search"
          />
        </div>
        <img
          onClick={() => setaddmode(!addmode)}
          src={addmode ? "./minus.png" : "./plus.png"}
          alt="more"
          className="add w-9 h-9  bg-[rgba(17,25,40,0.5)] rounded-[10px] cursor-pointer"
        />
      </div>
      {chats.map((chat) => (
        <div
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          className="item flex items-center gap-5 cursor-pointer"
        >
          <img
            className="w-[50px] h-[50px] rounded-[50%] object-cover"
            src={chat.userData.avatar ? chat.userData.avatar : "./profile.jpeg"}
            alt="status"
          />

          <div className="flex flex-col gap-[10px]">
            <span className="font-medium">{chat.userData.username}</span>
            <p className="text-[14px] font-light">{chat.lastMsg}</p>
          </div>
        </div>
      ))}

      {addmode && <Adduser />}
    </div>
  );
};

export default Chatlist;
