import { checkCookie } from '@/func/cookie'
import LocalStorage from '@/func/localstrage'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/home')
}
