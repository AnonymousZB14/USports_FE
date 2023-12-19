import { checkUser } from '@/test/user'
import type { Metadata } from 'next'
import '../../styles/main.css'
import '../globals.css'
import { redirect } from 'next/navigation'
import { UserProfile } from '@/types/types'
import Header from '@/containers/header'
import RecoilRootWrapper from '@/containers/recoilRootWrapper'
import { MSWComponent } from '@/app/_component/MSWComponent'
import AuthSession from '@/app/_component/AuthSession'
import { auth } from '@/auth'
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
  const session = await auth()
  const ttt = cookies().get('connect.sid')?.value
  console.log(ttt)
  // axiosInstance.defaults.headers.common.Authorization = `Bearer ${ttt}`

  if (!session?.user) {
    redirect('/login')
  } else {
    // console.log
  }
  return (
    <RecoilRootWrapper>
      <html data-theme="light">
        <body>
          <MSWComponent />
          <AuthSession>
            <RQProvider>
              <div id="wrap">
                <Header />
                <main id="main">{children}</main>
                {modal}
              </div>
            </RQProvider>
          </AuthSession>
          <script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false`}
            type="text/javascript"
          />
        </body>
      </html>
    </RecoilRootWrapper>
  )
}
