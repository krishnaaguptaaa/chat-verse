import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

   // const [avatar,setAvatar]=useState(
    //     {
    //         file:null,
    //         url:""
    //     }
    // );
    // const handleAvatar = (e)=>{
    //     const file=e.target.files[0];
    //     if(file){
    //         setAvatar({
    //             file:file,
    //             url:URL.createObjectURL(file)
    //         });
    //     }
    // }
    // const initial = username ? username.charAt(0).toUpperCase() : 'A';


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', res.user.uid), {
        username,
        email,
        avatar: '',
        uid: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, 'userchats', res.user.uid), {
        chats: [],
      });

      // You can add navigation or success handling here
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try logging in or use a different email.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    }
  };

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center  px-4">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create an Account</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-md border-none outline-none bg-[rgba(17,25,40,0.6)] text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-md border-none outline-none bg-[rgba(17,25,40,0.6)] text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-md border-none outline-none bg-[rgba(17,25,40,0.6)] text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full font-medium text-lg bg-[#1f8ef1] hover:bg-blue-700 text-white py-3 rounded-md cursor-pointer transition-all"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <p className="text-center text-white mt-4 text-sm md:text-base">
          Already have an account?{' '}
          <Link to="/login" className="text-[#1d8cd7] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
