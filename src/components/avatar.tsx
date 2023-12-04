'use client'
import { checkUser } from '@/api/user'
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
  useEffect(() => {
    checkUser().then((resp) => {
      setUser(resp)
    })
  }, [setUser])
  return (
    <div style={{ width: width, height: height }}>
      <div className="avatar_img">
        <Link href={isItprofile ? '#none' : '/profile'}>
          <img src={user.profileImage} alt="profileImage" />
        </Link>
      </div>
    </div>
  )
}

export default Avatar
