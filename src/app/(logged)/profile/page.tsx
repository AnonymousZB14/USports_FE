import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await auth()

  redirect(`/profile/${session?.user?.name}`)
  return null
}

export default page
