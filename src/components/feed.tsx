import React from 'react'
import UserInfoSec from './userInfoSec'
import Link from 'next/link'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { Post } from '@/types/types'
import { Record } from '@/types/types'
import { getPostRecommends } from '@/app/(logged)/_lib/getPostRecommends'
import { FeedContent } from './feedContent'
const Feed = () => {
  const { data } = useQuery<Post[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
  })
  // if (!data) return null
  // return data?.map((post) => <FeedContent key={post.postId} post={post} />)
}







//delete
const FeedContent2 = ({ item }: { item: Record }) => {
  return (
    <div className="feed_content">
      <div>
        <UserInfoSec />
        {/* <span className="dayjs">{String(item.registeredAt)}</span> */}
      </div>
      <div className="body">
        <Link href={`record/${item.recordId}`}>
          {item.imageAddressList.map((img, idx) => {
            return <img key={idx} src={img} alt="img" />
          })}
          {/* <img src={item.imageAddressList[0]} alt="img" /> */}
        </Link>
        <div className="record_contents">
          <span>{item.accountName}</span>
          <p>{item.recordContent}</p>
        </div>
      </div>
    </div>
  )
}

export default Feed
