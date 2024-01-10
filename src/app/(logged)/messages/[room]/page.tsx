'use client'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import * as StompJs from '@stomp/stompjs'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { BsFillArrowDownCircleFill } from 'react-icons/bs'
import { ChatBubble_Me, ChatBubble_U } from '../_component/ChatBubble'
import { useParams, useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import SockJS from 'sockjs-client'
import { IoSend } from 'react-icons/io5'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
import { getCookie } from '@/func/cookie_c'
import { ChatList, ChatListItem } from '@/types/types'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { getChatList } from '../_lib/getChatList'
import { Postfetch } from '@/func/fetchCall'
import { AiFillSetting } from 'react-icons/ai'
import Button from '@/components/commonButton'
const page = () => {
  const { room } = useParams()
  const innerRef = useRef<HTMLUListElement | null>(null)
  const route = useRouter()
  let [client, changeClient] = useState<StompJs.Client | null>(null)
  const [chat, setChat] = useState('')
  const [user, _] = useRecoilState(UserDetailState)
  const [chatList, setChatList] = useState<ChatListItem[]>([])
  const userToken = getCookie('accessToken')
  const [showBtn, setShowBtn] = useState(true)
  const btmRef = useRef<HTMLDivElement>(null)
  const [firstEnter, setfirstEnter] = useState(true)
  const { data, fetchNextPage, hasNextPage, hasPreviousPage, isFetching } =
    useInfiniteQuery<ChatList, Object, InfiniteData<ChatList>, any, number>({
      queryKey: ['chatList', room],
      queryFn: getChatList,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.totalPages === 0 ||
          lastPage.totalPages === lastPage.currentPage
          ? undefined
          : lastPage.currentPage + 1
      },
    })
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  })
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0,
    delay: 0,
  })
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  useEffect(() => {
    if (!data) return
    data.pages.map((page) => setChatList((prev) => [...prev, ...page.list]))
  }, [data])
  useEffect(() => {
    firstEnter && btmRef.current?.scrollIntoView(true)
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
        debug(str) {
          // console.log(`debug`, str)
        },
        reconnectDelay: 50000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
      })

      client.onConnect = function () {
        if (firstEnter === true) {
          client.subscribe(`/exchange/chat.exchange/room.` + room, callback)
          sendEnterMessage()
          setfirstEnter(false)
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
      if (message.body) {
        // console.log(message)
        let msg = JSON.parse(message.body)
        // console.log(msg)
        setChatList((prev) => [msg, ...(prev as ChatListItem[])])
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

  const leaveChatRoom = async () => {
    try {
      const res = await Postfetch('/markchat', {
        chatRoomId: room,
        userId: user.memberId,
      })
      if (res.status === 200) {
        setChatList([])
      }
    } catch (error) {
      console.log(error)
    }
  }
  const goToBottom = () => {
    btmRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  useEffect(() => {
    connect()
    return () => {
      disConnect()
      leaveChatRoom()
    }
  }, [])

  useEffect(() => {
    if (inView2) {
      setShowBtn(false)
    } else {
      setShowBtn(true)
    }
  }, [inView2])
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
          <div className="settingBtn">
            <Button>초대하기</Button>
            <Button theme="red">나가기</Button>
          </div>
        </div>
        <div className="bottomSection">
          <div className="inner">
            {chatList.length > 1 && <div ref={ref} style={{ height: 10 }} />}
            <ul ref={innerRef}>
              {chatList &&
                chatList.map((_chatMessage, index) =>
                  _chatMessage.userId === user.memberId ? (
                    <ChatBubble_Me key={index} item={_chatMessage} />
                  ) : (
                    <ChatBubble_U key={index} item={_chatMessage} />
                  ),
                )}
            </ul>
            <div ref={btmRef} style={{ height: 10 }} />
            <div ref={ref2} />
          </div>

          <div className="inputFormWrap">
            <div className="inputFormInner">
              <form onSubmit={sendChat}>
                <input
                  type="text"
                  placeholder={`메세지를 입력해주세요`}
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                ></input>
                <Button theme="black" type="submit">
                  <IoSend />
                </Button>
              </form>
            </div>
          </div>
        </div>
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
