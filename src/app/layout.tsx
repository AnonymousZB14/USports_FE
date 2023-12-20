import type { Metadata } from 'next'
import './globals.css'
import '../styles/main.css'
import { MSWComponent } from '@/app/_component/MSWComponent'
import axios from 'axios'
import RecoilRootWrapper from '@/containers/recoilRootWrapper'
import RQProvider from './(logged)/_component/RQProvider'
import UserInfoProvider from './_component/UserInfoProvider'
import Script from 'next/script'

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

  return (
    <html data-theme="light">
      <body>
        <RecoilRootWrapper>
          <MSWComponent />
          <UserInfoProvider>
            <RQProvider>{children}</RQProvider>
          </UserInfoProvider>
        </RecoilRootWrapper>
        <script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=services,clusterer`}
          type="text/javascript"
        />
      </body>
    </html>
  )
}
