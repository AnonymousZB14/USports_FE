'use client'
import KaKaoMap from '@/components/kakaoMap'
import React, { useEffect } from 'react'
import { RiShieldStarLine } from 'react-icons/ri'
import { TbSoccerField } from 'react-icons/tb'
import { IoMaleFemaleSharp } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import Button from '@/components/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const recruitDetail = () => {
  const router = useRouter()

  // const [list, setList] = useState({})
  // useEffect(() => {
  //   try {
  //     Getfetch('http://3.39.34.245:8080/recruits/1').then((resp) =>
  //       console.log(resp),
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])
  const getRecruit = async () => {
    const res = await axiosInstance.get(`/recruits/1`)

    if (res.status === 200) {
      console.log(res)
    }
  }
  useEffect(() => {
    getRecruit()
  }, [])

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
        <Link href={`/recruit/partner`}>
          <Button tailwindStyles="py-0 px-2" theme="red">
            파트너 평가하기
          </Button>
        </Link>

        <Link href={`/recruit/manage`}>
          <Button tailwindStyles="py-0 px-2" theme="orange">
            신청자 관리하기
          </Button>
        </Link>
      </div>
      <div className="content-body">
        <div className="map-wrap">
          <KaKaoMap Lat={37.566826} Lng={126.9786567} />
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
                    <p>모든레벨</p>
                  </li>
                  <li className="data-box category-data">
                    <TbSoccerField size="20" stroke="#f57e25" />
                    <p>축구</p>
                  </li>
                  <li className="data-box gender-data">
                    <IoMaleFemaleSharp size="20" fill="#f57e25" />
                    <p>남자만</p>
                  </li>
                  <li className="data-box place-data">
                    <MdPlace size="20" fill="#f57e25" />
                    <p>서울</p>
                  </li>
                  <li className="data-box personnel-data">
                    <MdOutlinePeopleAlt size="20" fill="#f57e25" />
                    <p>12명</p>
                  </li>
                </ul>
                <div className="average-wrap">
                  <div className="average-title">
                    <span>참여자 평균 레벨 : </span>
                    <span className="average-data">데이터</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="recruit-detail-con">
              <div className="match-title">
                <p>모집 내용</p>
              </div>
              <div className="match-content">
                <p>시청역 풋살파크에서 축구같이합시다!!</p>
              </div>
            </div>
          </div>
          <div className="right-body-wrap">
            <div className="apply-con">
              <div className="apply-main-section">
                <p className="match-person">등록한 사람</p>
                <div className="match-title">
                  <p>용인 풋살 같이 하실분.</p>
                </div>
                <div className="match-time">
                  <span className="match-time-info">일자</span>12월 9일 토요일
                  19:00
                </div>
                <div className="match-place">
                  <span className="match-place-info">장소</span>서울특별시
                  영등포구 선유로 138 풋살파크장
                </div>
                <p className="match-price">50,000원</p>
              </div>
              <div className="apply-register-section">
                <div className="apply-status">모집중</div>
                <Button type="submit" tailwindStyles="py-0 px-2" theme="blue">
                  신청하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
