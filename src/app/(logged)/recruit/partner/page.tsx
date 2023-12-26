'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const page = () => {
  useEffect(() => {
    const route = useRouter()
    route.replace('/mypage')
  }, [])
  return null
}
export default page
