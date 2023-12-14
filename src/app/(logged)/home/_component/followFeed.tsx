'use client'
import { FeedContent } from '@/components/feedContent'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useState } from 'react'
import { Record, Records } from '@/types/types'
import { getPostFollowings } from '../../_lib/getPostFollowings'
import { useInView } from 'react-intersection-observer'
import { Getfetch } from '@/func/fetchCall'
const FollowFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    Record[],
    Object,
    InfiniteData<Record[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['records', 'followings'],
    queryFn: getPostFollowings,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.recordId,
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
  /*       const [list, setList] = useState([])
  useEffect(() => {
    try {
      Getfetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/home?page=1`).then(
        (resp) => {
          setList(resp.list)
        },
      )
    } catch (error) {
      console.log(error)
    }
  }, []) */

  return (
    <>
      <div className="feed">
        {data?.pages.map((page, itemIdx: number) => (
          <Fragment key={itemIdx}>
            {page.map((item) => (
              <FeedContent item={item} key={item.recordId} />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </>
  )
}

export default FollowFeed
