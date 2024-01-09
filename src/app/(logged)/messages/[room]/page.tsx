'use client'
import BackBtn from '@/components/backBtn'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import * as StompJs from '@stomp/stompjs'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { BsFillArrowDownCircleFill } from 'react-icons/bs'
import { ChatBubble_Me, ChatBubble_U } from '../_component/ChatBubble'
import { useParams, useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import SockJS from 'sockjs-client'
import { IoSend } from 'react-icons/io5'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
import { getCookie } from '@/func/cookie_c'
import { ChatListItem, Room } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { getChatList } from '../_lib/getChatList'
const page = () => {
  const { room } = useParams()
  const innerRef = useRef<HTMLDivElement | null>(null)
  const route = useRouter()
  let [client, changeClient] = useState<StompJs.Client | null>(null)
  const [chat, setChat] = useState('')
  const [user, _] = useRecoilState(UserDetailState)
  const [chatList, setChatList] = useState<ChatListItem[]>([])
  const userToken = getCookie('accessToken')
  const [scrollHeight, setScrollHeight] = useState(0)
  const [showBtn, setShowBtn] = useState(true)
  let isReady = false
  let $main: HTMLDivElement
  const btmRef = useRef<HTMLDivElement>(null)
  var firstEnter = true
  const { data, isFetching } = useQuery<ChatListItem[]>({
    queryKey: ['chatList', room],
    queryFn: getChatList,
  })
  useEffect(() => {
    data && setChatList(data)
  }, [data])
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
        if (firstEnter === true) {
          client.subscribe(`/exchange/chat.exchange/room.` + room, callback)
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
        setScrollHeight($main.scrollHeight)
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
        user: user.name,
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

  if (typeof document !== 'undefined') {
    $main = document.querySelector('#main') as HTMLDivElement
  }
  useEffect(() => {
    setScrollHeight($main.scrollHeight)
    innerRef.current?.scrollTo({
      top: $main.scrollHeight,
      behavior: 'smooth',
    })
    connect()
    return () => disConnect()
  }, [])
  const goToBottom = () => {
    btmRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  useEffect(() => {
    $main.scrollTop = scrollHeight
    // innerRef.current?.scrollIntoView({ behavior: 'smooth' })
    btmRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    goToBottom()
  }, [scrollHeight])
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  })

  useEffect(() => {
    if (inView) {
      setShowBtn(false)
    } else {
      setShowBtn(true)
    }
  }, [inView])
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
        </div>
        <div className="bottomSection">
          <div className="inner" ref={innerRef}>
            <ul>
              {chatList.map((_chatMessage, index) =>
                _chatMessage.user === user.name ? (
                  <ChatBubble_Me key={index} item={_chatMessage} />
                ) : (
                  <ChatBubble_U key={index} item={_chatMessage} />
                ),
              )}
              <div ref={ref} />
            </ul>

            <div className="inputFormWrap">
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
        <div ref={btmRef}></div>

        {showBtn === true && (
          <div className="toBottomBtn" onClick={goToBottom}>
            <BsFillArrowDownCircleFill />
          </div>
        )}
      </div>
    </>
  )
}

export default page
