import React from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import '../styles/main.css'
import { MSWComponent } from '@/app/_component/MSWComponent'
import axios from 'axios'
import RecoilRootWrapper from '@/containers/recoilRootWrapper'
import RQProvider from './(logged)/_component/RQProvider'
import UserInfoProvider from './_component/UserInfoProvider'
import Script from 'next/script'
import Alert from '@/components/alert'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
export const metadata: Metadata = {
  title: 'USports',
  description: 'usports',
}
export const viewpor = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}
declare global {
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RecoilRootWrapper>
          <MSWComponent />
          <UserInfoProvider>
            <RQProvider>
              <ToastContainer
                style={{ zIndex: 200 }}
                hideProgressBar={false}
                position="top-center"
                theme="dark"
              />
              <Alert />
              {children}
            </RQProvider>
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
