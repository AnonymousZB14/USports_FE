'use client'
import { DarkModeState } from '@/store/mode'
import { UserDetailState } from '@/store/user'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useRecoilState(UserDetailState)
  const [mode, setMode] = useRecoilState(DarkModeState)
  const localUser = localStorage.getItem('user')
  const localMode = localStorage.getItem('dark-mode')
  useEffect(() => {
    setUser(JSON.parse(localUser!))
    setMode(JSON.parse(localMode!))
  }, [localUser])
  useEffect(() => {
    console.log(user)
  }, [user])
  return <>{children}</>
}

export default UserInfoProvider
