'use client'
import { getUsersRecords } from '@/test/records'
import { RecordsState } from '@/store/records'
import Link from 'next/link'
import React, { Fragment, useEffect } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import Skeleton from '../../../../components/skeleton'
import axios from 'axios'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { getMyRecords } from '../_lib/getMyRecords'
interface Record2 {
  recordId: number
  imageAddress: string
}
const Records = ({ accoutName }: { accoutName: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    Record2[],
    Object,
    InfiniteData<Record2[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['records', accoutName],
    queryFn: getMyRecords,
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

  if (!data) return null
  return (
    <>
      <ul>
        {data?.pages.map((page, itemIdx: number) => (
          <Fragment key={itemIdx}>
            {page.map((record) => (
              <Record
                key={record.recordId}
                imageAddress={record.imageAddress}
                recordId={record.recordId}
              />
            ))}
          </Fragment>
        ))}
      </ul>
      <div ref={ref} style={{ height: 50 }} />
    </>
  )
}

export default Records

const Record = ({
  imageAddress,
  recordId,
}: {
  imageAddress: string
  recordId: number
}) => {
  return (
    <li>
      <div className="thumbnail">
        <Link href={`/record/${recordId}`}>
          <img src={imageAddress} alt="thumbnail" />
        </Link>
      </div>
    </li>
  )
}
