import Link from 'next/link'
import React from 'react'
import LoginModal from '../_component/loginModal'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

const page = async () => {
  const session = await auth()
  if (session?.user) {
    redirect('/home')
    return null
  }
  return <LoginModal />
}

export default page
