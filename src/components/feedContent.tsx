import Link from 'next/link'
import UserInfoSec from './userInfoSec'
import { Record } from '@/types/types'
export const FeedContent = ({ item }: { item: Record }) => {
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
        </Link>
        <div className="record_contents">
          <span>{item.accountName}</span>
          <p>{item.recordContent}</p>
        </div>
      </div>
    </div>
  )
}
