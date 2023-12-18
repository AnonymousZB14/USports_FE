import { checkUser } from '@/test/user'
import type { Metadata } from 'next'
import '../../styles/main.css'
import '../globals.css'
import { redirect } from 'next/navigation'

import Header from '@/containers/header'

import { cookies } from 'next/headers'

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


  return (
    <div id="wrap">
      <Header />
      <main id="main">{children}</main>
      {modal}
    </div>
  )
}
