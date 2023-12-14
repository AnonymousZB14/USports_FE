// import { setCookie } from './cookie';
import { cookies } from 'next/headers'

const cookieStore = cookies()

/* export const setCookie = (key: string, value: string, option?: any) => {
  cookies.set(key, value, { ...option })
} */

export const setCookieToken = (accesstoken: any) => {
  cookies().set('Authorization', `Bearer ${accesstoken}`)
}
export const setCookieToken2 = (accesstoken: any) => {
  cookies().set('Authorization', `Bearer ${accesstoken}`)
}
export const getCookie = (key: string) => {
  return cookieStore.get(key)
}
export const getCookie2 = () => {
  return cookieStore.get('Authorization')
}

export const getCookiesAll = () => {
  const cookieStore = cookies()
  return cookieStore.getAll()
}
export const checkCookie = (key: string) => {
  return cookieStore.has(key)
}
export const deleteCookie = (key: string) => {
  return cookieStore.delete(key)
}
