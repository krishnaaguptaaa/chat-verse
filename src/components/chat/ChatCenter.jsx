// components/chat/ChatCenter.jsx
import React, { useRef, useEffect } from "react";

const ChatCenter = ({ chat, currentUser }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  return (
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
  );
};

export default ChatCenter;
