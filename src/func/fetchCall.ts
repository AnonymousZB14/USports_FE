import axios, { AxiosError } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_TOKEN = 'your_api_token' // 서버에서 받아온 안전한 accountToken 사용

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

export async function Postfetch(url: string, data?: any) {
  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}
export async function Getfetch(url: string) {
  const res = await fetch(`${url}`, {
    next: { revalidate: 10 },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch user data!')
  }
  return res.json()
}
