'use client'
import React, { useState } from 'react'
import onSubmit from '../_lib/signup'
import { useFormState, useFormStatus } from 'react-dom'
const page = () => {
  const [sendingEmail, setSendingEmail] = useState(false)
  const [state, formAction] = useFormState(onSubmit, { message: null })
  const { pending } = useFormStatus()
  console.log('state', state)
  return (
    <div className="createAccountP notLoggedP centered">
      <h2>Create Account</h2>
      <form action={formAction}>
        <div>
          <div>
            <input type="text" name="id" id="id" placeholder="id 입력" />
            <p>닉네임</p>
            <input type="text" name="name" id="name" placeholder="이름 입력" />
          </div>
          <div>
{/*             <input
              type="email"
              name="email"
              id="email"
              placeholder="이메일"
              required
            /> */}
            <button>이메일 인증</button>
          </div>
          <div className="verificationNum">
{/*             <input
              type="number"
              placeholder="인증번호 입력"
              maxLength={5}
              minLength={5}
            /> */}
            <button>인증하기</button>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호"
            required
          />
{/*           <input
            type="password"
            name="verifypassword"
            id="verifypassword"
            placeholder="비밀번호 확인"
          /> */}
          <input
            id="image"
            name="image"
            // required
            type="file"
            accept="image/*"
          />
{/*           <div>
            <p>성별</p>
            <input type="radio" name="gender" id="female" value={'female'} />여
            <input type="radio" name="gender" id="male" value={'male'} />남
          </div>
          <div>
            <p>프로필 공개</p>
            <input
              type="radio"
              name="accountOpen"
              id="accountOpen"
              value={'true'}
            />
            공개
            <input
              type="radio"
              name="accountOpen"
              id="accountClosed"
              value={'false'}
            />
            비공개
          </div> */}
        </div>
        <button type="submit" value="Create Account" disabled={pending}>
          가입하기
        </button>
      </form>
    </div>
  )
}

export default page
