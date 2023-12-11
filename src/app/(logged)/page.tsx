// import Main from "@/app/(beforeLogin)/_component/Main";
import { auth } from '@/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (session?.user) {
    redirect('/home')
    return null
  }
  return (
    <h1>
      {' '}
      <Link href={`/recruit/partner`}>파트너 평가</Link>
    </h1>
  )
}
