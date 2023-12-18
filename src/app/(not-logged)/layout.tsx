import type { Metadata } from 'next'
import '../globals.css'
import '../../styles/main.css'
import { MSWComponent } from '@/app/_component/MSWComponent'
import { redirect } from 'next/navigation'
import axios from 'axios'
import RecoilRootWrapper from '@/containers/recoilRootWrapper'

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

  return <>{children}</>
}
