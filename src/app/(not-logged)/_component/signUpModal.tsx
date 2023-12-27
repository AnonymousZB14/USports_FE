'use client'
import { Postfetch } from '@/func/fetchCall'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
const SignUpModal = () => {
  const { register, handleSubmit } = useForm()
  const route = useRouter()
  let isSuccess = false
  const onsubmitHandler = (e: any) => {
    console.log(e)
    try {
      const res = axios.post(`/member/register`, e).then((res) => {
        if (res.status === 200) {
          alert('회원가입 성공!')
          isSuccess = true
          route.push('/login')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="createAccountP notLoggedP centered">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onsubmitHandler)}>
        <div>
          <div>
            <p>닉네임</p>
            <input
              type="text"
              // name="accountName"
              id="accountName"
              {...register('accountName')}
              placeholder="계정명 ex)userId"
              onChange={() => {
                console.log('x')
              }}
            />

            <input
              type="text"
              {...register('name')}
              name="name"
              id="name"
              placeholder="이름 ex)Nick"
            />
          </div>
          <div>
            <p>이메일</p>
            <input
              {...register('email')}
              type="email"
              name="email"
              id="email"
              placeholder="이메일"
              required
            />
          </div>
          {/*           <div className="verificationNum">
            <input
              type="number"
              placeholder="인증번호 입력"
              maxLength={5}
              minLength={5}
            />
            <button>인증하기</button>
          </div> */}
          <div>
            <p>비밀번호</p>
            <input
              {...register('password')}
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호"
              required
            />
          </div>
          {/*           <input
            type="password"
            name="verifypassword"
            id="verifypassword"
            placeholder="비밀번호 확인"
          /> */}
          {/*          <input
            id="image"
            name="image"
            // required
            type="file"
            accept="image/*"
          /> */}
          <div>
            <p>성별</p>
            <input
              type="radio"
              {...register('gender')}
              name="gender"
              id="female"
              value={'FEMALE'}
            />
            여
            <input
              type="radio"
              {...register('gender')}
              name="gender"
              id="male"
              value={'MALE'}
            />
            남
          </div>
          <div>
            <p>프로필 공개</p>
            <input
              type="radio"
              // name="profileOpen"
              {...register('profileOpen')}
              id="accountOpen"
              value={'open'}
            />
            공개
            <input
              type="radio"
              // name="profileOpen"
              {...register('profileOpen')}
              id="accountClosed"
              value={'close'}
            />
            비공개
          </div>
        </div>
        <input type="submit" value="Create Account" />

        {/* <div>{state?.message}</div> */}
      </form>
    </div>
  )
}

export default SignUpModal
