'use client'
import { Getfetch } from '@/func/fetchCall'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { Notification as N } from '@/types/types'
import { useRouter } from 'next/navigation'
const Notifications = () => {
  const [list, setList] = useState<N[]>([])
  useLayoutEffect(() => {
    Getfetch(`/notifications`).then((resp) => {
      setList(resp)
    })
  }, [])
  return (
    <ul>
      {list.map((item, idx) => {
        return <Notification key={idx} item={item} />
      })}
    </ul>
  )
}

export const Notification = ({ item }: { item: N }) => {
  const route = useRouter()
  const date = new Date(item.createdAt).toDateString()
  const isitPassed = new Date() > new Date(item.readAt)
  console.log(isitPassed)
  return (
    <li
      // className={isitPassed ? 'readed' : ''}
      onClick={() => {
        route.push(`${item.url}`)
      }}
    >
      <div role="alert" className="alert shadow-lg">
        <IoMdNotifications />
        <div>
          <h3 className="font-bold">{item.message}</h3>
          <span>{date}</span>
        </div>
        {/* <button className="btn btn-sm">delete</button> */}
      </div>
    </li>
  )
}
export default Notifications
