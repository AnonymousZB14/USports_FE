//func/fetchCall.ts
import axios, { AxiosError } from 'axios'
const API_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYXBweWhzcnl1QGdtYWlsLmNvbSIsImlhdCI6MTcwMjM3Mjk5NywiZXhwIjoxNzAyNTg4OTk3fQ.WcUEwKNxFepfB9_fK3XAGQi71mfDefnNi_JIGxJZigD3Er8CeC5s0vBigzZVMGlYVD0th_Sv2tdzPtZo0wlhLw' // 서버에서 받아온 안전한 accountToken 사용
export const axiosInstance = axios.create({
  // baseURL: API_BASE_URL,
  headers: {
    credentials: 'include',
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${API_TOKEN}`,
  },
})
export const setHeaderToken = async (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const setInterceptor = (token: string) => {
  if (!token) return false
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  return true
}

export async function Postfetch(url: string, data?: any, accesstoken?: string) {
  try {
    const response = await axiosInstance.post(url, data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}
export async function Getfetch(url: string, accessToken?: string) {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}
export async function GetPOSTfetch(url: string, tags: string[]) {
  try {
    const response = await fetch(url, {
      next: {
        tags: tags,
      },
      credentials: 'include',
      headers: {
        credentials: 'include',
        Authorization: `Bearer ${'API_TOKEN'}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}

export async function postFormData(url: string, data: any) {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json;charset=UTF-8',
      },
    })
    return response
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}
