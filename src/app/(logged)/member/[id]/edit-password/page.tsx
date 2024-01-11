'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const page = () => {
  const route = useRouter()
  useEffect(() => {
    route.replace('/mypage')
  }, [])
  return null
}
export default page
