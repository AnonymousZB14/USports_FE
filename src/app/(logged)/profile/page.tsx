'use client'
import { UserDetailState } from '@/store/user'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
const page = () => {
  const [user, setUser] = useRecoilState(UserDetailState)
  const route = useRouter()
  useEffect(() => {
    route.replace(`profile/${user.member.accountName}`)
  }, [])
  return null
}

export default page
