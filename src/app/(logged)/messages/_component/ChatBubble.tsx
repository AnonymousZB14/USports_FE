'use client'
import { UserDetailState } from '@/store/user'
import React from 'react'
import { useRecoilState } from 'recoil'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.locale('ko');
dayjs.extend(relativeTime)

interface Prop {
  content: string
}
export const ChatBubble_Me = ({ content }: Prop) => {
  return (
    <li>
      <div className="chat chat-end">
        <div className="chat-bubble">{content}</div>
      </div>
    </li>
  )
}
export const ChatBubble_U = ({ content }: Prop) => {
  const [user, _] = useRecoilState(UserDetailState)
  return (
    <li>
      <div className="chat chat-start">
        <div>
          <img src={user.profileImage} />
        </div>
        <div>
          <div className="chat-bubble">{content}</div>
          <span>{dayjs(Date.now()).fromNow(true)} 전</span>
        </div>
      </div>
    </li>
  )
}
