'use client'
import { useRouter } from 'next/navigation'
const page = () => {
  const route = useRouter()
  route.replace('/home')
  return null
}
export default page
