import { checkUser } from '@/test/user'
import type { Metadata } from 'next'
import '../../styles/main.css'
import '../globals.css'
import { redirect } from 'next/navigation'
import Header from '@/containers/header'
import { cookies } from 'next/headers'
import LocalStorage from '@/func/localstrage'
import { checkCookie } from '@/func/cookie'
import { WritingPageListWrap } from '@/components/writingPageList'
import { HamBtn } from '@/components/hambtn'
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
    <>
      <script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libraries=services,clusterer`}
        type="text/javascript"
      />
      <div id="wrap">
        <HamBtn />
        <Header />
        <main id="main">{children}</main>
        <WritingPageListWrap />
        {modal}
      </div>
    </>
  )
}
