'use client'
import { Getfetch } from '@/func/fetchCall'
import {
  NotificationState,
  UserDetailState,
  UserTokenState,
} from '@/store/user'
import { IoClose, IoNotificationsSharp } from 'react-icons/io5'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { getCookie } from '@/func/cookie_c'
const SseComponent = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [token, _] = useRecoilState(UserTokenState)
  const [user, _2] = useRecoilState(UserDetailState)
  const [notificatioinExist, setNtExist] = useRecoilState(NotificationState)
  const TOKEN = getCookie('accessToken')
  const EventSource = EventSourcePolyfill || NativeEventSource
  useEffect(() => {
    console.log(notificatioinExist)
  }, [notificatioinExist])
  useEffect(() => {
    // if (!TOKEN) return
    // if (user.memberId === 0) return
    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          Connection: 'keep-alive',
        },
      },
    )

    eventSource.onopen = () => console.log('open!!!!!')
    eventSource.onmessage = (e) => console.log('>>>', e.data)
    eventSource.onerror = (e) => console.log('error!!', e)
    eventSource.addEventListener('sse', (event: any) => {
      const { data } = event
      console.log('SSE CONNECTED')
      if (!data.includes(`EventStream Created`))
        setNtExist({ msg: data, state: true })
    })

    /*     eventSource.addEventListener('error', (err: any) => {
      console.log(err)
    })
    eventSource.addEventListener('message', (event: any) => {
      console.log(event.data)
    }) */

    return () => {
      eventSource.close()
      console.log('SSE CLOSED')
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
          className={notificatioinExist.msg ? 'hasNotification alert' : 'alert'}
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
            <p>{notificatioinExist.msg}</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SseComponent
