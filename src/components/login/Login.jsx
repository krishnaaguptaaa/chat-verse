import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // alert("Login Successful");
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Invalid email or password. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center  px-4">
      <div className="w-full max-w-md p-8  flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back!</h2>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              className="w-full rounded-md p-3 bg-[rgba(17,25,40,0.6)] text-white outline-none focus:ring-2 focus:ring-[#1f8ef1]"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              className="w-full rounded-md p-3 bg-[rgba(17,25,40,0.6)] text-white outline-none focus:ring-2 focus:ring-[#1f8ef1]"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#1f8ef1] hover:bg-blue-700 transition duration-300 text-white font-medium text-lg rounded-md py-3"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex flex-col gap-2 text-sm mt-2 text-center">
          <p className="text-gray-400 hover:underline cursor-pointer">Forgot your password?</p>
          <p className="text-gray-300">
            New to ChatVerse?{' '}
            <Link to="/signup" className="text-[#1d8cd7] hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
