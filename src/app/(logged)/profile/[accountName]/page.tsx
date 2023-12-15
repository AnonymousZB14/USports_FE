import React from 'react'
import Content from './_component/content'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getMyRecords } from '../_lib/getMyRecords'
type PageParams = {
  accountName: string
}
const page = async ({ params }: { params: PageParams }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['records', params.accountName],
    queryFn: getMyRecords,
    initialPageParam: 0,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Content accountName={params.accountName} />
    </HydrationBoundary>
  )
}

export default page
