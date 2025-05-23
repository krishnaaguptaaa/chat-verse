import React, { useState } from "react";
import "./adduser.css";
import { db } from "../../../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";
import { arrayUnion } from "firebase/firestore";

const Adduser = () => {
  const { currentUser } = useUserStore();
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [username, setUsername] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUser({ id: userDoc.id, ...userDoc.data() });
        setNotFound(false);
      } else {
        setUser(null);
        setNotFound(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMsg: "",
          receiverId: currentUser.uid,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMsg: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      setUser(null);
      setUsername("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addUser bg-[rgba(17,25,40,0.80)] rounded-[10px] p-4 mt-4 mx-2 sm:mx-4">
      <form
        onSubmit={handleSearch}
        className="addform flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          className="flex-1 px-3 py-2 rounded-md outline-none"
        />
        <button
          type="submit"
          className="rounded-[10px] bg-[#1a73e8] text-white px-4 py-2 sm:py-0"
        >
          Search
        </button>
      </form>

      {user && (
        <div className="alluser flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div className="detail flex items-center gap-4">
            <img
              className="w-[50px] h-[50px] object-cover rounded-full"
              src={user.avatar || "./avatar.png"}
              alt="avatar"
            />
            <span className="font-medium text-white">{user.username}</span>
          </div>
          <button
            onClick={handleAdd}
            className="rounded-[10px] bg-[#1a73e8] text-white px-4 py-2"
          >
            Add User
          </button>
        </div>
      )}

      {notFound && (
        <div className="text-center text-red-500 mt-4 font-medium">
          User not found
        </div>
      )}
    </div>
  );
};

export default Adduser;
