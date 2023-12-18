import React from 'react'
import Avatar from './avatar'
import Link from 'next/link'
interface userInfo {
  userImage: string
  accountName: string
  userId: string
}
const UserInfo = ({ userImage, accountName, userId }: userInfo) => {
  return (
    <div className="userInfoSec">
      <div style={{ width: 60, height: 60 }}>
        <div className="avatar_img">
          {
            <Link href={`profile/${accountName}`}>
              <img src={userImage} alt="profileImage" />
            </Link>
          }
        </div>
      </div>
      <div className="user_info">
        <h3>{accountName}</h3>
        <p>{userId}</p>
      </div>
    </div>
  )
}

export default UserInfo
