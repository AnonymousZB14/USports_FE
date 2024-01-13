'use client'
import {
  NotificationState,
  UserDetailState,
  UserTokenState,
} from '@/store/user'
import { IoClose } from 'react-icons/io5'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { useRouter } from 'next/navigation'
const SseComponent = () => {
  const [token, _] = useRecoilState(UserTokenState)
  const [user, _2] = useRecoilState(UserDetailState)
  const [notificatioinExist, setNtExist] = useRecoilState(NotificationState)
  const EventSource = EventSourcePolyfill || NativeEventSource
  const router = useRouter()
  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          Connection: 'keep-alive',
        },
      },
    )
    eventSource.addEventListener('sse', (event: any) => {
      const { data } = event
      if (!data.includes(`EventStream Created`))
        setNtExist({ msg: data, state: true })
    })
    return () => {
      eventSource.close()
    }
  }, [user])
  const btnClickHandler = () => {
    setNtExist((prev) => {
      return {
        ...prev,
        msg: '',
      }
    })
  }
  return (
    <div className="notificationWrap">
      <div className="inner">
        <section
          className={
            notificatioinExist.msg !== '' ? 'hasNotification alert' : 'alert'
          }
        >
          <button onClick={btnClickHandler}>
            <IoClose />
          </button>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p onClick={() => router.replace('/notifications')}>
              {notificatioinExist.msg}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SseComponent
