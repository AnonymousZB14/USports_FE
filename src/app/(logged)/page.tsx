import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  const role = cookies().get('role')?.value
  console.log(role)
  if (role === 'UNAUTH') {
    redirect('/mypage')
  }
  return null
}
