'use client'
import Link from 'next/link'
import React, { useLayoutEffect } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { UserState, UserState as userstate } from '@/store/user'
const MypageBtn = () => {
  const { data: session, status } = useSession()
  const [user, setUser] = useRecoilState(UserState)
  useLayoutEffect(() => {
    console.log(session?.user?.id)
    setUser({
      id: '0',
      email: session?.user?.email!,
      name: session?.user?.name!,
      profileImage: session?.user?.image!,
    })
  }, [session])
  if (status === 'authenticated') {
    console.log(session)
  }
  return (
    <Link href={'/mypage'}>
      <FaRegUserCircle />
    </Link>
  )
}

export default MypageBtn
