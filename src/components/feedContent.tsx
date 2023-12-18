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
          <div className={item.imageAddressList.length % 2 === 1 ? 'odd' : ''}>
            {item.imageAddressList.map((img, idx) => (
              <img key={idx} src={img} alt="img" />
            ))}
          </div>
        </Link>
        <div className="record_contents">
          <span>{item.accountName}</span>
          <p>{item.recordContent}</p>
        </div>
      </div>
    </div>
  )
}
