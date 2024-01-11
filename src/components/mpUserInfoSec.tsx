'use client'
import React, { useEffect } from 'react'
import { QueryClient, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getMypageData } from '@/app/(logged)/mypage/_lib/getMypageData'
import { MypageData } from '@/types/types'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
import { useRouter } from 'next/navigation'
import { FaMedal } from 'react-icons/fa6'
import { sportsGrageKor } from '@/func/translateKor'
const MpUserInfoSec = () => {
  const [user, _] = useRecoilState(UserDetailState)
  const route = useRouter()
  const { data, isFetching } = useQuery<MypageData, Object>({
    queryKey: ['mypage'],
    queryFn: getMypageData,
  })

  useEffect(() => {
    // console.log(data)
  }, [data])
  if (!data) return null
  return (
    <>
      <div className="basicInfo">
        <div>
          <div className="avatar_img" style={{ width: 100, height: 100 }}>
            {
              <Link href={'/profile'}>
                <img
                  src={user.profileImage || '/basicProfile.png'}
                  alt="profile"
                  width={100}
                  height={100}
                />
              </Link>
            }
          </div>
        </div>
        <div>
          <h4>{data.memberProfile.name}</h4>
          <p>@{data.memberProfile.accountName}</p>
          <span>{data.memberProfile.email}</span>
        </div>
        <div className="btnWrap">
          <Link className="link-btn" href={`/member/${user.accountName}/info`}>
            Skills
          </Link>
          <button
            className="link-btn"
            onClick={() => {
              route.push(`/member/${data?.memberProfile.accountName}`)
            }}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="ratingInfo">
        <ul>
          <li>
            <p className="content">
              {data.memberProfile.interestSportsList.map((sport, idx) =>
                idx < 3 ? sport.sportsName + ' ' : '',
              )}
              {data.memberProfile.interestSportsList.length > 3
                ? `+${data.memberProfile.interestSportsList.length - 3}`
                : ''}
            </p>
            <p className="title">관심 운동</p>
          </li>
          <li>
            <p className="content">
              {data.memberProfile.mannerScore.toFixed(1)}
            </p>
            <p className="title">매너 점수</p>
          </li>
          <li>
            <p className="content">
              <Link href={`/member/${user.accountName}/info`}>
                <FaMedal />
              </Link>
            </p>
            <p className="title">운동별 능력</p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MpUserInfoSec
