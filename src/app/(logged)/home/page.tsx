import React from 'react'
import Home from '../_component/home'
import { Metadata } from 'next'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getPostRecommends } from '../_lib/getPostRecommends'
export const metadata: Metadata = {
  title: '홈',
  description: '홈',
}

const page = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Home />
    </HydrationBoundary>
  )
}

export default page
