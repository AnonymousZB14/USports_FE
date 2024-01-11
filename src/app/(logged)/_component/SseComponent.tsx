'use client'
import { Getfetch } from '@/func/fetchCall'
import {
  NotificationState,
  UserDetailState,
  UserTokenState,
} from '@/store/user'
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
      const { data: receivedConnectData } = event
      console.log('SSE CONNECTED')
      if (receivedConnectData !== `EventStream Created`) setNtExist(true)
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

  return null
}

export default SseComponent
