'use client'
import { checkUser } from '@/test/user'
import { useEffect, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { UserState, UserState as userstate } from '@/store/user'
import Link from 'next/link'

const Avatar = ({
  width,
  height,
  isItprofile,
}: {
  width?: string
  height?: string
  isItprofile?: boolean
}) => {
  const [user, setUser] = useRecoilState(UserState)
  
  return (
    <div style={{ width: width, height: height }}>
      <div className="avatar_img">
        {/* <p>{session.data?.user?.email}</p> */}
        {
          <Link href={isItprofile ? '#none' : '/profile'}>
            <img
              src={
               '/tomatoA.svg'
              }
              alt="profileImage"
            />
          </Link>
        }
      </div>
    </div>
  )
}

export default Avatar
