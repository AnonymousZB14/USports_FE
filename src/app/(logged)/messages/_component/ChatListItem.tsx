'use client'
import { Room } from '@/types/types'
import Link from 'next/link'
import React from 'react'
import { AiFillMessage } from "react-icons/ai";
const ChatListItem = ({ item }: { item: Room }) => {
  return (
    <li>
      <div className="inner">
        <Link href={`/messages/${item.chatRoomId}`}>
          <div className="inner_left">
            {/* <img src="/basicProfile.png" /> */}
            <AiFillMessage />
          </div>
          <div className="inner_right">
            <p className="username">{item.chatRoomName}</p>
            {item.unreadChatCount !== 0 && (
              <p className="lastmessage">{item.unreadChatCount}</p>
            )}
          </div>
        </Link>
      </div>
    </li>
  )
}

export default ChatListItem
