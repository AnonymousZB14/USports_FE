'use client'
import React from 'react'
import { list1 } from '@/app/(logged)/mypage/_data/mock'
import Link from 'next/link'
import { MdKeyboardArrowUp } from 'react-icons/md'
const EvaluationList = () => {
  return (
    <ul className="evaluationList">
      <EvaluationItem />
    </ul>
  )
}

export const EvaluationItem = () => {
  return (
    <li>
      <div className="evitemCont">
        <div className="sportsBadge">러닝</div>
        <div className="cont">
          <div className="title">
            <p>안양 평촌 칼라힐 어쩌구</p>
          </div>
          <div className="sub">
            <p className="subCon">21:00</p>
            <p className="conditions">
              <span>남녀모두</span>
              <span>모든 레벨</span>
            </p>
          </div>
        </div>
        <Link href="/profile">평가하기</Link>
        <button className="toggle">
          <MdKeyboardArrowUp />
        </button>
      </div>
      <div className="evitemList">
        <ul>
          <li>
            <p>{'NaraLee'}</p>
            <span>{`@${'nar***'}`}</span>
          </li>
          <li>
            <p>{'NaraLee'}</p>
            <span>{`@${'nar***'}`}</span>
          </li>
          <li>
            <p>{'NaraLee'}</p>
            <span>{`(@${'nar***'})`}</span>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default EvaluationList
