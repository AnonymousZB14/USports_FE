'use client'
import { checkUser } from '@/test/user'
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
}: {
  width?: string
  height?: string
  isItprofile?: boolean
  imgAddress?: string
}) => {
  const [user, setUser] = useRecoilState(UserDetailState)

  return (
    <div style={{ width: width, height: height }}>
      <div className="avatar_img">
        {
          <Link href={isItprofile ? '#none' : '/profile'}>
            <img
              src={imgAddress ? imgAddress : '/tomatoA.svg'}
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
