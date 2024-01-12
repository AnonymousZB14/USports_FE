'use client'
import { Getfetch } from '@/func/fetchCall'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { Notification as N } from '@/types/types'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { NotificationState } from '@/store/user'
const Notifications = () => {
  const [list, setList] = useState<N[]>([])
  const [notificatioinExist, setNtExist] = useRecoilState(NotificationState)
  useLayoutEffect(() => {
    Getfetch(`/notifications`).then((resp) => {
      setList(resp)
      setNtExist({
        msg: '',
        state: false,
      })
    })
  }, [])
  if (list.length < 1) return <p className="info">새로운 알림내역이 없습니다</p>
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
  const date = new Date(item.createdAt).toLocaleString()
  return (
    <li
      // className={isitPassed ? 'readed' : ''}
      onClick={() => {
        item.url != null && route.push(`${item.url}`)
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
