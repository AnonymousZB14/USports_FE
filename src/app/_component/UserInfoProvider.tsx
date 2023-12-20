'use client'
import { setHeaderToken } from '@/func/fetchCall'
import { DarkModeState } from '@/store/mode'
import { RegionList, SportsLevelList, SportsList } from '@/store/types'
import { UserDetailState } from '@/store/user'
import { SportsList as SportsListType } from '@/types/types'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useRecoilState(UserDetailState)
  const [sportsLevel, setRportsLevel] = useRecoilState(SportsLevelList)
  const [sports, setSports] = useRecoilState(SportsList)
  const [region, setRegion] = useRecoilState(RegionList)
  const [mode, setMode] = useRecoilState(DarkModeState)
  const localUser = localStorage.getItem('user')
  const localMode = localStorage.getItem('dark-mode')
  useEffect(() => {
    try {
      const data = axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/types`)
        .then((res) => {
          const cont = res.data
          console.log(cont)
          setRegion(cont.regionList)
          setSports(cont.sportsList)
          setRportsLevel(cont.sportsLevelList)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    setUser(JSON.parse(localUser!))
    console.log('change user')
    setMode(JSON.parse(localMode!))
  }, [localUser])
  useEffect(() => {
    if (user?.tokenDto?.accessToken==null || user.tokenDto.accessToken == '')
      return
    console.log(user)
    setHeaderToken(user.tokenDto.accessToken)
  }, [user])
  return <>{children}</>
}

export default UserInfoProvider
