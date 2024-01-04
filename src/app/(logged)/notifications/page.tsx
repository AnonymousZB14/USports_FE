import Notifications from '@/components/notifications'
import Title from '@/components/title'
import { Metadata } from 'next'
import React from 'react'
import FollowManageBtn from './_component/followManageBtn'
export const metadata: Metadata = {
  title: 'USports : 알림내역',
  description: 'USports : 알림내역',
}
const page = () => {
  return (
    <>
      <Title title="Notifications" />
      <FollowManageBtn />
      <div className="notifications">
        <Notifications />
      </div>
    </>
  )
}

export default page
