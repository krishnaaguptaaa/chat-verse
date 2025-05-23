import React from 'react';
import './Userinfo.css';
import { useUserStore } from '../../../lib/userStore';
import { auth } from '../../../lib/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Userinfo = () => {
    const navigate = useNavigate();
   const {currentUser} = useUserStore();
   const [openOptions, setOpenOptions] = useState(false);
   const initial = currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'A';
  return (
    <div className="userinfo">
      <div className="flex items-center gap-5">
      {currentUser.avatar ? (
                        <img src={currentUser.avatar}
                        alt="avatar" className="w-[50px] h-[50px] rounded-[50%] object-cover cursor-pointer"
                     />):(
                        <div className='w-[50px] h-[50px] rounded-[50%] bg-[rgba(17,25,40,0.6)] flex items-center justify-center text-white font-medium text-3xl cursor-pointer'>
                            {initial}
                        </div>
                        )
                        }
        {/* <img src="./avatar.png" alt="avatar" className="w-[50px] h-[50px] rounded-full object-cover" /> */}
        {/* <div className='w-[50px] h-[50px] object-cover rounded-full bg-[rgba(17,25,40,0.6)] flex items-center justify-center text-white font-medium text-2xl cursor-pointer'>
                            {initial}
                        </div> */}
                        <div className='flex flex-col'>
                        <h2 className='font-bold text-lg'>{currentUser.username}</h2>
                        <span className='font-light text-sm text-gray-400'>{currentUser.bio}</span>
                        </div>
        
      </div>
      <div className="flex gap-4">
      <div className="relative">
  <img
    src="./more.png"
    alt="more"
    className="w-5 h-5 cursor-pointer"
    onClick={() => setOpenOptions(!openOptions)}
  />

  {openOptions && (
    <div className="options absolute flex flex-col gap-5 right-0 top-6 bg-[rgba(17,25,40,0.4)] shadow-lg  rounded text-sm z-10">
      <div className="cursor-pointer p-1">View Profile</div>
      <div className="cursor-pointer  p-1">Settings</div>
      <div className="cursor-pointer  p-1">Help</div>
    </div>
  )}
</div>
        <svg onClick={()=>navigate("/edit-profile")} className='w-5 h-5 cursor-pointer' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zM16.045 4.401l1.587 1.585-1.59 1.584-1.586-1.585L16.045 4.401zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zM4 20H20V22H4z"></path></svg>
        
        <svg onClick={()=>auth.signOut()} className='w-5 h-5 cursor-pointer' stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      </div>
    </div>
  );
};

export default Userinfo;
