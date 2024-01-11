'use client'
import React, { useEffect, useState } from 'react'
import { list1 } from '@/app/(logged)/mypage/_data/mock'
import Link from 'next/link'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { MypageData } from '@/types/types'
import Button from './commonButton'
import { Postfetch } from '@/func/fetchCall'
import { useRouter } from 'next/navigation'
interface Prop {
  list: {
    gender: string
    recruitId: number
    sportsName: string
    status: string
    title: string
  }[]
}
const RecruitManagement = ({ list }: Prop) => {
  return (
    <ul className="recruitManagement">
      {list.map((item) => (
        <RecruitManagementItem key={item.recruitId} item={item} />
      ))}
    </ul>
  )
}
interface ItemProp {
  item: {
    gender: string
    recruitId: number
    sportsName: string
    status: string
    title: string
  }
}
export const RecruitManagementItem = ({ item }: ItemProp) => {
  const [chatRoom, setChatRoom] = useState<number>()
  const route = useRouter()
  const changeKor = (value: string) => {
    switch (value) {
      case 'ALMOST_END':
        return '마감 임박'
        break
      case 'END':
        return '마감'
        break
      case 'RECRUITING':
        return '모집중'
        break
    }
  }
  const createGroupChat = async () => {
    try {
      const res = await Postfetch(`/chat/recruit`, {
        recruitId: item.recruitId,
      })
      if (res.status === 200) {
        setChatRoom(res.data.chatRoomId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    createGroupChat()
  }, [])
  return (
    <li>
      <div className="recruitItemCont">
        <div className="sportsBadge">{item.sportsName}</div>
        <div className="cont">
          <div className="title">
            <p>{item.title}</p>
          </div>
          <div className="sub">
            <p className="subCon">{item.gender}</p>
            <p className="conditions">
              <span></span>
              {/* <span>모든 레벨</span> */}
            </p>
          </div>
        </div>
        <p className="status">{changeKor(item.status)}</p>
        <Link href={`/recruit/${item.recruitId}`}>관리 ⇀</Link>
        <Button
          theme="black"
          onClick={() => route.replace(`/messages/${chatRoom}`)}
        >
          채팅
        </Button>
      </div>
    </li>
  )
}

export default RecruitManagement
