'use client'
import { useEffect, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { UserState, UserState as userstate } from '@/store/user'
import Link from 'next/link'
import { LuUserCircle } from 'react-icons/lu'
const UserAvatar = ({
  width,
  height,
  isItprofile,
  image,
  accountName,
}: {
  width?: string
  height?: string
  isItprofile?: boolean
  image: string
  accountName: string
}) => {
  return (
    <div style={{ width: width, height: height }}>
      <div className="avatar_img">
        {
          <Link href={isItprofile ? '#none' : `profile/${accountName}`}>
            <img
              src={image && image !== '' ? image : '/basicProfile.png'}
              alt="profileImage"
            />
          </Link>
        }
      </div>
    </div>
  )
}

export default UserAvatar
