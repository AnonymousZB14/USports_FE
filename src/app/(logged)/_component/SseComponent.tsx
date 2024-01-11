'use client'
import { Getfetch } from '@/func/fetchCall'
import { UserDetailState, UserTokenState } from '@/store/user'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { getCookie } from '@/func/cookie_c'
const SseComponent = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [token, _] = useRecoilState(UserTokenState)
  const [user, _2] = useRecoilState(UserDetailState)
  const TOKEN = getCookie('accessToken')

  useEffect(() => {
    // if (!TOKEN) return
    // if (user.memberId === 0) return
    const EventSource = EventSourcePolyfill || NativeEventSource
    const eventSource = new EventSource(`/usports/subscribe`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        Credential: 'include',
        Connection: 'keep-alive',
      },
    })
    eventSource.addEventListener('connect', (event: any) => {
      const { data: receivedConnectData } = event
      console.log('SSE CONNECTED')
    })

    eventSource.addEventListener('message', (event: any) => {
      console.log(event.data)
    })
    eventSource.addEventListener('interval', (event) => {
      if (event) {
      }
    })
    return () => {
      eventSource.close()
      console.log('SSE CLOSED')
    }
  }, [user])

  return null
}

export default SseComponent
