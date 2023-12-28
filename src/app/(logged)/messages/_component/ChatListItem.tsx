'use client'
import Link from 'next/link'
import React from 'react'

const ChatListItem = () => {
  return (
    <li>
      <div className="inner">
        <Link href="/messages/nara">
          <div className="inner_left">
            <img src="/basicProfile.png" />
          </div>
          <div className="inner_right">
            <p className="username">user</p>
            <p className="lastmessage">
              Lorem ipsum dolor, sit amet consectetur adipisicing
            </p>
          </div>
        </Link>
      </div>
    </li>
  )
}

export default ChatListItem
