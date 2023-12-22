import Notifications from '@/components/notifications'
import Title from '@/components/title'
import { Getfetch } from '@/func/fetchCall'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType, Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'USports : 알림내역',
  description: 'USports : 알림내역',
}
const page = () => {
  return (
    <>
      <Title title="Notifications" />
      <div className="notifications">
        <Notifications />
      </div>
    </>
  )
}

export default page
