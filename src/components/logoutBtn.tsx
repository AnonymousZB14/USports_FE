'use client'
import React, { useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { signOut, useSession } from 'next-auth/react'
import { Session } from '@auth/core/types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import LocalStorage from '@/func/localstrage'
import { useRecoilState } from 'recoil'
import { UserState } from '@/store/user'
import { getCookie, removeCookie } from '@/func/cookie_c'
import { axiosInstance, setHeaderToken } from '@/func/fetchCall'

type Props = {
  me?: Session | null
}
const LogoutBtn = ({ me }: Props) => {
  const [user, setUser] = useRecoilState(UserState)
  const router = useRouter()
  const { data, status } = useSession()
  const accessToken = getCookie('connect.sid')
  useEffect(() => {
    LocalStorage.setAccessToken(accessToken)
    setHeaderToken(accessToken)
  }, [])
  useEffect(() => {
    setUser({
      id: '0',
      name: data?.user?.name!,
      email: data?.user?.email!,
      profileImage: data?.user?.image!,
      accessToken: accessToken,
    })
  }, [data])
  const onLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      alert('로그아웃되었습니다')
      signOut({ redirect: false }).then(() => {
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/member/logout`, {
          credentials: 'include',
        })
        setUser({
          id: '',
          name: '',
          email: '',
          profileImage: '',
          accessToken: '',
        })
        LocalStorage.removeToken()
        router.replace('/login')
        removeCookie('connect.sid')
      })
    }
  }
  return (
    <div onClick={onLogout}>
      <FiLogOut />
    </div>
  )
}

export default LogoutBtn
