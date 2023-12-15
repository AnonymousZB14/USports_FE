import type { Metadata } from 'next'
import '../globals.css'
import '../../styles/main.css'
import { MSWComponent } from '@/app/_component/MSWComponent'
import AuthSession from '@/app/_component/AuthSession'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import axios from 'axios'

export const metadata: Metadata = {
  title: 'USports',
  description: 'usports',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  axios.defaults.withCredentials = true
  const session = await auth()
  if (session?.user) {
    redirect('/home')
    return null
  }
  return (
    <html data-theme="light">
      <body>
        <MSWComponent />
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  )
}
