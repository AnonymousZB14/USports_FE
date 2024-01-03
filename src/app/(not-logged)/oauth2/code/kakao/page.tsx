import Auth2Redirect from '@/app/(not-logged)/_component/auth2Redirect'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const res = await fetch(`http://3.39.34.245:8080/oauth2/authorization/kakao`)
  if (res.status === 200) {
    // redirect('/login')
  }
  return (
    <div>
      <p>카카오 로그인 페이지</p>
      <Auth2Redirect />
    </div>
  )
}

export default page
