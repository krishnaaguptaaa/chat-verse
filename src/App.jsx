import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
// Components
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
// import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Intro from "./components/intro/Intro";
import EditModal from "./components/list/userinfo/EditModal";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  // const{chatId}=useChatStore();
  // console.log(chatId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid || null);
    });

    return () => unsubscribe();
  }, [fetchUserInfo]);
  console.log(currentUser);

  if (isLoading)
    return (
      <div
        className="
        flex items-center justify-center"
      >
        <span className="loader"></span>
      </div>
    );

  return (
    <div
      className="w-[100vw] h-[100vh] 
      border border-[rgba(255,255,255,0.1)] 
      rounded-[16px] 
      backdrop-blur-[20px] 
      backdrop-saturate-[180%]
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Navigate to="/home" /> : <Intro />}
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/home" /> : <Signup />}
          />
          <Route
            path="/home"
            element={currentUser ? <HomeLayout /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-profile"
            element={currentUser ? <EditModal /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

const HomeLayout = () => {
  const { chatId } = useChatStore();

  return (
    <div className="flex w-full h-full">
      {/* Left panel: 30% width */}
      <div
        className={`h-full ${
          chatId ? "hidden md:block md:w-[30%]" : "md:w-[30%]"
        }`}
      >
        <List />
      </div>

      {/* Right panel: 70% width when chatId exists, full width on small screens */}
      <div
        className={`h-full md:w-[70%] ${
          chatId ? "w-full md:w-[70%]" : "hidden md:block "
        }`}
      >
        {chatId ? (
          <Chat />
        ) : (
          <div
            className="flex items-center justify-center h-full
            border-l border-l-[#dddddd35] text-[#a5a5a5] text-lg font-medium"
          >
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
