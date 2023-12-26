'use client'
import React from 'react'
import { list1 } from '@/app/(logged)/mypage/_data/mock'
import Link from 'next/link'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/func/fetchCall'
import { redirect, useRouter } from 'next/navigation'

interface Prop {
  list: {
    recruitTile: string
    sportsName: string
    status: string
    recruitId: number
  }[]
}
const ApplicationStatus = ({ list }: Prop) => {
  return (
    <ul className="applicationsList">
      {list.map((item, idx) => (
        <ApplicationItem key={idx} item={item} />
      ))}
    </ul>
  )
}
interface ItemProp {
  item: {
    recruitTile: string
    sportsName: string
    status: string
    recruitId: number
  }
}
export const ApplicationItem = ({ item }: ItemProp) => {
  const changeKor = (value: string) => {
    switch (value) {
      case 'ACCEPTED':
        return <button className="accepted">수락됨</button>
      case 'ING':
        return <button className="applying">신청중</button>
      case 'ACCEPTED':
        return <button className="accepted">수락됨</button>
      case 'ACCEPTED':
        return <button className="accepted">수락됨</button>
    }
  }
  const route = useRouter()
  const cancleHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    try {
      const res = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/recruit/${item.recruitId}/cancel`,
      )
      if (res.status === 200) {
        alert('신청이 취소되었습니다')
        location.reload()
      }
    } catch (error) {}
  }
  return (
    <li>
      <div className="applicationCont">
        <div className="sportsBadge">{item.sportsName}</div>
        <div className="cont">
          <p className="title">{item.recruitTile}</p>
        </div>
        <div className="buttonWrap">
          <button className="cancle" onClick={cancleHandler}>
            신청취소
          </button>
          {changeKor(item.status)}
          {/*           <button className="applying">신청중</button>
          <button className="rejected">거절됨</button>
          <button className="accepted">수락됨</button> */}
        </div>
      </div>
    </li>
  )
}

export default ApplicationStatus
