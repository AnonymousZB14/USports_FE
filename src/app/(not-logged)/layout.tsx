import type { Metadata } from 'next'
import '../globals.css'
import '../../styles/main.css'
import { MSWComponent } from '@/app/_component/MSWComponent'
import AuthSession from '@/app/_component/AuthSession'
export const metadata: Metadata = {
  title: 'USports',
  description: 'usports',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="light">
      <body>
        <MSWComponent />
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  )
}
