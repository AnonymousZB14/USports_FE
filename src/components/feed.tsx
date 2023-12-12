import React from 'react'
import UserInfoSec from './userInfoSec'
import Link from 'next/link'

import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { Post } from '@/types/types'
const Feed = () => {
  const { data } = useQuery<Post[]>({
    queryKey: ['posts', 'recommends'],
    // queryFn: getPostRecommends,
  })
  return (
    <div className="feed">
      {/* {data?.map((post) => <FeedContent />)} */}
      <FeedContent />
      <FeedContent />
    </div>
  )
}

export const FeedContent = () => {
  return (
    <div className="feed_content">
      <div>
        <UserInfoSec />
        <span className="dayjs">{'001'}</span>
      </div>
      <div className="body">
        <Link href={'/record/001'}>
          <img
            src={
              'https://firebasestorage.googleapis.com/v0/b/twitter-reloaded-d6dfe.appspot.com/o/tweets%2FWrKPYOJJdmRq3mOLYwBgAjsimIP2%2F9FoRsu6Pe6D3xVbS40NL?alt=media&token=c8e64337-3094-44c3-9450-259428dc7f6f'
            }
          />
        </Link>
        <div className="record_contents">
          <span>username</span>
          <p>러닝 오운완</p>
        </div>
      </div>
    </div>
  )
}

export default Feed
