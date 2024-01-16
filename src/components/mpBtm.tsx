'use client'
import React from 'react'
import MpCategories from './mpCategories'
import EvaluationList from './evaluationList'
import ApplicationStatus from './applicationStatus'
import RecruitManagement from './recruitManagement'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { MypageData } from '@/types/types'
import { getMypageData } from '@/app/(logged)/mypage/_lib/getMypageData'
const MpBtm = () => {
  const route = useRouter()
  const { data, isFetching } = useQuery<MypageData, Object>({
    queryKey: ['mypage'],
    queryFn: getMypageData,
  })
  if (isFetching && !data) return null
  return (
    <>
      <MpCategories activeCate="평가하기" activeSec="mp1" />
      <section id="mp1">
        <EvaluationList
          list={
            data?.recruitAndParticipants ? data?.recruitAndParticipants : []
          }
        />
      </section>
      <MpCategories activeCate="신청현황" activeSec="mp2" />
      <section id="mp2">
        <p className="info">마감된 모집글은 보여지지 않습니다</p>
        <ApplicationStatus
          list={data?.participateList ? data?.participateList : []}
        />
      </section>
      <MpCategories activeCate="모집관리" activeSec="mp3" />
      <section id="mp3">
        <RecruitManagement
          list={data?.myRecruitList ? data?.myRecruitList : []}
        />
      </section>
      <MpCategories activeCate="정보수정" activeSec="mp4" />
      <section id="mp4">
        <div className="editBtnWrap">
          <Link href={`/member/${data?.memberProfile.accountName}`}>
            내 정보 수정
            <FaArrowAltCircleRight />
          </Link>
          <Link
            href={`/member/${data?.memberProfile.accountName}/edit-password`}
          >
            비밀번호 변경 <FaArrowAltCircleRight />
          </Link>
          <Link href={`/member/${data?.memberProfile.accountName}/withdraw`}>
            회원 탈퇴 <FaArrowAltCircleRight />
          </Link>
        </div>
      </section>
    </>
  )
}

export default MpBtm
