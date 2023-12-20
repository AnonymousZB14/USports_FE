import React, { Fragment, useEffect } from 'react'
import UserInfoSec from './userInfoSec'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getMyRecruits } from '@/app/(logged)/profile/_lib/getMyRecruits'
import UserInfo from './userInfo'
import { getProfileUser } from '@/app/(logged)/profile/_lib/getProfileUser'
import { ProfileUserType } from '@/types/types'
interface Recruits {
  currentPage: number
  totalPages:number,
  list: Recruit[]
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
      return lastPage.totalPages===0 || lastPage.totalPages === lastPage.currentPage
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
            {page.list.map((recruit) => (
              <Recruit
                key={recruit.recruitId + recruit.memberId}
                item={recruit}
                user={user!}
              />
            ))}
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
  item: Recruit
  user: ProfileUserType
}) => {
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
        <h4>{item.title}</h4>
        <p>{item.content}</p>
      </div>
    </li>
  )
}
export default Recruits
