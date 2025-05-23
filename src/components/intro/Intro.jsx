import React from 'react';
import { Link } from 'react-router-dom'; 

const Intro = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 md:px-10 text-white text-center bg-transparent">
      <div className="max-w-3xl w-full space-y-6 md:space-y-8 py-10 md:py-16 rounded-[16px]">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold animate-fade-in leading-tight">
          Welcome to <span className="text-[#1f8ef1]">ChatVerse</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 px-2 md:px-0">
          Connect, chat, and share with friends instantly. Join the conversation and stay connected anytime, anywhere.
        </p>

        <Link
          to="/signup"
          className="inline-block bg-[#1f8ef1] hover:bg-blue-700 transition-all duration-300 py-3 px-8 rounded-full text-base sm:text-lg font-semibold shadow-lg"
        >
          Get Started
        </Link>

        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1f8ef1] hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Intro;
