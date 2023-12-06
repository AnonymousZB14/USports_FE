'use client'
import React from 'react'
import MpCategories from './mpCategories'
import EvaluationList from './evaluationList'
import ApplicationStatus from './applicationStatus'
import RecruitManagement from './recruitManagement'
const MpBtm = () => {
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
      <section id="mp4">sec4</section>
    </>
  )
}

export default MpBtm
