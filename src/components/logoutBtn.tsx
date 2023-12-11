'use client'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { signOut, useSession } from 'next-auth/react'
import { Session } from '@auth/core/types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
type Props = {
  me?: Session | null
}
const LogoutBtn = ({ me }: Props) => {
  const router = useRouter()
  const onLogout2 = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      alert('로그아웃되었습니다')
      router.push('/login')
    }
  }

  const onLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      alert('로그아웃되었습니다')
      signOut({ redirect: false }).then(() => {
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
          credentials: 'include',
        })
        router.replace('/login')
      })
    }
  }
  /*   if (!me?.user) {
    return null
  } */
  return (
    <div onClick={onLogout}>
      <FiLogOut />
    </div>
  )
}

export default LogoutBtn
