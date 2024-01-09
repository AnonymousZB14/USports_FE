'use client'
import Title from '@/components/title'
import React from 'react'
import ChatListItem from './_component/ChatListItem'
import { useQuery } from '@tanstack/react-query'
import { getRooms } from './_lib/getRooms'
import { Rooms } from '@/types/types'


const page = () => {
  const { data, isFetching } = useQuery<Rooms, Object>({
    queryKey: ['chatrooms'],
    queryFn: getRooms,
  })
  return (
    <>
      
        <Title title="DM" />
        <div className="messageWrap">
          <ul>
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
          </ul>
        </div>
      
    </>
  )
}

export default page
