'use client'
import Link from 'next/link'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Postfetch } from '@/func/fetchCall'
import { setCookieToken } from '@/func/cookie'
import { cookies } from 'next/headers'
import { useRecoilState } from 'recoil'
// import { LoginState } from '@/store/user'
const LoginModal = () => {
  const router = useRouter()
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState)
  const [message, setMessage] = useState('')
  const { register, handleSubmit } = useForm()
  /*  
  happyhsryu@gmail.com
  a123456789!
  */

  const onsubmitHandler = (e: any) => {
    let amIMove = false
    /*     const { tokenDto } = await Postfetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/member/login`,
      e,
    ) */
    const callbackUrl = `${process.env.NEXT_PUBLIC_LOCAL}/home`
    console.log(e)
    signIn('credentials', {
      email: e.email,
      password: e.password,
      redirect: true,
      callbackUrl,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
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
          onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/' })}
        >
          카카오로 로그인
        </button>
      </div>
    </div>
  )
}

export default LoginModal
