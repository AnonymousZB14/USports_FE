'use client'
import BackBtn from '@/components/backBtn'
import React, { FormEventHandler, useEffect, useState } from 'react'
import * as StompJs from '@stomp/stompjs'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { ChatBubble_Me, ChatBubble_U } from '../_component/ChatBubble'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import SockJS from 'sockjs-client'
import { IoSend } from 'react-icons/io5'
import WebSoketComponent from '../_component/WebSoketComponent'
import { SocketProvider } from '../_component/SocketComponent'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
import { getCookie } from '@/func/cookie_c'
const page = () => {
  const { room } = useParams()
  const route = useRouter()
  let [client, changeClient] = useState<StompJs.Client | null>(null)
  const [chat, setChat] = useState('')
  const [user, _] = useRecoilState(UserDetailState)
  const [chatList, setChatList] = useState<any[]>([])
  const userToken = getCookie('accessToken')
  var firstEnter = true
  useEffect(() => {
    console.log(chatList)
  }, [chatList])
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
          // console.log('beforeConnect')
        },
        debug(str) {
          console.log(`debug`, str)
        },
        reconnectDelay: 50000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
      })

      client.onConnect = function () {
        client.subscribe(`/exchange/chat.exchange/room.` + room, callback)
        if (firstEnter == true) {
          sendEnterMessage()
          firstEnter = false
        }
      }
      client.activate()
      changeClient(client)
    } catch (error) {
      console.log(error)
    }
    function sendEnterMessage() {
      client !== null &&
        client.publish({
          destination: '/pub/chat/enter/' + room,
          body: JSON.stringify({
            content: '입장했습니다',
            chatRoomId: room,
            user: user.accountName,
            userId: user.memberId,
            imageAddress: user.profileImage,
            time: new Date(),
          }),
        })
    }

    const callback = function (message: any) {
      console.log('call back')
      if (message.body) {
        console.log(message)
        let msg = JSON.parse(message.body)
        console.log(msg)
        setChatList((prev) => [...prev, msg])
      }
    }
  }
  const sendChat: FormEventHandler = (e) => {
    e.preventDefault()
    if (chat === '' || client === null) {
      return
    }
    client.publish({
      destination: '/pub/chat/message/' + room,
      body: JSON.stringify({
        chatRoomId: room,
        user: user.accountName,
        userId: user.memberId,
        imageAddress: user.profileImage,
        content: chat,
        time: new Date(),
      }),
    })
    setChat('')
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
  }, [])

  return (
    <>
      <div className="chatDetailWrap">
        <div className="topSection">
          <IoChevronBackCircleSharp
            className={'hoverScaleAct'}
            onClick={() => {
              route.back()
            }}
          />
          <div>
            <Link href={'/profile'}>
              <img src="/basicProfile.png" />
            </Link>
            <p>username</p>
          </div>
        </div>
        <div className="bottomSection">
          <div className="inner">
            <ul>
              {chatList.map((_chatMessage, index) => (
                <li key={index}>{_chatMessage}</li>
              ))}

              <ChatBubble_U />
              <ChatBubble_Me />
            </ul>
            <form onSubmit={sendChat}>
              <input
                type="text"
                placeholder={`메세지를 입력해주세요`}
                value={chat}
                onChange={(e) => setChat(e.target.value)}
              ></input>
              <button type="submit">
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
