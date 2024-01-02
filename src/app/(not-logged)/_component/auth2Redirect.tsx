'use client'
import { setHeaderToken } from '@/func/fetchCall'
import { onLoginSuccess } from '@/func/service'
import { UserDetailState, UserTokenState } from '@/store/user'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'

const Auth2Redirect = () => {
  const [user, setUser] = useRecoilState(UserDetailState)
  const [userToken, setUserToken] = useRecoilState(UserTokenState)
  const router = useRouter()
  let isSuccessed = false
  const kakaoLogin = async () => {
    try {
      const res = await axios.get(`oauth2/login/success`)
      if (res.status === 200) {
        await setHeaderToken(res.data.tokenDto.accessToken)
        onLoginSuccess(res?.data)
        setUser(res.data.memberResponse)
        setUserToken(res.data.tokenDto)
        isSuccessed = true
      }
    } catch (error) {
      console.log(error)
    }
    if (isSuccessed) {
      router.replace('/')
    }
  }
  useLayoutEffect(() => {
    kakaoLogin()
  }, [])
  return null
}

export default Auth2Redirect
