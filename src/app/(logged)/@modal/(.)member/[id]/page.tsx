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

const Page = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [isLoading, setLoding] = useState(false)
  const [user, setUser] = useRecoilState(UserDetailState)
  const { register, handleSubmit, control } = useForm()

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
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/member/${user.member.memberId}`,
        e,
        {
          headers: {
            credentials: 'include',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.tokenDto.accessToken}`,
          },
        },
      )
      // if (!(res.status == 200)) return
      if (res.status == 400) {
        const { data } = res
        localStorage.setItem('user', data)
      } else {
        return '오류 발생'
      }
      /*       setUser({
        ...user,
        member: {
          ...user.member,
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
        },
      }) */
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
          {/*           {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input
                  type="number"
                  {...register(`interestedSports[${index}]`)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            )
          })}
          <button type="button" onClick={() => append({ number: '' })}>
            Add phone number
          </button> */}
          <div>
            <label htmlFor="interestedSports">관심 운동 종목</label>
            <input
              type="checkbox"
              id="interestedSports"
              {...register('interestedSports')}
              value={1}
              // checked={user.member.gender === 'FEMALE'}
              // checked={user.member.interestedSports.includes('1')}
            />
            축구
            <input
              type="checkbox"
              {...register('interestedSports')}
              id="interestedSports"
              value={2}
              // checked={user.member.interestedSports.includes('2')}
            />
            야구
            <input
              type="checkbox"
              {...register('interestedSports')}
              id="interestedSports"
              value={3}
              // checked={user.member.interestedSports.includes('3')}
            />
            클라이밍
          </div>
          {/*           <div>
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
          </div> */}
          {user.member.role === 'UNAUTH' ? (
            <div>
              <label htmlFor="emailAuthNumber">* 이메일 인증번호</label>
              <input
                type="text"
                id="emailAuthNumber"
                {...register('emailAuthNumber')}

                // value={user.accountName}
              />
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
              id="phoneNumber"
              {...register('phoneNumber')}
              // required
              value={user.member.phoneNumber}
            />
          </div>
          <div>
            <label htmlFor="activeRegion">* 자주 활동하는 구역</label>
            <input
              type="text"
              id="activeRegion"
              {...register('activeRegion')}
              // required
              value={user.member.activeRegion}
            />
          </div>
          {/*           <div>
            <label htmlFor="interestedSports">* 관심 운동</label>
            <input
              type="text"
              id="interestedSports"
              {...register('interestedSports')}
              // required
              value={user.member.interestedSports}
            />
          </div> */}
          <div>
            <label htmlFor="accountName">@AccountName</label>
            <input
              type="text"
              id="accountName"
              {...register('accountName')}
              // required
              value={user.member.accountName}
            />
          </div>
          <div>
            <label htmlFor="name">@이름</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              required
              value={user.member.name}
            />
          </div>
          <div>
            <label htmlFor="birth">@생년월일</label>
            <input
              type="date"
              id="birth"
              required
              {...register('birthDate')}
              value={user.member.birthDate}
            />
          </div>
          <div>
            <label htmlFor="gener">성별</label>
            <input
              type="radio"
              id="gener"
              {...register('gender')}
              required
              value={'FEMALE'}
              checked={user.member.gender === 'FEMALE'}
            />
            여성
            <input
              type="radio"
              {...register('gender')}
              id="gener"
              required
              value={'MALE'}
              checked={user.member.gender === 'MALE'}
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
              checked={user.member.profileOpen}
            />
            공개
            <input
              type="radio"
              id="accountOpen"
              {...register('profileOpen')}
              required
              value={'close'}
              checked={!user.member.profileOpen}
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
        <p>{message}</p>
      </div>
    </Modal>
  )
}

export default Page
