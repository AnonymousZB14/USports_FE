import { checkUser } from '@/api/user'
import type { Metadata } from 'next'
import '../../styles/main.css'
import '../globals.css'
import { redirect } from 'next/navigation'
import { UserProfile } from '@/types/types'
import Header from '@/containers/header'
import RecoilRootWrapper from '@/containers/recoilRootWrapper'
import { KAKAO_MAP_KEY } from '@/constants/contant'
export const metadata: Metadata = {
  title: 'USports',
  description: 'usports',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
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
            <script
              src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`}
              type="text/javascript"
            />
            <main id="main">{children}</main>
          </div>
        </body>
      </html>
    </RecoilRootWrapper>
  )
}
