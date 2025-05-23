import React from 'react';
import { useState } from 'react';
import { useUserStore } from '../../../lib/userStore';
import {doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './EditModal.css'
const EditModal = () => {
  const {currentUser,fetchUserInfo} = useUserStore();
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initial = currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'A';

 const handleImageUpload = async () => {
  if (!image) return null;

  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  );

  return res.data.secure_url;
};

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let avatar = currentUser.avatar;
  
      if (image) {
        avatar = await handleImageUpload(); // Upload new image and get new URL
      }
  
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        bio,
        username,
        avatar, // update avatar field directly
      });
  
      fetchUserInfo(currentUser.uid); // Refresh store
      navigate('/'); // Redirect
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
    
  return (
    <div className='editbox flex flex-col items-center justify-center h-full w-full'>
         <h2 className="mainhead text-3xl font-bold ">Edit Profile</h2>
         <div className="flex flex-col gap-4">
         <div className='flex items-center gap-5'>
         <div className='w-[80px] h-[80px] rounded-full bg-[rgba(17,25,40,0.6)] flex items-center justify-center overflow-hidden'>
  {image || currentUser.avatar ? (
    <img
      src={image ? URL.createObjectURL(image) : currentUser.avatar}
      alt="avatar"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white font-medium text-3xl">
      {initial}
    </span>
  )}
</div>

                    <label className="cursor-pointer hover:text-gray-500 text-sm font-medium underline text-gray-300" htmlFor="photo">  {image ? "Change Image" : "Upload an Image"}</label>
                    <input onChange={(e)=>setImage(e.target.files[0])} className='hidden' type="file" name='avatar' id='photo'/>
                    </div>
                    <div>
                    <label className="text-sm font-medium text-gray-300">Username</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} className='w-full rounded-md border-none outline-none bg-[rgba(17,25,40,0.6)] text-white' type="text" placeholder='Edit your Username' name='username'/>  
                    </div>
                    <div>
                    <label className="text-sm font-medium text-gray-300">Bio</label>
                    <input value={bio} onChange={(e)=>setBio(e.target.value)} className='w-full rounded-md border-none outline-none bg-[rgba(17,25,40,0.6)] text-white' type="text" placeholder='Add Bio' name='bio'/>  
                    </div>
          
        <button onClick={handleSave} disabled={isLoading}
        >
        {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default EditModal