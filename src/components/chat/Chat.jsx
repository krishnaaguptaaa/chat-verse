import React, { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import Detail from "../detail/Detail";
import ChatTop from "./ChatTop";
import ChatCenter from "./ChatCenter";
import ChatBottom from "./ChatBottom";

import "./Chat.css";

const Chat = () => {
  const [openemoji, setOpenEmoji] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState();

  useEffect(() => {
    if (!chatId) return;
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      const data = res.data();
      if (data) {
        setChat(data);
      }
    });
    return () => unSub();
  }, [chatId]);

  const handleEmoji = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setOpenEmoji(false);
  };

  const handleSend = async () => {
    if (message === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.uid,
          text: message,
          createdAt: new Date(),
        }),
      });

      const userIds = [currentUser.uid, user.uid];
      userIds.forEach(async (id) => {
        const chatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(chatRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex((chat) => chat.chatId === chatId);
          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex].lastMsg = message;
            userChatsData.chats[chatIndex].isSeen = id === currentUser.uid;
            userChatsData.chats[chatIndex].updatedAt = Date.now();
            await updateDoc(chatRef, { chats: userChatsData.chats });
          }
        }
      });
    } catch (err) {
      console.error(err);
    }

    setMessage("");
  };

  return (
    <div className="chat flex-2 flex flex-col">
      <ChatTop user={user} setOpenDetail={setOpenDetail} />
      <ChatCenter chat={chat} currentUser={currentUser} />
      <ChatBottom
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        openemoji={openemoji}
        setOpenEmoji={setOpenEmoji}
        handleEmoji={handleEmoji}
      />
      {openDetail && <Detail />}
    </div>
  );
};

export default Chat;
