import MpBtm from '@/components/mpBtm'
import MpCategories from '@/components/mpCategories'
import MpUserInfoSec from '@/components/mpUserInfoSec'
import Title from '@/components/title'
import React from 'react'

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
