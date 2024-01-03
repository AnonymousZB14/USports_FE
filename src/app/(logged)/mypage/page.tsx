import MpBtm from '@/components/mpBtm'
import MpCategories from '@/components/mpCategories'
import MpUserInfoSec from '@/components/mpUserInfoSec'
import Title from '@/components/title'
import { Metadata } from 'next'
import React from 'react'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getMypageData } from './_lib/getMypageData'
export const metadata: Metadata = {
  title: 'USports : 마이페이지',
  description: 'USports : 마이페이지',
}
const page = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['mypage'],
    queryFn: getMypageData,
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <div className="mypageWrap">
      <Title title="Mypage" />
      <HydrationBoundary state={dehydratedState}>
        <section>
          <div className="mpTop">
            <MpUserInfoSec />
          </div>
          <div className="mpBtm">
            <MpBtm />
          </div>
        </section>
      </HydrationBoundary>
    </div>
  )
}

export default page
