'use client'
import React from 'react'
import MpCategories from './mpCategories'
import EvaluationList from './evaluationList'
import ApplicationStatus from './applicationStatus'
import RecruitManagement from './recruitManagement'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowAltCircleRight } from 'react-icons/fa'
const MpBtm = () => {
  const route = useRouter()
  return (
    <>
      <MpCategories activeCate="평가하기" activeSec="mp1" />
      <section id="mp1">
        <EvaluationList />
      </section>
      <MpCategories activeCate="신청현황" activeSec="mp2" />
      <section id="mp2">
        <p className="info">마감된 모집글은 보여지지 않습니다</p>
        <ApplicationStatus />
      </section>
      <MpCategories activeCate="모집관리" activeSec="mp3" />
      <section id="mp3">
        <RecruitManagement />
      </section>
      <MpCategories activeCate="정보수정" activeSec="mp4" />
      <section id="mp4">
        <div className="editBtnWrap">
          <Link href={`/member/${'nara'}`}>
            내 정보 수정하기
            <FaArrowAltCircleRight />
          </Link>
          <Link href={`/member/${'nara'}/edit-password`}>
            비밀번호 변경하기 <FaArrowAltCircleRight />
          </Link>
        </div>
      </section>
    </>
  )
}

export default MpBtm
