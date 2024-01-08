'use client'
import * as StompJs from '@stomp/stompjs'
import { getCookie } from '@/func/cookie_c'
import { useEffect, useState } from 'react'
import { Stomp } from '@stomp/stompjs'

interface Prop {
  roomId: number
}
const WebSoketComponent = ({ roomId }: Prop) => {
  let [client, changeClient] = useState<StompJs.Client | null>(null)
  const [chat, setChat] = useState('')
  const [chatList, setChatList] = useState([''])
  const userToken = getCookie('accessToken')
  var firstEnter = true

  const connect = () => {
    /*     let socket = new WebSocket('ws://3.39.34.245:8080/chat')
    socket.onopen = function (e) {
      alert('[open] 커넥션이 만들어졌습니다.')
      alert('데이터를 서버에 전송해봅시다.')
      socket.send('My name is Bora')
    } */
    try {
      const client = new StompJs.Client({
        brokerURL: 'ws://3.39.34.245:8080/chat/room',
        connectHeaders: {
          credentials: 'include',
          Authorization: `Bearer ${userToken}`,
        },
        beforeConnect: () => {
          console.log('beforeConnect')
        },
        debug(str) {
          console.log(`debug`, str)
        },
        reconnectDelay: 50000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      })

      client.onConnect = function (frame) {
        console.log('onConnect!!')
        client.subscribe(`/chat/${roomId}`, callback)
      }
      client.activate()
      changeClient(client)
    } catch (error) {
      console.log(error)
    }

    const callback = function (message: any) {
      if (message.body) {
        let msg = JSON.parse(message.body)
        setChatList((prev) => [...prev, msg])
      }
    }
    const sendChat = () => {
      if (chat === '') {
        return
      }
      if (client === null) return
      client.publish({
        destination: '/pub/chat/' + roomId,
        body: JSON.stringify({
          type: '',
          sender: roomId,
          channelId: '1',
          data: chat,
        }),
      })

      setChat('')
    }
  }
  const disConnect = () => {
    // 연결 끊기
    if (client === null) {
      return
    }
    client.deactivate()
  }

  useEffect(() => {
    connect()
  }, [userToken])
  return null
}
export default WebSoketComponent
