import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import { Cookies } from 'react-cookie'
import { axiosInstance } from './fetchCall'
import LocalStorage from './localstrage'
// import cookie from 'cookie'

const cookies = new Cookies()

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options })
}
export const removeCookie = (name: string) => {
  return cookies.remove(name)
}
export const checkCookie = () => {
  const access = cookies.get('accessToken')
  const refresh = cookies.get('refreshToken')
  const role = cookies.get('role')
  if (access && refresh && role) {
    return true
  } else {
    return false
  }
}
export const loginFun = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/login`,
      JSON.stringify({
        email: email,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return res
  } catch (error) {
    console.log(error)
  }
}
export const onLoginSuccess = (res: any) => {
  const JWT_EXPIRY_TIME = 3600000 // 1시간
  const { accessToken, refreshToken } = res.tokenDto
  const { role } = res.member
  // 로그인 성공시 쿠키에 accessToken 저장
  localStorage.setItem('accessToken', JSON.stringify(accessToken))
  localStorage.setItem('user', JSON.stringify(res.member))
  setCookie('accessToken', accessToken, { path: '/' })
  setCookie('refreshToken', refreshToken, { path: '/' })
  setCookie('role', role, { path: '/' })
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  // setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000)
}
export const onLogoutFun = (accessToken?: string) => {
  axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/member/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  removeCookie('accessToken')
  removeCookie('refreshToken')
  removeCookie('role')
  LocalStorage.removeToken()
  LocalStorage.removeItem('user')
}
