import Title from '@/components/title'
import React from 'react'
import ChatListItem from './_component/ChatListItem'

const page = () => {
  return (
    <>
      <Title title="DM" />
      <div className='messageWrap'>
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
