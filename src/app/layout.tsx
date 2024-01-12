import React from 'react'
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
declare global {
  // Kakao 함수를 전역에서 사용할 수 있도록 선언
  interface Window {
    Kakao: any
  }
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  axios.defaults.withCredentials = true

  return (
    <html data-theme="light">
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
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
