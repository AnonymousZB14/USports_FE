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
  if (list.length < 1) return <p className="info">평가할 모집글이 없습니다</p>
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
        <div className="sportsBadge">{item.recruit.sportsName}</div>
        <div className="cont">
          <div className="title">
            <p>{item.recruit.title}</p>
          </div>
          <div className="sub">
            <p className="subCon">{item.recruit.region}</p>
            <p className="conditions">
              <span>{item.recruit.gender}</span>
              &nbsp;
              <span>
                {item.recruit.gradeFrom}~{item.recruit.gradeTo}
              </span>
            </p>
          </div>
        </div>

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
          {item.memberList.map((person) => (
            <li>
              <p>{person.accountName}</p>
              <Link
                className="linkbutton"
                href={`/recruit/partner/${item.recruit.recruitId}/${person.memberId}`}
              >
                평가하기
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default EvaluationList
