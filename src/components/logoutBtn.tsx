'use client'
import React, { useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import LocalStorage from '@/func/localstrage'
import { onLogoutFun } from '@/func/service'
import { Cookies } from 'react-cookie'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
import { removeCookie } from '@/func/cookie_c'
import axios from 'axios'
const LogoutBtn = () => {
  const cookies = new Cookies()
  const router = useRouter()
  const [user, setUser] = useRecoilState(UserDetailState)
  const onLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      // alert('로그아웃되었습니다')
      await onLogoutFun(LocalStorage.getItem('accessToken')!)
      removeCookie('accessToken')
      removeCookie('refreshToken')
      removeCookie('role')
      cookies.remove('accessToken')
      cookies.remove('refreshToken')
      cookies.remove('role')
      delete axios.defaults.headers.common.Authorization
      router.replace('/login')
    }
  }
  return (
    <div onClick={onLogout}>
      <FiLogOut />
    </div>
  )
}

export default LogoutBtn
