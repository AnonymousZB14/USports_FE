'use client'
import { FeedContent } from '@/components/feedContent'
import { Getfetch } from '@/func/fetchCall'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { Record, Records } from '@/types/types'
import { getPostRecommends } from '../../_lib/getPostRecommends'
import { useInView } from 'react-intersection-observer'
import { HomeRecord } from '@/types/types'

const RecmdFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    HomeRecord,
    Object,
    InfiniteData<HomeRecord>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['records', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.currentPage + 1,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  })
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  return (
    <>
      <div className="feed">
        {data?.pages.map((page, itemIdx) => (
          <Fragment key={itemIdx}>
            {page.list.map((item, idx) => (
              <FeedContent item={item} key={idx} />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </>
  )
}

export default RecmdFeed
