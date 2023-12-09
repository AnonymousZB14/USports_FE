'use client'
import React from 'react'
import { list1 } from '@/app/(logged)/mypage/_data/mock'
import Link from 'next/link'
import { MdKeyboardArrowUp } from 'react-icons/md'
const ApplicationStatus = () => {
  return (
    <ul className="applicationsList">
      <ApplicationItem />
    </ul>
  )
}

export const ApplicationItem = () => {
  return (
    <li>
      <div className="applicationCont">
        <div className="sportsBadge">축구</div>
        <div className="cont">
          <p className="title">안양 평촌 칼라힐</p>
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
