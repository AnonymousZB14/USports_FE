'use client'
import Link from 'next/link'
import React, { useLayoutEffect } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'

import { useRecoilState } from 'recoil'
import { UserState, UserState as userstate } from '@/store/user'
const MypageBtn = () => {
  
  const [user, setUser] = useRecoilState(UserState)

  return (
    <Link href={'/mypage'}>
      <FaRegUserCircle />
    </Link>
  )
}

export default MypageBtn
