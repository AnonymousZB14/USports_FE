'use client'
import Avatar from '@/components/avatar'
import CateUl from '@/components/cateUl'
import Records from '@/app/(logged)/profile/_component/records'
import Recruits, { Recruit } from '@/components/recruits'
import { Getfetch } from '@/func/fetchCall'
import React, { useEffect, useRef, useState } from 'react'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { getProfileUser } from '../../_lib/getProfileUser'
import { ProfileUserType } from '@/types/types'
import UserAvatar from '@/components/userAvatar'
const Content = ({ accountName }: { accountName: string }) => {
  const [number, setNum] = useState(0)
  const divRef = useRef<HTMLDivElement | null>(null)
  const cateOnclick = (e: React.MouseEvent<HTMLUListElement>) => {
    const num = [...e.currentTarget.children].indexOf(e.target as HTMLLIElement)
    setNum(num)
  }
  const { data, isFetching } = useQuery<ProfileUserType, Object>({
    queryKey: ['profile', accountName],
    queryFn: getProfileUser,
  })
  useEffect(() => {
    ;[...(divRef.current as HTMLDivElement).children].forEach((div, idx) => {
      idx === number
        ? div.classList.add('active')
        : div.classList.remove('active')
    })
  }, [number])
  useEffect(() => {
    console.log(data)
  },[data])
  return (
    <>
      <div className="profile_info">
        <div className="inner">
          <UserAvatar accountName={accountName} image={data?.memberProfile.profileImage!} />
          <div className="user_info">
            <h3>{accountName}</h3>
            <p>{data?.memberProfile.email}</p>
          </div>
        </div>
      </div>
      <div className="profile_contents">
        <CateUl onClick={cateOnclick} categories={['Record', 'Recruit']} />
        <div className="tab_contents" ref={divRef}>
          {number === 0 ? (
            <div className="records">
              <Records accoutName={accountName} />
            </div>
          ) : (
            <div className="recruits">
              <Recruits accoutName={accountName} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Content
