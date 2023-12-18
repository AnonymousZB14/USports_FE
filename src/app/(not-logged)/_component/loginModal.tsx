'use client'
import Link from 'next/link'
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Postfetch, setHeaderToken } from '@/func/fetchCall'
import { useRecoilState } from 'recoil'
import { loginFun, onLoginSuccess } from '@/func/service'
import axios from 'axios'
import { UserDetailState } from '@/store/user'
import LocalStorage from '@/func/localstrage'

const LoginModal = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [user, setUser] = useRecoilState(UserDetailState)
  const { register, handleSubmit } = useForm()
  /*  
  happyhsryu@gmail.com
  a123456789!
  */

  const onsubmitHandler = async (e: any) => {
    try {
      const res = await loginFun(e.email, e.password)
      if (!(res?.status == 200)) return
      onLoginSuccess(res?.data)
      LocalStorage.setAccessToken(res.data.tokenDto.accessToken)
      setHeaderToken(res.data.tokenDto.accessToken)
      setUser({
        ...user,
        accountName: res.data.member.accountName,
        email: res.data.member.email,
        gender: res.data.member.gender,
        role: res.data.member.role,
        password: res.data.member.password,
        memberId: res.data.member.memberId,
        name: res.data.member.name,
        phoneNumber: res.data.member.phoneNumber,
        profileImage: res.data.member.profileImage,
        username: res.data.member.username,
        profileOpen: res.data.member.profileOpen,
        tokenDto: {
          accessToken: res.data.tokenDto.accessToken,
          refreshToken: res.data.tokenDto.refreshToken,
          tokenType: res.data.tokenDto.tokenType,
        },
      })
    } catch (error) {
      console.error(error)
    }

    router.replace('/')
  }
  useEffect(() => {
    console.log(user)
  }, [user])
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
