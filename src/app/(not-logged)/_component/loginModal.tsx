'use client'
import Link from 'next/link'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Postfetch } from '@/func/fetchCall'
import { useRecoilState } from 'recoil'
import { loginFun, onLoginSuccess } from '@/func/service'
import axios from 'axios'

const LoginModal = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  
  const { register, handleSubmit } = useForm()
  /*  
  happyhsryu@gmail.com
  a123456789!
  */

  const onsubmitHandler = async (e: any) => {
    const res = await loginFun(e.email, e.password)
    onLoginSuccess(res)
    router.replace('/home')
  }

  return (
    <div className="loginP notLoggedP centered">
      <h2>Log into USports</h2>
      <form onSubmit={handleSubmit(onsubmitHandler)}>
        <div>
          <input
            type="email"
            {...register('email')}
            id="email"
            placeholder="email"
            required
          />
          <input
            {...register('password')}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>

        <input type="submit" value="Log in" />
      </form>

      <div className="linkWrap">
        <Link href={'/findPassword'}>Find Password</Link>
        <Link href={'/createAccount'}>Create Account</Link>
      </div>
      <hr />
      <div className="socialLogBtn">
        <button
          className="kakaoBtn"
          // onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/' })}
        >
          카카오로 로그인
        </button>
      </div>
    </div>
  )
}

export default LoginModal
