'use client'
import { checkUser } from '@/test/user'
import { useEffect, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'
import { UserState, UserState as userstate } from '@/store/user'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
const Avatar = ({
  width,
  height,
  isItprofile,
}: {
  width?: string
  height?: string
  isItprofile?: boolean
}) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useRecoilState(UserState)
  // if (status === 'authenticated') console.log('session', session)
  /*   useEffect(() => {
    checkUser().then((resp) => {
      setUser(resp)
    })
  }, [setUser]) */
  useLayoutEffect(() => {
    console.log(session)
    setUser({
      id: 0,
      name: session?.user?.name!,
      profileImage: session?.user?.image!,
    })
  }, [session])
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
