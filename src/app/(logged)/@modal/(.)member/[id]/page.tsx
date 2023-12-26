'use client'
import Modal from '@/components/modal'
import { axiosInstance } from '@/func/fetchCall'
import { SportsList } from '@/store/types'
import { UserDetailState, UserTokenState } from '@/store/user'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FormEventHandler, use, useEffect, useState } from 'react'
import {
  Controller,
  FormSubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'
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
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useRecoilState(UserDetailState)
  const [userToken, _] = useRecoilState(UserTokenState)
  const [sportsList, setSportsList] = useRecoilState(SportsList)
  const { register, handleSubmit, control, watch } = useForm()
  const [accountName, setAccountName] = useState(user.accountName)
  const [activeRegion, setactiveRegion] = useState(user.activeRegion)
  const [birthDate, setbirthDate] = useState(user.birthDate)
  const [phoneNumber, setPhoneNum] = useState(user.phoneNumber)
  const [emailAuthNumber, setEmailAuthNumber] = useState('0')
  const [name, setname] = useState(user.name)
  const [profileImage, setprofileImage] = useState(user.profileImage)
  const [images, setImages] = useState<File[]>([])
  const [gender, setgender] = useState(user.gender)
  const [profileOpen, setprofileOpen] = useState(user.profileOpen)
  const [interestedSportsList, setinterestedSports] = useState<Number[]>([])
  const profileSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    try {
      formData.append('profileImage', images[0])
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/member/${user.memberId}/profile-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            credentials: 'include',
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        },
      )
      if (!(res.status === 200)) return
      setUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
      setLoading(false)
      alert('프로필 변경 완료!')
      router.back()
    } catch (error) {
      setLoading(false)
    }
  }
  const resendEmail = async (e: React.MouseEvent) => {
    e.preventDefault()

    setLoading(false)
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/${user.memberId}/resend-email-auth`,
        {
          headers: {
            credentials: 'include',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        },
      )
      setLoading(false)
    } catch (error) {}
  }
  const handleDeleteImage = (id: number) => {
    setprofileImage('')
    setImages([])
  }
  const onsubmitHandler = async (e: any) => {
    setLoading(true)
    setMessage('')
    console.log(e)

    let formBody =
      user.role === 'UNAUTH'
        ? {
            accountName,
            activeRegion,
            birthDate,
            phoneNumber,
            emailAuthNumber,
            name,
            gender,
            profileOpen: JSON.stringify(profileOpen),
            interestedSportsList,
          }
        : {
            accountName,
            activeRegion,
            birthDate,
            phoneNumber,
            name,
            gender,
            profileOpen: JSON.stringify(profileOpen),
            interestedSportsList,
          }
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/${user.memberId}`,
        formBody,
        {
          headers: {
            credentials: 'include',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        },
      )
      if (res.status == 200) {
        const { data } = res
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        router.back()
      } else {
        return '오류 발생'
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }
  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <Modal>
      <div className="editUser">
        <p>내 정보 수정</p>
        <form onSubmit={profileSubmitHandler}>
          <div className="profileForm">
            <input
              type="file"
              id="profileImg"
              accept="image/*,svg/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return
                setImages([e.target.files[0]])
                const file = e?.target?.files[0]
                const imgUrl = URL.createObjectURL(file)
                setprofileImage(imgUrl)
              }}
              className="text-xl file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-6 file:py-4 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400"
            />

            <input type="submit" value={'프로필 변경'} />
          </div>
        </form>

        <form onSubmit={handleSubmit(onsubmitHandler)}>
          {user.role === 'UNAUTH' ? (
            <div>
              <label htmlFor="emailAuthNumber">* 이메일 인증번호</label>
              <input
                type="text"
                id="emailAuthNumber"
                value={emailAuthNumber}
                onChange={(e) => setEmailAuthNumber(e.target.value)}
              />
              <button
                className="resend"
                disabled={isLoading}
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
            <label htmlFor="accountName">계정명</label>
            <input
              type="text"
              id="accountName"
              required
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="birth">생년월일</label>
            <input
              type="date"
              id="birth"
              required
              value={birthDate}
              onChange={(e) => setbirthDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="interestedSports">관심 운동 종목</label>
            <div className="sportOptionContainer">
              {sportsList.map((sport, idx) => (
                <div className="sportOptionWrap" style={{ display: 'flex' }}>
                  <label htmlFor={sport.sportsName}>{sport.sportsName}</label>
                  <input
                    key={idx}
                    type="checkbox"
                    id={sport.sportsName}
                    value={sport.sportsId}
                    onChange={(e) => {
                      if (e.target.checked)
                        setinterestedSports((prev) => {
                          return [...prev, sport.sportsId]
                        })
                    }}
                  />
                </div>
              ))}
            </div>
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
