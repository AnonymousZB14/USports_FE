import Link from 'next/link'
import UserInfoSec from './userInfoSec'
import { Record } from '@/types/types'
import Avatar from './avatar'
import { HomeRecordListItem } from '@/types/types'
export const FeedContent = ({ item }: { item: HomeRecordListItem }) => {
  return (
    <div className="feed_content">
      <div>
        <div className="userInfoSec">
          <Avatar
            width="60px"
            height="60px"
            imgAddress={item.profileImage}
            linkAddress={item.accountName}
          />
          <div className="user_info">
            <h3>{item.accountName}</h3>
            <p>@{item.accountName}</p>
          </div>
        </div>
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
