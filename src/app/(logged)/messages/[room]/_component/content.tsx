'use client'
import React, {
  FormEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import * as StompJs from '@stomp/stompjs'
import { IoChevronBackCircleSharp, IoClose } from 'react-icons/io5'
import { BsFillArrowDownCircleFill } from 'react-icons/bs'
import { ChatBubble_Me, ChatBubble_U } from '../../_component/ChatBubble'
import { useParams, useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import SockJS from 'sockjs-client'
import { IoSend } from 'react-icons/io5'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
import { getCookie } from '@/func/cookie_c'
import {
  ChatList,
  ChatListItem,
  ChatRoomInfo,
  ChatRoomMember,
} from '@/types/types'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getChatList } from '../../_lib/getChatList'
import { Postfetch } from '@/func/fetchCall'
import { AiFillSetting } from 'react-icons/ai'
import Button from '@/components/commonButton'
import { getChatRoomInfo } from '../../_lib/getChatRoomInfo'
import axios from 'axios'
import Title from '@/components/title'
const Content = () => {
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
  const [members, setMembers] = useState<ChatRoomMember[]>()
  const [checkUser, setCheckUser] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  //dataFetching (useQuery)
  const {
    data: roomData,
    isFetching: isRoomDataFetching,
    isFetched,
  } = useQuery<ChatRoomInfo>({
    queryKey: ['chatRoom', room],
    queryFn: getChatRoomInfo,
  })
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
  //websocket
  const connect = () => {
    try {
      const client = new StompJs.Client({
        webSocketFactory: () => new SockJS(`/ws/chat`),
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
    setChatList([])
    client.deactivate()
    changeClient(null)
  }

  const leaveChatRoom = () => {
    try {
      const res = Postfetch('/markchat', {
        chatRoomId: room,
        userId: user.memberId,
      }).then((res) => {
        if (res.status === 200) setChatList([])
      })
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
  const exitHander = async () => {
    let isSuccess = false
    try {
      const res = await axios.delete(`/usports/chat/${room}/exit`)
      if (res.status === 200) {
        alert('채팅방을 나가셨습니다')
        isSuccess = true
      }
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) route.back()
  }
  //useEffect
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  useLayoutEffect(() => {
    if (!data) return

    data.pages.map((page) => {
      page.currentPage === 1
        ? setChatList([...page.list])
        : setChatList((prev) => [...prev, ...page.list])
    })
  }, [data])
  useEffect(() => {
    // console.log(chatList)
    firstEnter && btmRef.current?.scrollIntoView(true)
  }, [chatList])
  useEffect(() => {
    connect()
    return () => {
      leaveChatRoom()
      disConnect()
    }
  }, [])
  useEffect(() => {
    roomData && setMembers(roomData.members)
  }, [roomData])
  useLayoutEffect(() => {
    if (!members) return
    if (members?.findIndex((item) => item.memberId === user.memberId) > -1) {
      setCheckUser(true)
    } else {
      setCheckUser(false)
    }
  }, [members, isRoomDataFetching])
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
              leaveChatRoom()
              disConnect()
              setTimeout(() => {
                route.push('/messages')
              }, 100)
            }}
          />
          <div className="settingBtn">
            <Button onClick={() => setOpenModal((prev) => !prev)}>
              초대하기
            </Button>
            <Button theme="red" onClick={exitHander}>
              나가기
            </Button>
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
      {openModal && <InviteList setOpenModal={setOpenModal} />}
    </>
  )
}

const InviteList = ({
  chatId,
  list,
  recruitId,
  setOpenModal,
}: {
  chatId?: number
  list?: any
  recruitId?: number
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [memberList, setMemberList] = useState([])
  const router = useRouter()
  const inviteHandler = async (memberId: number) => {
    try {
      const res = await Postfetch(`/chat/invite`, {
        chatId: chatId,
        memberId,
        recruitId: recruitId,
      })
      if (res.status === 200) {
        alert('초대장이 전송되었습니다')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div id="modal">
      <div className="modalInner">
        <div
          className="closeModalBtn"
          onClick={() => setOpenModal((prev) => !prev)}
        >
          <IoClose />
        </div>
        <div className="inviteMemberModal">
          <Title title="멤버 초대"></Title>
          <ul>
            <li>
              <p>멤버아이디</p>
              <Button theme="blue">초대하기</Button>
            </li>
            <li>
              <p>멤버아이디</p>
              <Button theme="blue">초대하기</Button>
            </li>
            <li>
              <p>멤버아이디</p>
              <Button theme="blue">초대하기</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Content
