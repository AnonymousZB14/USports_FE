'use client'
import React from 'react'
import { list1 } from '@/app/(logged)/mypage/_data/mock'
import Link from 'next/link'
import { MdKeyboardArrowUp } from 'react-icons/md'
const RecruitManagement = () => {
  return (
    <ul className="recruitManagement">
      <RecruitManagementItem />
      <RecruitManagementItem />
      <RecruitManagementItem />
    </ul>
  )
}

export const RecruitManagementItem = () => {
  return (
    <li>
      <div className="recruitItemCont">
        <div className="sportsBadge">클라이밍</div>
        <div className="cont">
          <div className="title">
            <p>강동 알레 클라이밍 12/4</p>
          </div>
          <div className="sub">
            <p className="subCon">21:00</p>
            <p className="conditions">
              <span>남녀모두</span>
              <span>모든 레벨</span>
            </p>
          </div>
        </div>
        <p className="status">모집중</p>
        <Link href="/profile">관리 ⇀</Link>
      </div>
    </li>
  )
}

export default RecruitManagement
