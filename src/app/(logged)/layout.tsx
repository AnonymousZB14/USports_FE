import { checkUser } from '@/api/user'
import type { Metadata } from 'next'
import '../../styles/main.css'
import '../globals.css'
import { redirect } from 'next/navigation'
import { UserProfile } from '@/types/types'
import Header from '@/containers/header'
import RecoilRootWrapper from '@/containers/recoilRootWrapper'
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
  const res: UserProfile = await checkUser()
  if (!res) {
    redirect('/login')
  }
  return (
    <RecoilRootWrapper>
      <html data-theme="light">
        <body>
          <div id="wrap">
            <Header />
            <main id="main">{children}</main>
            {modal}
            <script
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false`}
              type="text/javascript"
            />
          </div>
        </body>
      </html>
    </RecoilRootWrapper>
  )
}
