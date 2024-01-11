'use client'
import Title from '@/components/title'
import React, { useEffect, useState } from 'react'
import ChatListItem from './_component/ChatListItem'
import { useQuery } from '@tanstack/react-query'
import { getRooms } from './_lib/getRooms'
import { Rooms } from '@/types/types'

const page = () => {
  const [chatList, setChatList] = useState<Rooms>()
  const { data, isFetching } = useQuery<Rooms, Object>({
    queryKey: ['chatrooms'],
    queryFn: getRooms,
  })
  useEffect(() => {
    data && setChatList(data)
  }, [data])
  return (
    <>
      <Title title="DM" />
      <div className="messageWrap">
        <ul>
          {chatList?.map((chat) => <ChatListItem key={chat.chatRoomId} item={chat} />)}
        </ul>
      </div>
    </>
  )
}

export default page
