'use client'
import Button from '@/components/commonButton'
import Modal from '@/components/modal'
import { axiosInstance } from '@/func/fetchCall'
import { SportsList } from '@/store/types'
import { UserDetailState, UserTokenState } from '@/store/user'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, {
  FormEventHandler,
  MouseEventHandler,
  use,
  useEffect,
  useState,
} from 'react'
import {
  Controller,
  FormSubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'
import { useRecoilState } from 'recoil'

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
  const [emailAuthNumber, setEmailAuthNumber] = useState('')
  const [name, setname] = useState(user.name)
  const [profileImage, setprofileImage] = useState(user.profileImage)
  const [images, setImages] = useState<File[] | null>([])
  const [gender, setgender] = useState(user.gender)
  const [profileOpen, setprofileOpen] = useState<string | boolean>(
    user.profileOpen,
  )
  const [interestedSportsList, setinterestedSports] = useState<Number[]>([])
  const profileSubmitHandler: MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault()
    if (images == null || images.length < 1) {
      alert('이미지를 업로드해주세요')
      return
    }
    setLoading(true)
    const formData = new FormData()

    try {
      formData.append('profileImage', images[0])
      const res = await axios.put(
        `/usports/member/${user.memberId}/profile-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            credentials: 'include',
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        },
      )
      if (!(res.status === 200)) {
        setMessage(res.data.errorMessage)
        console.log(res.statusText)
        return
      }
      setUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
      setLoading(false)
      alert('프로필 변경 완료!')
    } catch (error) {
      setLoading(false)
    }
  }
  const deleteProfilePhoto: MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.preventDefault()
    setImages(null)
    setLoading(true)

    let isSuccess = false
    try {
      const res = await axios.put(
        `/usports/member/${user.memberId}/profile-image/remove`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            credentials: 'include',
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        },
      )
      if (!(res.status === 200)) {
        setMessage(res.data.errorMessage)
        console.log(res.statusText)
        return
      }
      setUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
      setLoading(false)
      alert('프로필 변경 완료!')
      isSuccess = true
    } catch (error) {
      setLoading(false)
    }
    if (isSuccess) {
      router.back()
    }
  }
  useEffect(() => {
    if (message !== '') alert(message)
    setinterestedSports([...user.interestedSportsList])
  }, [])
  const resendEmail = async (e: React.MouseEvent) => {
    e.preventDefault()

    setLoading(false)
    try {
      const res = await axios.get(
        `/usports/member/${user.memberId}/resend-email-auth`,
        {
          headers: {
            credentials: 'include',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        },
      )
      if (res.status === 200) {
        alert('이메일 발송 완료! 메일함을 확인해주세요')
      }
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
    let isSuccess = false
    // console.log(e)
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
            profileOpen,
            interestedSportsList,
          }
        : {
            accountName,
            activeRegion,
            birthDate,
            phoneNumber,
            name,
            gender,
            profileOpen,
            interestedSportsList,
          }
    try {
      const res = await axios.put(
        `/usports/member/${user.memberId}`,
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
        setLoading(false)
        alert('변경 완료!')
        isSuccess = true
      }
    } catch (e) {
      setLoading(false)
      console.error(e)
    }
    if (isSuccess) router.back()
  }
  useEffect(() => {
    // console.log(user)
  }, [user])
  return (
    <Modal>
      <div className="editUser">
        <p>내 정보 수정</p>
        <form>
          <div className="profileForm">
            <label>
              <img
                src={
                  user.profileImage ? user.profileImage : '/basicProfile.png'
                }
              />
            </label>
            <div>
              <input
                type="file"
                id="profileImg"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.files) return
                  setImages([e.target.files[0]])
                  const file = e?.target?.files[0]
                  const imgUrl = URL.createObjectURL(file)
                  setprofileImage(imgUrl)
                }}
                className="text-xl file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-6 file:py-4 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400"
              />

              <Button onClick={profileSubmitHandler} theme="black">
                저장
              </Button>
              <Button onClick={deleteProfilePhoto} theme="gray">
                삭제
              </Button>
            </div>
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
            <label htmlFor="phoneNumber">번호</label>
            <input
              type="tel"
              onChange={(e) => setPhoneNum(e.target.value)}
              id="phoneNumber"
              placeholder="000-000-0000"
              value={phoneNumber}
            />
          </div>

          <div>
            <label htmlFor="activeRegion">자주 활동하는 지역</label>
            <input
              type="text"
              id="activeRegion"
              value={activeRegion}
              placeholder="거주 혹은 주 활동 지역을 써주세요 ex)경기, 서울, 인천, 강원 등"
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
              placeholder="되도록 실명을 입력해주세요"
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
                  <input
                    key={idx}
                    type="checkbox"
                    id={sport.sportsName}
                    value={sport.sportsId}
                    className="checkbox checkbox-warning"
                    checked={true}
                    onChange={(e) => {
                      if (e.target.checked)
                        setinterestedSports((prev) => {
                          return [...prev, sport.sportsId]
                        })
                    }}
                  />
                  <label htmlFor={sport.sportsName}>{sport.sportsName}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="gener">성별</label>
            <input
              type="radio"
              id="gener"
              name="gener"
              className="radio"
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
              name="gener"
              required
              className="radio"
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
              name="accountOpen"
              className="radio"
              value={'open'}
              onChange={(e) => {
                if (e.target.checked) setprofileOpen('open')
              }}
            />
            공개
            <input
              type="radio"
              id="accountOpen"
              name="accountOpen"
              className="radio"
              value={'close'}
              onChange={(e) => {
                if (e.target.checked) setprofileOpen('close')
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
      </div>
    </Modal>
  )
}

export default Page
