'use client'
import React from 'react'
import { list1 } from '@/app/(logged)/mypage/_data/mock'
import Link from 'next/link'
import Button from './Button'

const ApplyStatus = () => {
  return (
    <ul className="apply-list">
      <ApplyItem />
      <ApplyItem />
    </ul>
  )
}

export const ApplyItem = () => {
  return (
    <li className="apply-item">
      <div className="status-badge">대기</div>
      <div className="cont">
        <p className="name">홍길동</p>
        <div className="info">
          <span className="gender">남성</span>
          <span className="bar"></span>
          <span className="manner">매너온도 상</span>
        </div>
      </div>
      <div className="button-wrap">
        {/* <button className="reject">거절</button> */}
        <Button theme="blue">수락</Button>
      </div>
    </li>
  )
}

export default ApplyStatus
