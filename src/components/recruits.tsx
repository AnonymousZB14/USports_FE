'use client'
import React, { Fragment, useEffect, useState } from 'react'
import UserInfoSec from './userInfoSec'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getMyRecruits } from '@/app/(logged)/profile/_lib/getMyRecruits'
import UserInfo from './userInfo'
import { getProfileUser } from '@/app/(logged)/profile/_lib/getProfileUser'
import { ProfileUserType, recruitItemProps } from '@/types/types'
import KaKaoMap from './kakaoMap'
import { useRecoilState } from 'recoil'
import { SportsList } from '@/store/types'
interface Recruits {
  currentPage: number
  totalPages: number
  list: recruitItemProps[]
}
interface Recruit {
  content: string
  memberId: number
  recruitId: number
  recruitStatus: string
  sportsId: number
  title: string
}
const Recruits = ({ accoutName }: { accoutName: string }) => {
  const { data: user } = useQuery<ProfileUserType>({
    queryKey: ['profile', accoutName],
    queryFn: getProfileUser,
  })
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    Recruits,
    Object,
    InfiniteData<Recruits>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ['recruits', accoutName],
    queryFn: getMyRecruits,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.totalPages === 0 ||
        lastPage.totalPages === lastPage.currentPage
        ? undefined
        : lastPage.currentPage + 1
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  })
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  })
  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  if (!data) return null

  return (
    <>
      <ul>
        {data?.pages.map((page, itemIdx: number) => (
          <Fragment key={itemIdx}>
            {page.list.length < 1 ? (
              <p className="info" style={{ width: '100%' }}>
                No Data
              </p>
            ) : (
              page.list.map((recruit, idx) => (
                <Recruit key={idx} item={recruit} user={user!} />
              ))
            )}
          </Fragment>
        ))}
      </ul>
      <div ref={ref} style={{ height: 50 }} />
    </>
  )
}

export const Recruit = ({
  item,
  user,
}: {
  item: recruitItemProps
  user: ProfileUserType
}) => {
  const [sportList, _] = useRecoilState(SportsList)
  const [sportname, setSportname] = useState('')
  useEffect(() => {
    sportList.map((sport) => {
      if (sport.sportsId == item.sportsId) {
        setSportname(sport.sportsName)
      }
    })
  }, [sportList])
  return (
    <li>
      <div className="recruit_head">
        <UserInfo
          userId={user.memberInfo.email}
          userImage={user.memberInfo.profileImage}
          accountName={user.memberInfo.name}
        />
        <Link href={`/recruit/${item.recruitId}`}>자세히보기</Link>
      </div>
      <div className="recruit_body">
        <div className="mapWrap" style={{ width: 200 }}>
          <KaKaoMap recruitData={item} />
          <p>
            {item.streetNameAddr} {item.placeName}
          </p>
        </div>
        <div className="bodyWrap">
          <div className="badgeWrap">
            <span className="sport">{item.sportsName}</span>
            <span className="gender">{item.gender}</span>
            <span className="level">
              {item.gradeFrom}
              &nbsp;~&nbsp;
              {item.gradeTo}
            </span>
          </div>
          <h4>{item.title}</h4>
          <p>{item.content}</p>
        </div>
      </div>
    </li>
  )
}
export default Recruits
