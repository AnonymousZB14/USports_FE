'use client'
import React, { useEffect } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import LocalStorage from '@/func/localstrage'
import { onLogoutFun } from '@/func/service'

const LogoutBtn = () => {
  const router = useRouter()

  const onLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      // alert('로그아웃되었습니다')
      onLogoutFun(LocalStorage.getItem('accessToken')!)
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
