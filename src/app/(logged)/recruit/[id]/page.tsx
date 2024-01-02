'use client'
import KaKaoMap from '@/components/kakaoMap'
import React, { useEffect, useState } from 'react'
import { RiShieldStarLine } from 'react-icons/ri'
import { TbSoccerField } from 'react-icons/tb'
import { IoMaleFemaleSharp } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import Button from '@/components/commonButton'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { Deletefetch, Putfetch, axiosInstance } from '@/func/fetchCall'
import { recruitItemProps } from '@/types/types'
import KaKaoMap2 from '@/components/kakaoMap2'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'

const recruitDetail = () => {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [user, _] = useRecoilState(UserDetailState)
  const [recruitData, setRecruitData] = useState<recruitItemProps | undefined>()
  const [formattedDate, setFormattedDate] = useState<string | undefined>()
  useEffect(() => {
    axiosInstance
      .get(`/recruit/${id}`)
      .then((res) => {
        setRecruitData(res.data)
        console.log(res.data)
        const formattedDate = formatDate(res.data.meetingDate)
        setFormattedDate(formattedDate)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const deleteHandler = async () => {
    let isSuccess = false
    try {
      const res = await axiosInstance.delete(
        `/recruit/${recruitData?.recruitId}`,
      )
      if (res.status === 200) {
        alert('게시글이 삭제되었습니다')
        isSuccess = true
      }
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      router.push('/explore')
    }
  }
  function formatDate(inputDateStr: string) {
    let inputDate = new Date(inputDateStr)

    let options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }

    let formattedDate = inputDate.toLocaleString('ko-KR', options)

    return formattedDate
  }
  const applyHandler = async () => {
    try {
      const res = await axiosInstance.post(`/recruit/${id}/join`)
      if (res.status == 200) alert('신청 완료!')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="recruit-detail-wrap">
      <div className="content-header">
        <button
          className="back-arrow"
          onClick={() => {
            router.back()
          }}
        >
          <i>
            <span className="sr-only">back</span>
          </i>
        </button>
        {recruitData?.memberId === user.memberId && (
          <Link href={`/recruit/manage/${id}`}>
            <Button tailwindStyles="py-0 px-2" theme="orange">
              신청자 관리하기
            </Button>
          </Link>
        )}
      </div>
      <div className="content-body">
        <div className="map-wrap">
          <KaKaoMap recruitData={recruitData} />
          {/* <KaKaoMap2 Lat={37.566826} Lng={126.9786567} /> */}
        </div>
        <div className="main-body-wrap">
          <div className="left-body-wrap">
            <div className="match-point-con">
              <div className="match-title">
                <p>매치 포인트</p>
              </div>
              <div className="match-content">
                <ul className="data-wrap">
                  <li className="data-box level-data">
                    <RiShieldStarLine size="20" fill="#f57e25" />
                    {recruitData && (
                      <p className="grade-item">{recruitData.gradeFrom}</p>
                    )}
                    <span className="from-to-line"></span>
                    {recruitData && <p>{recruitData.gradeTo}</p>}
                  </li>
                  <li className="data-box category-data">
                    <TbSoccerField size="20" stroke="#f57e25" />
                    {recruitData && <p>{recruitData.sportsName}</p>}
                  </li>
                  <li className="data-box gender-data">
                    <IoMaleFemaleSharp size="20" fill="#f57e25" />
                    {recruitData && <p>{recruitData.gender}</p>}
                  </li>
                  <li className="data-box place-data">
                    <MdPlace size="20" fill="#f57e25" />
                    {recruitData && <p>{recruitData.region}</p>}
                  </li>
                  <li className="data-box personnel-data">
                    <MdOutlinePeopleAlt size="20" fill="#f57e25" />
                    {recruitData && <p>{recruitData.recruitCount}명</p>}
                  </li>
                </ul>
                <div className="average-wrap">
                  <div className="average-title">
                    <span>참여자 평균 레벨 : </span>
                    <span className="average-data">
                      {recruitData && (
                        <p>{recruitData.participantSportsSkillAverage}</p>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-body-wrap">
            <div className="apply-con">
              <div className="apply-main-section">
                {recruitData && (
                  <p className="match-person">
                    <Link href={`/profile/${recruitData.memberAccountName}`}>
                      {recruitData.memberAccountName}
                    </Link>
                  </p>
                )}

                <div className="match-title">
                  {recruitData && <p>{recruitData.title}</p>}
                </div>
                <div className="match-time">
                  <div className="match-time-info">일자</div>
                  {recruitData && <p>{formattedDate}</p>}
                </div>
                <div className="match-place">
                  <div className="match-place-info">장소</div>
                  {recruitData && (
                    <p className="info-box">
                      <span className="place-space">
                        {recruitData.streetNameAddr}
                      </span>
                      <br />
                      <span className="place-space">
                        {recruitData.streetNumberAddr}
                      </span>
                      <br />
                      <span className="place-space">
                        {recruitData.placeName}
                      </span>
                    </p>
                  )}
                </div>
                {recruitData && (
                  <p className="match-price">{recruitData.cost}원</p>
                )}
              </div>
              <div className="apply-register-section">
                {recruitData && (
                  <div className="apply-status">
                    {recruitData.recruitStatus}
                  </div>
                )}
                <Button
                  type="submit"
                  tailwindStyles="py-0 px-2"
                  theme="blue"
                  onClick={applyHandler}
                >
                  신청하기
                </Button>
              </div>
            </div>
            <div className="recruit-detail-con">
              <div className="match-title">
                <p>모집 내용</p>
              </div>
              <div className="match-content">
                {recruitData && <p>{recruitData.content}</p>}
              </div>
            </div>
          </div>
        </div>
        {recruitData?.memberId === user.memberId && (
          <Button
            tailwindStyles="py-0 px-2 float-right"
            theme="red"
            onClick={deleteHandler}
          >
            게시글 삭제
          </Button>
        )}
      </div>
    </div>
  )
}

export default recruitDetail
