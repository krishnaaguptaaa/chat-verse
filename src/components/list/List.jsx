import React from 'react'
import Userinfo from './userinfo/userinfo'
import Chatlist from './chatlist/chatlist'
// import './list.css'
const List = () => {
  return (
    <div className='list flex-[1.2] flex flex-col'>
        <Userinfo/>
        <Chatlist/>
    </div>
  )
}

export default List;