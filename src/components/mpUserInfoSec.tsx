import React from 'react'
import Avatar from './avatar'
import UserInfoSec from './userInfoSec'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'

const MpUserInfoSec = () => {
  // const route = useRouter()
  return (
    <>
      <div className="basicInfo">
        <div>
          <div className="avatar_img">
            {
              <Link href={'/profile'}>
                <img
                  src={'/basicProfile.png'}
                  alt="profile"
                  width={100}
                  height={100}
                />
              </Link>
            }
          </div>
        </div>
        <div>
          <h4>Username</h4>
          <p>@userId</p>
          <span>ze***@gmail.com</span>
        </div>
        <div className="btnWrap">
          <Link className="link-btn" href={`/member/${'id'}/info`}>
            Info
          </Link>
          <button className="link-btn">Edit</button>
        </div>
      </div>
      <div className="ratingInfo">
        <ul>
          <li>
            <p className="content">클라이밍,러닝,수영</p>
            <p className="title">관심 운동</p>
          </li>
          <li>
            <p className="content">상</p>
            <p className="title">매너 점수</p>
          </li>
          <li>
            <p className="content">루키</p>
            <p className="title">운동별 능력</p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MpUserInfoSec
