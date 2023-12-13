'use client'
import { FeedContent } from '@/components/feedContent'
import { Getfetch } from '@/func/fetchCall'
import React, { useEffect, useState } from 'react'

const FollowFeed = () => {
  const [list, setList] = useState([])
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

export default FollowFeed
