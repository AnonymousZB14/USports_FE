import React from 'react'
import Content from './_component/content'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getMyRecords } from '../_lib/getMyRecords'
import { getProfileUser } from '../_lib/getProfileUser'
import { Metadata } from 'next'
type PageParams = {
  accountName: string
}
export const metadata: Metadata = {
  title: 'USports : 프로필',
  description: 'USports : 프로필',
}
const page = async ({ params }: { params: PageParams }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['profile', params.accountName],
    queryFn: getProfileUser,
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['records', params.accountName],
    queryFn: getMyRecords,
    initialPageParam: 1,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Content accountName={params.accountName} />
    </HydrationBoundary>
  )
}

export default page
