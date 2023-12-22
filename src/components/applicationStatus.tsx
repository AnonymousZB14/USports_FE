'use client'
import React from 'react'
import { list1 } from '@/app/(logged)/mypage/_data/mock'
import Link from 'next/link'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { useQuery } from '@tanstack/react-query'

interface Prop {
  list: {
    recruitTile: string
    sportsName: string
    status: string
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
  }
}
export const ApplicationItem = ({ item }: ItemProp) => {
  const changeKor = (value: string) => {
    switch (value) {
      case 'ACCEPTED':
        return '수락됨';
      case 'ACCEPTED':
        return '수락됨';
      case 'ACCEPTED':
        return '수락됨';
      case 'ACCEPTED':
        return '수락됨';
    }
  }
  return (
    <li>
      <div className="applicationCont">
        <div className="sportsBadge">{item.sportsName}</div>
        <div className="cont">
          <p className="title">{item.recruitTile}</p>
        </div>
        <div className="buttonWrap">
          <button className="cancle">신청취소</button>
          <button className="applying">신청중</button>
          <button className="rejected">거절됨</button>
          <button className="accepted">수락됨</button>
        </div>
      </div>
    </li>
  )
}

export default ApplicationStatus
