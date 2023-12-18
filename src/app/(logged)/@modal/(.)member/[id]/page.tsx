'use client'
import Modal from '@/components/modal'
import { axiosInstance } from '@/func/fetchCall'
import { UserDetailState } from '@/store/user'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

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
  const [user, setUser] = useRecoilState(UserDetailState)
  const { register, handleSubmit } = useForm()
  const onsubmitHandler = async (e: any) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/${user.memberId}`,
        e,
        {
          headers: {
            credentials: 'include',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.tokenDto.accessToken}`,
          },
        },
      )
      if (!(res.status == 200)) return
      const { data } = res
      setUser({
        ...user,
        accountName: data.accountName,
        activeRegion: data.activeRegion,
        birthDate: data.birthDate,
        email: data.email,
        gender: data.gender,
        interestedSports: data.interestedSports,
        name: data.name,
        phoneNumber: data.phoneNumber,
        profileImage: data.profileImage,
        profileOpen: data.profileOpen,
      })
    } catch (error) {
      console.error(error)
    }

    // router.replace('/')
  }
  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <Modal>
      <div className="editUser">
        <p>내 정보 수정</p>
        <form onSubmit={handleSubmit(onsubmitHandler)}>
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
            <label htmlFor="emailAuthNumber">* emailAuthNumber</label>
            <input
              type="text"
              id="emailAuthNumber"
              {...register('emailAuthNumber')}
              required
              // value={userInfo.accountName}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">* 번호</label>
            <input
              type="tel"
              id="phoneNumber"
              {...register('phoneNumber')}
              // required
              value={userInfo.phoneNum}
            />
          </div>
          <div>
            <label htmlFor="activeRegion">* 자주 활동하는 구역</label>
            <input
              type="text"
              id="activeRegion"
              {...register('activeRegion')}
              // required
              // value={userInfo.phoneNum}
            />
          </div>
          <div>
            <label htmlFor="interestedSports">* 관심 운동</label>
            <input
              type="text"
              id="interestedSports"
              {...register('interestedSports')}
              // required
              // value={userInfo.phoneNum}
            />
          </div>
          <div>
            <label htmlFor="accountName">@AccountName</label>
            <input
              type="text"
              id="accountName"
              {...register('accountName')}
              // required
              value={userInfo.accountName}
            />
          </div>
          <div>
            <label htmlFor="name">@이름</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              required
              value={userInfo.name}
            />
          </div>

          {/*           <div>
            <label htmlFor="birth">@생년월일</label>
            <input type="date" id="birth" required value={userInfo.birth} />
          </div> */}
          <div>
            <label htmlFor="gener">성별</label>
            <input
              type="radio"
              id="gener"
              {...register('gender')}
              required
              value={'FEMALE'}
              checked={userInfo.gener === 'female'}
            />
            여성
            <input
              type="radio"
              {...register('gender')}
              id="gener"
              required
              value={'MALE'}
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
              {...register('profileOpen')}
              value={'open'}
              checked={userInfo.accountOpen}
            />
            공개
            <input
              type="radio"
              id="accountOpen"
              {...register('profileOpen')}
              required
              value={'close'}
              checked={!userInfo.accountOpen}
            />
            비공개
          </div>
          {/*           <div>
            <label htmlFor="profileContent">상태 메세지</label>
            <input
              type="text"
              id="profileContent"
              value={userInfo.profileContent}
            />
          </div> */}
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
