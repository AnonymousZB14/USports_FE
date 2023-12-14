import { auth } from '@/auth'
import { setCookieToken } from '@/func/cookie'
import { setInterceptor } from '@/func/fetchCall'
import LocalStorage from '@/func/localstrage'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (session?.user) {
    setInterceptor(session.user.email!)
    redirect('/home')
  } else {
    redirect('/login')
  }
  return <></>
}
