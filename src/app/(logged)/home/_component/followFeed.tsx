'use client'
import { FeedContent } from '@/components/feedContent'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Record, Records } from '@/types/types'
import { getPostFollowings } from '../../_lib/getPostFollowings'
const FollowFeed = () => {
  const { data } = useQuery<Record[]>({
    queryKey: ['records', 'followings'],
    queryFn: getPostFollowings,
    staleTime: 30000,
  })
  /*   const [list, setList] = useState([])
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
    <div className="feed">
      {data?.map((item, itemIdx: number) => (
        <FeedContent item={item} key={itemIdx} />
      ))}
    </div>
  )
}

export default FollowFeed
