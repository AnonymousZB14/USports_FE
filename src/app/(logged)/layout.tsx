import { checkUser } from '@/test/user'
import type { Metadata } from 'next'
import '../../styles/main.css'
import '../globals.css'
import { redirect } from 'next/navigation'
import { UserProfile } from '@/types/types'
import Header from '@/containers/header'
import RecoilRootWrapper from '@/containers/recoilRootWrapper'
import { MSWComponent } from '@/app/_component/MSWComponent'

import RQProvider from './_component/RQProvider'
import { cookies } from 'next/headers'
import { axiosInstance } from '@/func/fetchCall'
export const metadata: Metadata = {
  title: 'USports',
  description: 'usports',
}

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const ttt = cookies().get('connect.sid')?.value
  console.log(ttt)
  // axiosInstance.defaults.headers.common.Authorization = `Bearer ${ttt}`

  return (
    <div id="wrap">
      <Header />
      <main id="main">{children}</main>
      {modal}
    </div>
  )
}
