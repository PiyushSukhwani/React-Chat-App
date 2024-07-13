import React from 'react'
import "./userInfo.css"
import { useSelector } from 'react-redux'

function Userinfo() {
  const currentUser = useSelector((state) => state.userAuth.currentUser)
  return (
    <div className='userInfo'>
        <div className='user'>
            <img src={currentUser.avatar || "./avatar.png"} alt="" />
            <h2>{currentUser.username}</h2>
        </div>
        <div className='icons'>
            <img src="./more.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./edit.png" alt="" />
        </div>
    </div>
  )
}

export default Userinfo