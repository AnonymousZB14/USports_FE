import Auth2Redirect from '@/app/(not-logged)/_component/auth2Redirect'
import LoadingScreen from '@/components/loading-screen'
import { redirect } from 'next/navigation'
import React from 'react'
const page = async () => {
  return (
    <div>
      <LoadingScreen />
      <Auth2Redirect />
    </div>
  )
}

export default page
