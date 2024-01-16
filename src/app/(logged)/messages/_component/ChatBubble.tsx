'use client'
import { UserDetailState } from '@/store/user'
import React from 'react'
import { useRecoilState } from 'recoil'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
dayjs.locale('ko')
dayjs.extend(relativeTime)
import { ChatListItem } from '@/types/types'
import { useRouter } from 'next/navigation'
interface Prop {
  item: ChatListItem
}
export const ChatBubble_Me = ({ item }: Prop) => {
  return (
    <li>
      <div className="chat chat-end">
        <div className="chat-bubble">{item.content}</div>
      </div>
    </li>
  )
}
export const ChatBubble_U = ({ item }: Prop) => {
  const route = useRouter()
  const [user, _] = useRecoilState(UserDetailState)
  return (
    <li>
      <div className="chat chat-start">
        <div onClick={() => route.replace(`/profile/${item.user}`)}>
          <img
            src={item.imageAddress ? item.imageAddress : '/basicProfile.png'}
          />
        </div>
        <div>
          <div className="chat-bubble">{item.content}</div>
          <span>{dayjs(item.time).fromNow(true)} 전</span>
        </div>
      </div>
    </li>
  )
}
