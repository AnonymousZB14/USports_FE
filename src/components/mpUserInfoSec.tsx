import React from 'react'
import Avatar from './avatar'
import UserInfoSec from './userInfoSec'

const MpUserInfoSec = () => {
  return (
    <>
      <div className="basicInfo">
        <Avatar />
        <div>
          <h4>Username</h4>
          <p>@userId</p>
          <span>ze***@gmail.com</span>
        </div>
        <div className="btnWrap">
          <button>Info</button>
          <button>Edit</button>
        </div>
      </div>
      <div className="ratingInfo">
        <ul>
          <li>
            <p className='content'>클라이밍,러닝,수영</p>
            <p className='title'>관심 운동</p>
          </li>
          <li>
            <p className='content'>상</p>
            <p className='title'>매너 점수</p>
          </li>
          <li>
            <p className='content'>루키</p>
            <p className='title'>운동별 능력</p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MpUserInfoSec
