'use client'
import { FeedContent } from '@/components/feedContent'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useState } from 'react'
import { HomeRecord, Record, Records } from '@/types/types'
import { getPostFollowings } from '../../_lib/getPostFollowings'
import { useInView } from 'react-intersection-observer'
import { Getfetch } from '@/func/fetchCall'
const FollowFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    HomeRecord,
    Object,
    InfiniteData<HomeRecord>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['records', 'followings'],
    queryFn: getPostFollowings,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.totalPages === 0 ||
        lastPage.totalPages === lastPage.currentPage
        ? undefined
        : lastPage.currentPage + 1
    },
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

  if(!data) return null
  return (
    <>
      <div className="feed">
        {data?.pages.map((page, itemIdx: number) => (
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

export default FollowFeed
