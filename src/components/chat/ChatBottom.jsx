// components/chat/ChatBottom.jsx
import React from "react";
import EmojiPicker from "emoji-picker-react";

const ChatBottom = ({
  message,
  setMessage,
  handleSend,
  openemoji,
  setOpenEmoji,
  handleEmoji,
}) => {
  return (
    <div className="bottom flex items-center border-t border-t-[#dddddd35] p-4 gap-4 flex-wrap sm:flex-nowrap">
      <div className="icons flex gap-4">
        <img src="./img.png" alt="add" className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
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
  );
};

export default ChatBottom;
