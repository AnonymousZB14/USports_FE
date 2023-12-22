'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'
interface Prop {
  list: PropItem[]
}
interface PropItem {
  memberList: {
    accountName: string
    accountNonExpired: boolean
    accountNonLocked: boolean
    activeRegion: string
    attributes: {}
    authorities: {
      authority: string
    }[]
    birthDate: Date
    credentialsNonExpired: boolean
    email: string
    emailAuthAt: Date
    enabled: boolean
    evaluationCount: number
    gender: string
    kindnessScore: number
    loginBy: string
    mannerScore: number
    memberId: number
    name: string
    passionScore: number
    password: string
    penaltyCount: number
    phoneNumber: string
    profileImage: string
    profileOpen: boolean
    registeredAt: Date
    role: string
    teamworkScore: number
    updatedAt: Date
    username: string
  }[]

  recruit: {
    content: string
    cost: number
    gender: string
    gradeFrom: string
    gradeTo: string
    lat: string
    lnt: string
    meetingDate: Date
    memberId: number
    placeName: string
    recruitCount: number
    recruitId: number
    recruitStatus: string
    region: string
    registeredAt: Date
    sportsName: string
    streetNameAddr: string
    streetNumberAddr: string
    title: string
    updatedAt: Date
  }
}
const EvaluationList = ({ list }: Prop) => {
  if(list.length<1) return <p className='info'>평가할 모집글이 없습니다</p>
  return (
    <ul className="evaluationList">
      {list.map((item) => (
        <EvaluationItem key={item.recruit.recruitId} item={item} />
      ))}
    </ul>
  )
}

export const EvaluationItem = ({ item }: { item: PropItem }) => {
  const [showList, setShowList] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // console.log(showList)
    btnRef.current?.classList.toggle('active')
    if (showList) {
      listRef.current?.classList.add('show')
    } else {
      listRef.current?.classList.remove('show')
    }
  }, [showList])
  return (
    <li>
      <div className="evitemCont">
        <div className="sportsBadge">축구</div>
        <div className="cont">
          <div className="title">
            <p>안양 평촌 칼라힐</p>
          </div>
          <div className="sub">
            <p className="subCon">21:numbernumber</p>
            <p className="conditions">
              <span>남녀모두</span>
              <span>모든 레벨</span>
            </p>
          </div>
        </div>
        <Link href="/profile">평가하기</Link>
        <button
          ref={btnRef}
          className="toggleBtn"
          onClick={() => {
            setShowList(!showList)
          }}
        >
          <IoIosArrowDown />
        </button>
      </div>
      <div className="evitemList" ref={listRef}>
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
