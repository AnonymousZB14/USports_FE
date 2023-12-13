import axios, { AxiosError } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYXBweWhzcnl1QGdtYWlsLmNvbSIsImlhdCI6MTcwMjM3Mjk5NywiZXhwIjoxNzAyNTg4OTk3fQ.WcUEwKNxFepfB9_fK3XAGQi71mfDefnNi_JIGxJZigD3Er8CeC5s0vBigzZVMGlYVD0th_Sv2tdzPtZo0wlhLw' // 서버에서 받아온 안전한 accountToken 사용

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

export async function Postfetch(url: string, data?: any) {
  try {
    const response = await axiosInstance.post(url, data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}
export async function Getfetch(url: string) {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}
