'use client'
import { Getfetch } from '@/func/fetchCall'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { Notification as N } from '@/types/types'
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
        return (
          <Notification key={idx} title={item.entityType} body={item.message} />
        )
      })}
    </ul>
  )
}

export const Notification = ({
  title,
  body,
}: {
  title: string
  body: string
}) => {
  return (
    <li>
      <div role="alert" className="alert shadow-lg">
        <IoMdNotifications />
        <div>
          <h3 className="font-bold">{title}</h3>
          <div>{body}</div>
        </div>
        <button className="btn btn-sm">delete</button>
      </div>
    </li>
  )
}
export default Notifications
