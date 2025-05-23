import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import Detail from "../detail/Detail";


import "./Chat.css";

const Chat = () => {
  const [openemoji, setOpenEmoji] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState();
  const endRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // Listen to Firestore changes
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
          const chatIndex = userChatsData.chats.findIndex(
            (chat) => chat.chatId === chatId
          );

          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex].lastMsg = message;
            userChatsData.chats[chatIndex].isSeen = id === currentUser.uid;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(chatRef, {
              chats: userChatsData.chats,
            });
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
      {/* Top */}
      <div className="top flex items-center justify-between border-b border-b-[#dddddd35] p-4">
        <div className="user flex items-center gap-5">
          <img
            src={user.avatar ? user.avatar : "./profile.jpeg"}
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg">{user.username}</span>
            {/* <p className="text-sm font-light text-[#a5a5a5]">{user.bio}</p> */}
          </div>
        </div>
        <div className="icons flex gap-4">
          <svg
            onClick={() => useChatStore.getState().resetChat()}
            cursor={"pointer"}
            fill="white"
            stroke="white"
            stroke-width="10"
            height="20px"
            width="20px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 219.151 219.151"
            xml:space="preserve"
          >
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575 C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575 c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"></path>
                <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008 c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825 c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628 c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"></path>
              </g>
            </g>
          </svg>

          <img
            src="./phone.png"
            alt="phone"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            src="./video.png"
            alt="video"
            className="w-5 h-5 cursor-pointer"
          />
          <img
            onClick={() => setOpenDetail(!openDetail)}
            src="./info.png"
            alt="info"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>

      {/* Center */}
      <div className="center flex-1 flex flex-col gap-4 overflow-y-scroll p-4 no-scrollbar">
        {chat?.messages?.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.senderId === currentUser.uid
                ? "self-end message-own"
                : "self-start message"
            } flex max-w-[80%]`}
          >
            <div className="texts">
              {msg.img && (
                <img
                  src={msg.img}
                  alt="msg"
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              )}
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Bottom */}
      <div className="bottom flex items-center border-t border-t-[#dddddd35] p-4 gap-4 flex-wrap sm:flex-nowrap">
        <div className="icons flex gap-4">
          <img
            src="./img.png"
            alt="add"
            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
          />
          <div className="emoji relative">
            <img
              onClick={() => setOpenEmoji(!openemoji)}
              src="./emoji.png"
              alt="emoji"
              className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
            />
            <div className="picker absolute bottom-14 -left-14 z-10 max-w-[300px]">
              <EmojiPicker open={openemoji} onEmojiClick={handleEmoji} />
            </div>
          </div>
          {/* <img
            src="./camera.png"
            alt="camera"
            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
          />
          <img
            src="./mic.png"
            alt="mic"
            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
          /> */}
        </div>

        <div className="flex items-center flex-1 min-w-0 gap-2 relative">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="msginput w-full bg-[rgba(17,25,40,0.5)] text-white text-base rounded-lg p-2 border-none outline-none"
          />
        </div>

        <button
          onClick={handleSend}
          className="send bg-[#5183fe] text-white font-medium px-4 py-2 rounded-lg whitespace-nowrap"
        >
          Send
        </button>
      </div>

      {openDetail && <Detail />}
    </div>
  );
};

export default Chat;
