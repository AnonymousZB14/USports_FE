import { auth } from '@/auth'

import { setInterceptor } from '@/func/fetchCall'
import LocalStorage from '@/func/localstrage'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (session?.user) {
    redirect('/home')
  } else {
    redirect('/login')
  }
  return <></>
}
