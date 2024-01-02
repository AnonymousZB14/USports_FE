'use client'
import axios from 'axios'
import React, { useEffect, useLayoutEffect } from 'react'

const Auth2Redirect = () => {
  let code = new URL(window.location.href).searchParams.get('code')
  const kakaoLogin = async () => {
    try {
      const res = await axios.get(`oauth2/login/success`)
    } catch (error) {}
  }
  useLayoutEffect(() => {
    kakaoLogin()
  }, [])
  return <div>...</div>
}

export default Auth2Redirect
