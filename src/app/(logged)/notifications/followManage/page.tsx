'use client'
import Title from '@/components/title'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getFollow } from '../_lib/getFollow'
import { FollowUserPerType, FollowUserPerTypeList } from '@/types/types'
import Button from '@/components/commonButton'
import { IoPersonCircle } from 'react-icons/io5'
import { Postfetch } from '@/func/fetchCall'
const page = () => {
  const [userList, setUserList] = useState<FollowUserPerTypeList[]>()
  const { data, isFetching } = useQuery<FollowUserPerType>({
    queryKey: ['followList', 'request'],
    queryFn: getFollow,
  })
  useEffect(() => {
    console.log(data)
    setUserList(data?.list)
  }, [data])
  const participantsHandler = async (accept: boolean, memberId: number) => {
    try {
      const res = await Postfetch(
        `follow/${memberId}/manage?decision=${accept ? 'ACCEPT' : 'REFUSE'}`,
      )
      if (res.status === 200) {
        alert('완료')
        setUserList(
          (prev) => prev?.filter((item) => item.fromMemberId !== memberId),
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Title title="팔로우 요청" />
      <div className="notifications followRequestWrap">
        <ul>
          {userList && userList.length > 0 ? (
            userList.map((item, idx) => {
              return (
                <li className="alert shadow-lg" key={idx}>
                  <p>
                    <IoPersonCircle />
                    {item.fromMemberAccountName}
                  </p>
                  <div className="button-wrap">
                    <Button
                      theme="gray"
                      onClick={() =>
                        participantsHandler(false, item.fromMemberId)
                      }
                    >
                      거절
                    </Button>
                    &nbsp;
                    <Button
                      theme="blue"
                      onClick={() =>
                        participantsHandler(true, item.fromMemberId)
                      }
                    >
                      수락
                    </Button>
                  </div>
                </li>
              )
            })
          ) : (
            <p className='info'>새로운 팔로우 요청이 없습니다</p>
          )}
        </ul>
      </div>
    </>
  )
}

export default page
