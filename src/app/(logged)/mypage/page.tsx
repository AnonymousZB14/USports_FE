import MpBtm from '@/components/mpBtm'
import MpCategories from '@/components/mpCategories'
import MpUserInfoSec from '@/components/mpUserInfoSec'
import Title from '@/components/title'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'USports : 마이페이지',
  description: 'USports : 마이페이지',
}
const page = () => {
  
  return (
    <div className="mypageWrap">
      <Title title="Mypage" />
      <section>
        <div className="mpTop">
          <MpUserInfoSec />
        </div>
        <div className="mpBtm">
          <MpBtm />
        </div>
      </section>
    </div>
  )
}

export default page
