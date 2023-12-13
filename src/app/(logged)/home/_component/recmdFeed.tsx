'use client'
import { FeedContent } from '@/components/feedContent'
import { Getfetch } from '@/func/fetchCall'
import { useQuery } from '@tanstack/react-query'
import React, { Suspense, useEffect, useState } from 'react'
import { Record, Records } from '@/types/types'
import { getPostRecommends } from '../../_lib/getPostRecommends'

const RecmdFeed = () => {
  const { data } = useQuery<Record[]>({
    queryKey: ['records', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 30000,
  })
  /*   useEffect(() => {
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
    <div className="feed">
      {data?.map((item, itemIdx: number) => (
        <FeedContent item={item} key={itemIdx} />
      ))}
    </div>
  )
}

export default RecmdFeed
