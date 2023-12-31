import { cookies } from 'next/headers'

const cookieStore = cookies()

export const setCookie = (key: string, value: string, option?: any) => {
  cookies().set(key, value, { ...option })
}



export const getCookie = (key: string) => {
  return cookieStore.get(key)
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
