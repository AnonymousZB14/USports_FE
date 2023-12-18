import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import { Cookies } from 'react-cookie'
// import cookie from 'cookie'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options })
}
export const loginFun = async (email: string, password: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    },
  )
  if (res.ok) {
    const response = res.json()
    return response
  } else {
    return '오류발생'
  }
}
export const onLoginSuccess = (res: any) => {
  const JWT_EXPIRY_TIME = 3600000 // 1시간
  const { accessToken, refreshToken } = res.tokenDto
  // 로그인 성공시 쿠키에 accessToken 저장
  localStorage.setItem('accessToken', JSON.stringify(accessToken))
  setCookie('accessToken', accessToken, { path: '/' })
  setCookie('refreshToken', refreshToken, { path: '/' })
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  // setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000)
}
