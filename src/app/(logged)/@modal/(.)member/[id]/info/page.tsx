'use client'
import Modal from '@/components/modal'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment, use, useEffect, useState } from 'react'
import { getMyDetailData } from './_lib/getMyDetailData'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'

interface UserInfo {
  memberInfo: {
    accountName: string
    email: string
    interestSportsList: {
      sportsId: number
      sportsName: string
    }[]
    mannerScore: number
    memberId: number
    name: string
    profileImage: string
  }
  sportsSkills: {
    sportsGrade: string
    sportsName: string
    sportsSkillId: number
  }[]
}
const Page = () => {
  const router = useRouter()
  const [user, _] = useRecoilState(UserDetailState)
  const { data, isFetching } = useQuery<UserInfo, Object>({
    queryKey: ['mypage', 'detail'],
    queryFn: getMyDetailData,
  })
  const [userInfo, setUserInfo] = useState<UserInfo>()
  useEffect(() => {
    if (data) setUserInfo(data)
  }, [data])
  return (
    <Modal>
      <div className="my-info-wrap">
        <div className="my-info-header">
          <div className="profile-box">
            <img
              className="profile-img"
              width={100}
              height={100}
              alt="avatar"
              src={user.profileImage}
            />

            <p>{userInfo?.memberInfo.accountName}</p>
          </div>
        </div>
        <div className="my-info-body">
          <div className="exercise-wrap">
            <h2>운동 평균 점수</h2>
            <div className="exercise-score">
              {data?.sportsSkills &&
                data?.sportsSkills.length < 1 ? (
                <p>No data</p>
              ) : (
                data?.sportsSkills.map((item, idx) => (
                  <Fragment key={idx}>
                    <h3>{item.sportsName}</h3>
                    <p>{item.sportsGrade}</p>
                  </Fragment>
                ))
              )}
            </div>
          </div>
          <div className="manners-wrap">
            <h2>매너 점수</h2>
            <div className="manner-score">
              <h3>평균</h3>
              <p>{data?.memberInfo.mannerScore}</p>
            </div>
            {/*             <div className="passion-score">
              <h3>열정 점수</h3>
              <p>5/10</p>
            </div>
            <div className="teamwork-score">
              <h3>팀워크 점수</h3>
              <p>2/10</p>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Page
