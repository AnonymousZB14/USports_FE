'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { recruitItemProps } from '@/types/types'
import { useRecoilState } from 'recoil'
import { SportsList } from '@/store/types'

export const ExploreRecruitItem = ({ item }: { item: recruitItemProps }) => {
  const router = useRouter()
  const [sportList, _] = useRecoilState(SportsList)
  const [sportname, setSportname] = useState('')
  useEffect(() => {
    const selectedSport = sportList.find(
      (sport) => sport.sportsId == item.sportsId,
    )
    // console.log(selectedSport)
    setSportname(selectedSport?.sportsName!)
  }, [])
  return (
    <li
      className="board-item"
      key={item.recruitId}
      onClick={() => {
        router.replace(`/recruit/${item.recruitId}`)
      }}
    >
      <div className="badge">{item.sportsName}</div>
      <div className="content">
        <p className="title">{item.title}</p>
        <div className="condition">
          <span className="gender">{item.gender}</span>
          <span className="bar"></span>
          <span className="level">
            {item.gradeFrom}~{item.gradeTo}
          </span>
        </div>
      </div>
      <div className="status">{item.recruitStatus}</div>
    </li>
  )
}
