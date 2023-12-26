'use client'
import React from 'react'
import { list1 } from '@/app/(logged)/mypage/_data/mock'
import Link from 'next/link'
import Button from './commonButton'
import { IngList } from '@/types/types'
import { Postfetch } from '@/func/fetchCall'
import { useRouter } from 'next/navigation'
interface Prop {
  list: IngList[]
  accepted: boolean
  recruitId: number
}
const ApplyStatus = ({ list, accepted, recruitId }: Prop) => {
  if (list.length < 1)
    return <p className="info">대기 중인 지원자가 없습니다</p>
  return (
    <ul className="apply-list">
      {list.map((item) => (
        <ApplyItem
          key={item.memberId}
          item={item}
          accepted={accepted}
          recruitId={recruitId}
        />
      ))}
    </ul>
  )
}

export const ApplyItem = ({
  item,
  accepted,
  recruitId,
}: {
  item: IngList
  accepted: boolean
  recruitId: number
}) => {
  const route = useRouter()
  const participantsHandler = async (boolean: boolean) => {
    try {
      const res = await Postfetch(`recruit/${recruitId}/manage`, {
        accept: boolean,
        applicantId: item.memberId,
      })
      if (res.status === 200) {
        alert('완료')
        route.back()
      }
    } catch (error) {}
  }
  return (
    <li className="apply-item">
      <div className="status-badge">{item.status}</div>
      <div className="cont">
        <p className="name">{item.accountName}</p>
        <div className="info">
          <span className="gender">{item.gender}</span>
          <span className="bar"></span>
          <span className="manner">{item.sportsSkill}</span>
        </div>
      </div>
      {accepted === false && (
        <div className="button-wrap">
          <Button
            theme="gray"
            onClick={(e: React.MouseEvent) => participantsHandler(false)}
          >
            거절
          </Button>
          &nbsp;
          <Button
            theme="blue"
            onClick={(e: React.MouseEvent) => participantsHandler(true)}
          >
            수락
          </Button>
        </div>
      )}
    </li>
  )
}

export default ApplyStatus
