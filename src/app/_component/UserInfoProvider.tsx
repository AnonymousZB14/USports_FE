'use client'
import { setHeaderToken } from '@/func/fetchCall'
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
    console.log('change user')
    setMode(JSON.parse(localMode!))
  }, [localUser])
  useEffect(() => {
    console.log(user)
    setHeaderToken(user.tokenDto.accessToken)
  }, [user])
  return <>{children}</>
}

export default UserInfoProvider
