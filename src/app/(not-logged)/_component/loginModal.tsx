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
import { Postfetch, axiosInstance, setHeaderToken } from '@/func/fetchCall'
import { useRecoilState } from 'recoil'
import { loginFun, onLoginSuccess } from '@/func/service'
import axios from 'axios'
import {
  NotificationState,
  UserDetailState,
  UserTokenState,
} from '@/store/user'
import { KAKAO_AUTH_URL } from '../_lib/kakao'
const LoginModal = () => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [user, setUser] = useRecoilState(UserDetailState)
  const [userToken, setUserToken] = useRecoilState(UserTokenState)
  const [notificatioinExist, setNtExist] = useRecoilState(NotificationState)
  const { register, handleSubmit } = useForm()
  let isSuccessed = false
  const onsubmitHandler = async (e: any) => {
    try {
      const res = await loginFun(e.email, e.password)
      if (res?.status !== 200) {
        setMessage('아이디 혹은 비밀번호를 확인해주세요')
        return
      }
      await setHeaderToken(res.data.tokenDto.accessToken)
      onLoginSuccess(res?.data)
      setUser(res.data.memberResponse)
      setUserToken(res.data.tokenDto)
      checkUnreadMsg(res.data.tokenDto.accessToken)
      isSuccessed = true
    } catch (error) {
      console.error(error)
    }
    if (isSuccessed) {
      router.replace('/')
    }
  }
  const checkUnreadMsg = async (TOKEN: any) => {
    try {
      const res = await axios.get(`/usports/notification/unread`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      if (res.status === 200) {
        res.data === true &&
          setNtExist((prev) => {
            return {
              ...prev,
              state: true,
            }
          })
      }
    } catch (error) {
      console.log(error)
    }
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
      <p className="errorMsg">{message}</p>
      <div className="linkWrap">
        <Link href={'/findPassword'}>Find Password</Link>
        <Link href={'/createAccount'}>Create Account</Link>
      </div>
      {/* <hr /> */}
      <div className="socialLogBtn">
        <Link href={KAKAO_AUTH_URL}>
          <button className="kakaoBtn">카카오로 로그인</button>
        </Link>
      </div>
    </div>
  )
}

export default LoginModal
