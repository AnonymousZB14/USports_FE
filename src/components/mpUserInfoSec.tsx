'use client'
import React, { useEffect } from 'react'
import Avatar from './avatar'
import UserInfoSec from './userInfoSec'
import { QueryClient, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getMypageData } from '@/app/(logged)/mypage/_lib/getMypageData'
import { MypageData } from '@/types/types'
const MpUserInfoSec = () => {
  const { data, isFetching } = useQuery<MypageData, Object>({
    queryKey: ['mypage'],
    queryFn: getMypageData,
  })
  useEffect(() => {
    console.log(data)
  }, [data])
  if (!data) return null
  return (
    <>
      <div className="basicInfo">
        <div>
          <div className="avatar_img" style={{width:100, height:100}}>
            {
              <Link href={'/profile'}>
                <img
                  src={data.memberProfile.profileImage || ''}
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
          <Link className="link-btn" href={`/member/${'id'}/info`}>
            Info
          </Link>
          <button className="link-btn">Edit</button>
        </div>
      </div>
      <div className="ratingInfo">
        <ul>
          <li>
            <p className="content">
              {data.memberProfile.interestSportsList.map((sport, idx) =>
                idx < 3 ? sport.sportsName+' ' : '',
              )}
              {data.memberProfile.interestSportsList.length>3?`+${data.memberProfile.interestSportsList.length-3}`:''}
            </p>
            <p className="title">관심 운동</p>
          </li>
          <li>
            <p className="content">{data.memberProfile.mannerScore}</p>
            <p className="title">매너 점수</p>
          </li>
          <li>
            <p className="content">{data.sportsSkills[0]?.sportsGrade||'no data'}</p>
            <p className="title">운동별 능력</p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default MpUserInfoSec
