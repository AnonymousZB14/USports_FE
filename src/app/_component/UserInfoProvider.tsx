'use client'
import { setHeaderToken } from '@/func/fetchCall'
import { DarkModeState } from '@/store/mode'
import { RegionList, SportsLevelList, SportsList } from '@/store/types'
import { UserDetailState, UserTokenState } from '@/store/user'
import { SportsList as SportsListType } from '@/types/types'
import { Cookies } from 'react-cookie'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { checkCookie } from '@/func/service'
import { useRouter } from 'next/navigation'
const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useRecoilState(UserDetailState)
  const [userToken, setUserToken] = useRecoilState(UserTokenState)
  const [sportsLevel, setRportsLevel] = useRecoilState(SportsLevelList)
  const [sports, setSports] = useRecoilState(SportsList)
  const [region, setRegion] = useRecoilState(RegionList)
  const [mode, setMode] = useRecoilState(DarkModeState)
  let localUser, localMode, localToken
  useEffect(() => {
    // console.log(user)
    // console.log(userToken)
  }, [user])
  const route = useRouter()
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localUser = localStorage.getItem('user')
      localMode = localStorage.getItem('dark-mode')
      localToken = localStorage.getItem('accessToken')
    }
    const cookieCheck = checkCookie()
    if (cookieCheck === false) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
    }
    try {
      const data = axios.get(`/usports/api/types`).then((res) => {
        const cont = res.data
        // console.log(cont)
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
    setMode(JSON.parse(localMode!))
    setUserToken(JSON.parse(localToken!))
    // setHeaderToken(JSON.parse(localToken!))
  }, [localUser, localToken])
  useEffect(() => {

    if (
      userToken?.accessToken == null ||
      userToken.accessToken == '' ||
      userToken.accessToken == undefined
    )
      return
    setHeaderToken(userToken.accessToken)
  }, [userToken])
  return <>{children}</>
}

export default UserInfoProvider
