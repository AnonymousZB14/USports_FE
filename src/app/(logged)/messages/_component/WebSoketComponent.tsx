'use client'
import * as StompJs from '@stomp/stompjs'
import { getCookie } from '@/func/cookie_c'
import { useEffect, useState } from 'react'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
interface Prop {
  roomId: number
}
const WebSoketComponent = ({ roomId }: Prop) => {
  let [client, changeClient] = useState<StompJs.Client | null>(null)
  const [chat, setChat] = useState('')
  const [user, _] = useRecoilState(UserDetailState)
  const [chatList, setChatList] = useState([''])
  const userToken = getCookie('accessToken')
  var firstEnter = true
  const connect = () => {
    try {
      const client = new StompJs.Client({
        webSocketFactory: () => new SockJS(`http://3.39.34.245:8080/ws/chat`),
        // brokerURL: 'wss://javascript.info/article/websocket/demo/hello',
        // brokerURL: 'ws://3.39.34.245:8080/ws/chat',
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
        client.subscribe('/exchange/chat.exchange/room.' + roomId, callback)
      }
      client.activate()
      changeClient(client)
    } catch (error) {
      console.log(error)
    }

    const callback = function (message: any) {
      console.log('call back')
      if (message.body) {
        let msg = JSON.parse(message.body)
        setChatList((prev) => [...prev, msg])
      }
    }
    const sendChat = () => {
      if (chat === '' || client === null) {
        return
      }
      client.publish({
        destination: '/pub/chat/message/' + roomId,
        body: JSON.stringify({
          chatRoomId: roomId,
          user: user.accountName,
          userId: user.memberId,
          imageAddress: user.profileImage,
          content: chat,
          time: new Date(),
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
    return () => disConnect()
  }, [userToken])
  return null
}
export default WebSoketComponent
