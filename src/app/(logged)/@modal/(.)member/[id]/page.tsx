'use client'
import Modal from '@/components/modal'
import { axiosInstance } from '@/func/fetchCall'
import { UserDetailState } from '@/store/user'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
export const interestedSportsList = [
  { value: 1, name: '축구' },
  { value: 2, name: '야구' },
  { value: 3, name: '농구' },
  { value: 4, name: '클라이밍' },
  { value: 5, name: '배구' },
  { value: 6, name: '필라테스' },
]

const Page = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [isLoading, setLoding] = useState(false)
  const [user, setUser] = useRecoilState(UserDetailState)

  const { register, handleSubmit, control, watch } = useForm()

  const [accountName, setAccountName] = useState(user.member.accountName)
  const [activeRegion, setactiveRegion] = useState(user.member.activeRegion)
  const [birthDate, setbirthDate] = useState(user.member.birthDate)
  const [phoneNumber, setPhoneNum] = useState(user.member.phoneNumber)
  const [name, setname] = useState(user.member.name)
  const [profileImage, setprofileImage] = useState(user.member.profileImage)
  const [gender, setgender] = useState(user.member.gender)
  const [profileOpen, setprofileOpen] = useState(user.member.profileOpen)
  const [interestedSports, setinterestedSports] = useState<Number[]>([])

  const resendEmail = async () => {
    setLoding(false)
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/${user.member.memberId}/resend-email-auth`,
        {
          headers: {
            credentials: 'include',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.tokenDto.accessToken}`,
          },
        },
      )
      setLoding(false)
    } catch (error) {}
  }
  const onsubmitHandler = async (e: any) => {
    setLoding(true)
    setMessage('')
    console.log(e)
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/${user.member.memberId}`,
        {
          accountName,
          activeRegion,
          birthDate,
          phoneNumber,
          name,
          profileImage:
            'https://usportsbucket-kmj.s3.ap-northeast-2.amazonaws.com/5bce8834-659d-452e-8f69-6a0b9ccdc346KakaoTalk_Photo_2023-07-05-18-01-52.png',
          gender,
          profileOpen: JSON.stringify(profileImage),
          interestedSports,
        },
        {
          headers: {
            credentials: 'include',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.tokenDto.accessToken}`,
          },
        },
      )
      // if (!(res.status == 200)) return
      if (res.status == 200) {
        const { data } = res
        localStorage.setItem('user', data)
        router.back()
      } else {
        return '오류 발생'
      }
    } catch (e) {
      console.error(e)
    }
    setLoding(false)

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
            <label htmlFor="interestedSports">관심 운동 종목</label>
            {interestedSportsList.map((sport, idx) => (
              <>
                <label htmlFor={sport.name}>{sport.name}</label>
                <input
                  key={idx}
                  type="checkbox"
                  id={sport.name}
                  value={sport.value}
                  onChange={(e) => {
                    if (e.target.checked)
                      setinterestedSports((prev) => {
                        return [...prev, sport.value]
                      })
                  }}
                />
              </>
            ))}
          </div>
          <div>
            <label htmlFor="profileImg">프로필사진</label>

            <input
              type="file"
              id="profileImg"
              accept="image/*,svg/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return
                const file = e?.target?.files[0]
                const imgUrl = URL.createObjectURL(file)
                setprofileImage(imgUrl)
              }}
              className="text-xl file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-6 file:py-4 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400"
            />
          </div>
          {user.member.role === 'UNAUTH' ? (
            <div>
              <label htmlFor="emailAuthNumber">* 이메일 인증번호</label>
              <input type="text" id="emailAuthNumber" />
              <button
                className="resend"
                disabled={!setLoding}
                onClick={resendEmail}
              >
                이메일 다시 발송하기
              </button>
            </div>
          ) : (
            <></>
          )}
          <div></div>
          <div>
            <label htmlFor="phoneNumber">* 번호</label>
            <input
              type="tel"
              onChange={(e) => setPhoneNum(e.target.value)}
              id="phoneNumber"
              value={phoneNumber}
            />
          </div>
          <div>
            <label htmlFor="activeRegion">* 자주 활동하는 구역</label>
            <input
              type="text"
              id="activeRegion"
              value={activeRegion}
              onChange={(e) => setactiveRegion(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="accountName">@AccountName</label>
            <input
              type="text"
              id="accountName"
              required
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name">@이름</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="birth">@생년월일</label>
            <input
              type="date"
              id="birth"
              required
              value={birthDate}
              onChange={(e) => setbirthDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gener">성별</label>
            <input
              type="radio"
              id="gener"
              required
              value={'FEMALE'}
              onChange={(e) => {
                if (e.target.checked) setgender('FEMALE')
              }}
            />
            여성
            <input
              type="radio"
              id="gener"
              required
              value={'MALE'}
              onChange={(e) => {
                if (e.target.checked) setgender('MALE')
              }}
            />
            남성
          </div>
          <div>
            <label htmlFor="accountOpen">공개 여부</label>
            <input
              type="radio"
              id="accountOpen"
              required
              value={'true'}
              onChange={(e) => {
                if (e.target.checked) setprofileOpen(true)
              }}
            />
            공개
            <input
              type="radio"
              id="accountOpen"
              required
              value={'false'}
              onChange={(e) => {
                if (e.target.checked) setprofileOpen(false)
              }}
            />
            비공개
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
        <p>{message}</p>
      </div>
    </Modal>
  )
}

export default Page
