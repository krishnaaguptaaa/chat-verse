import React from 'react'
import './Detail.css'
import { useChatStore } from '../../lib/chatStore';

const Detail = () => {
  const{user}=useChatStore();
  return (
    <div className='flex-[1.5] detailbox bg-[rgba(17,25,40,0.80)]'>
      <div className="userinfo flex flex-col items-center gap-4 border-b border-b-[#dddddd35]">
        <img className='h-[100px] w-[100px] rounded-[50%] object-cover' src={user.avatar?user.avatar :"./avatar.png"} alt="" />
        <h2>{user.username}</h2>
        <p>{user.bio}</p>
      </div>

      <div className="optionsInfo flex flex-col gap-4">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img className='w-[30px] h-[30px] rounded-[50%] object-cover bg-[rgba(17,25,40,0.5)]' src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img  className='w-[30px] h-[30px] rounded-[50%] object-cover bg-[rgba(17,25,40,0.5)]'  src="./arrowUp.png" alt="" />
          </div>
        </div>

        {/* <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img  className='w-[30px] h-[30px] rounded-[50%] object-cover bg-[rgba(17,25,40,0.5)]' src="./arrowDown.png" alt="" />
          </div>
          <div className="photos flex flex-col gap-5">
          <div className="photoItem">
            <div className="photoDetail">
            <img className='w-[60px] h-[40px] rounded-md object-cover' src="https://images.thedirect.com/media/article_full/rick-and-morty-season-8.jpg" alt="" />
            <span>photo_2025_2.png</span>
            </div>
            <svg className='text-xl' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </div>
          <div className="photoItem">
            <div className="photoDetail">
            <img className='w-[60px] h-[40px] rounded-md object-cover' src="https://images.thedirect.com/media/article_full/rick-and-morty-season-8.jpg" alt="" />
            <span>photo_2025_2.png</span>
            </div>
            <svg  className='text-xl' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </div>
          <div className="photoItem">
            <div className="photoDetail">
            <img className='w-[60px] h-[40px] rounded-md object-cover' src="https://images.thedirect.com/media/article_full/rick-and-morty-season-8.jpg" alt="" />
            <span>photo_2025_2.png</span>
            </div>
            <svg  className='text-xl' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </div>
          <div className="photoItem">
            <div className="photoDetail">
            <img className='w-[60px] h-[40px] rounded-md object-cover' src="https://images.thedirect.com/media/article_full/rick-and-morty-season-8.jpg" alt="" />
            <span>photo_2025_2.png</span>
            </div>
            <svg  className='text-xl' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </div>
          </div>
        </div> */}
      

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img  className='w-[30px] h-[30px] rounded-[50%] object-cover bg-[rgba(17,25,40,0.5)]' src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button className='blockbtn mt-4 p-3 bg-[rgba(230,74,105,0.553)] hover:bg-[rgba(220,20,60,0.796)] border-none rounded-md cursor-pointer'>Block User</button>
      </div>
    </div>
  )
}

export default Detail;