'use client'
import BackBtn from '@/components/backBtn'
import React from 'react'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { ChatBubble_Me, ChatBubble_U } from '../_component/ChatBubble'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const page = () => {
  const route = useRouter()
  return (
    <div className="chatDetailWrap">
      <div className="topSection">
        <IoChevronBackCircleSharp
          className={'hoverScaleAct'}
          onClick={() => {
            route.back()
          }}
        />
        <div>
          <Link href={'/profile'}>
            <img src="/basicProfile.png" />
          </Link>
          <p>username</p>
        </div>
      </div>
      <div className="bottomSection">
        <div className="inner">
          <ul>
            <ChatBubble_U />
            <ChatBubble_Me />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default page
