'use client'
import { useEffect, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
  UserDetailState,
  UserState,
  UserState as userstate,
} from '@/store/user'
import Link from 'next/link'
import Image from 'next/image'

const Avatar = ({
  width,
  height,
  isItprofile,
  imgAddress,
  linkAddress,
}: {
  width?: string
  height?: string
  isItprofile?: boolean
  imgAddress?: string
  linkAddress?: string
}) => {
  const [user, setUser] = useRecoilState(UserDetailState)

  return (
    <div style={{ width: width, height: height }}>
      <div className="avatar_img">
        {
          <Link
            href={
              linkAddress ? `/profile/${linkAddress}` : isItprofile ? '#none' : '/profile'
            }
          >
            <img
              src={imgAddress ? imgAddress : '/basicProfile.png'}
              alt="profile"
              width={100}
              height={100}
            />
          </Link>
        }
      </div>
    </div>
  )
}

export default Avatar
