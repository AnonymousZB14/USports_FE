import React from 'react'
import Avatar from './avatar'
import { RecordDetailComment } from '@/types/types'
import Link from 'next/link'

const Comment = ({ comment }: { comment: RecordDetailComment }) => {
  return (
    <div className="comment">
      <div className="avatar_wrap" style={{ width: '35px', height: '35px' }}>
        <div>
          <div className="avatar_img">
            {
              <Link href={`profile/${comment.accountName}`}>
                <img src={comment.profileImage} alt="profileImage" />
              </Link>
            }
          </div>
        </div>
      </div>
      <div className="comment_body">
        <ul>
          <li>
            <span className="username">{comment.accountName}</span>
            <span className="userid">@{comment.accountName}</span>
          </li>
          <li>
            <p>{comment.content}</p>
          </li>
          <li>
            <button>답글 달기</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Comment
