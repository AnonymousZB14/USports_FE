'use client'
import Modal from '@/components/modal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use, useState } from 'react'

export const data = {
  accountName: 'userId',
  name: 'NaraLee',
  phoneNum: '01028335328',
  birth: '1997-12-23',
  gener: 'female',
  accountOpen: true,
  profileContent: '배고파',
  profileImg: '/tomatoA.png',
  addrCity: '구리시',
  interestSports: ['클라이밍', '러닝'],
}
const Page = () => {
  const [userInfo, setUserInfo] = useState(data)
  const router = useRouter()
  return (
    <Modal>
      <div className="editUser">
        <p>내 정보 수정</p>
        <form action="">
          <div>
            <label>프로필사진</label>
            <label htmlFor="profileImg">
              <Image
                width={100}
                height={100}
                alt="avatar"
                src={'/tomatoA.svg'}
              />
            </label>
            <input type="file" id="profileImg" accept="image/*,svg/*" />
          </div>
          <div>
            <label htmlFor="accountName">닉네임</label>
            <input
              type="text"
              id="accountName"
              required
              value={userInfo.accountName}
            />
          </div>
          <div>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" required value={userInfo.name} />
          </div>
          <div>
            <label htmlFor="phoneNum">번호</label>
            <input
              type="tel"
              id="phoneNum"
              required
              value={userInfo.phoneNum}
            />
          </div>
          <div>
            <label htmlFor="birth">생년월일</label>
            <input type="date" id="birth" required value={userInfo.birth} />
          </div>
          <div>
            <label htmlFor="gener">성별</label>
            <input
              type="radio"
              id="gener"
              required
              value="female"
              checked={userInfo.gener === 'female'}
            />
            여성
            <input
              type="radio"
              id="gener"
              required
              value="male"
              checked={userInfo.gener === 'male'}
            />
            남성
          </div>
          <div>
            <label htmlFor="accountOpen">공개 여부</label>
            <input
              type="radio"
              id="accountOpen"
              required
              value="true"
              checked={userInfo.accountOpen}
            />
            공개
            <input
              type="radio"
              id="accountOpen"
              required
              value="false"
              checked={!userInfo.accountOpen}
            />
            비공개
          </div>
          <div>
            <label htmlFor="profileContent">상태 메세지</label>
            <input
              type="text"
              id="profileContent"
              value={userInfo.profileContent}
            />
          </div>
          <div>
            <input
              type="button"
              value="취소"
              onClick={() => {
                router.back()
              }}
            />
            <input type="submit" value="제출하기" />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default Page
