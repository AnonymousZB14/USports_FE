'use client'
import Modal from '@/components/modal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use, useState } from 'react'

export const data = {
  username: '홍길동',
  profileImg: '/tomatoA.png',
}
const Page = () => {
  const [userInfo, setUserInfo] = useState(data)
  const router = useRouter()
  return (
    <Modal>
      <div className="my-info-wrap">
        <div className="my-info-header">
          <div className="profile-box">
            <Image
              className="profile-img"
              width={100}
              height={100}
              alt="avatar"
              src={'/basicProfile.png'}
            />
            <p>{userInfo.username}</p>
          </div>
        </div>
        <div className="my-info-body">
          <div className="exercise-wrap">
            <h2>운동 평균 점수</h2>
            <div className="exercise-score">
              <h3>러닝</h3>
              <p>비기너 High</p>
            </div>
          </div>
          <div className="manners-wrap">
            <h2>매너 평균 점수</h2>
            <div className="manner-score">
              <h3>친절 점수</h3>
              <p>10/10</p>
            </div>
            <div className="passion-score">
              <h3>열정 점수</h3>
              <p>5/10</p>
            </div>
            <div className="teamwork-score">
              <h3>팀워크 점수</h3>
              <p>2/10</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Page
