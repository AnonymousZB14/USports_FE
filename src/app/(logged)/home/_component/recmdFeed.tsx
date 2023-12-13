'use client'
import { FeedContent } from '@/components/feedContent'
import { Getfetch } from '@/func/fetchCall'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Record } from '@/types/types'
import { getPostRecommends } from '../../_lib/getPostRecommends'

const RecmdFeed = () => {
  const [list, setList] = useState([])
  const { data } = useQuery<Record[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
  })
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
  }, [])
  return (
    <div className="feed">
      {list.map((item, idx) => {
        return <FeedContent item={item} key={idx} />
      })}
    </div>
  )
}

export default RecmdFeed
