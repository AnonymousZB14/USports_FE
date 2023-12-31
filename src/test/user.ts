// 로그인 유무 확인 API (MOCK)
import { API_URL } from '@/constants/contant'

export const checkUser = async (accessToken?: string) => {
  const res = await fetch(`${API_URL}/user`, { next: { revalidate: 10 } })
  if (!res.ok) {
    throw new Error('Failed to fetch user data!')
  }
  return res.json()
}
