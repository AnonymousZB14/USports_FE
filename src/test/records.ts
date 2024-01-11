// GET USER RECORD API (MOCK)
import { API_URL } from '@/constants/contant'

export const getUsersRecords = async (accountName?: string) => {
  const res = await fetch(`${API_URL}/${accountName}-records`, {
    next: { revalidate: 10 },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch user data!')
  }
  return res.json()
}
