import React from 'react'
import Userinfo from './userinfo/Userinfo'
import Chatlist from './chatlist/Chatlist'
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