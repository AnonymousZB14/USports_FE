'use client'
import { Room } from '@/types/types'
import Link from 'next/link'
import React from 'react'

const ChatListItem = ({ item }: { item: Room }) => {
  return (
    <li>
      <div className="inner">
        <Link href={`/messages/${item.chatRoomId}`}>
          <div className="inner_left">
            <img src="/basicProfile.png" />
          </div>
          <div className="inner_right">
            <p className="username">{item.chatRoomName}</p>
            <p className="lastmessage"></p>
          </div>
        </Link>
      </div>
    </li>
  )
}

export default ChatListItem
