'use client'
import Link from 'next/link'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'


const LoginModal = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  /*   const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const callbackUrl = `${process.env.NEXT_PUBLIC_LOCAL}/`
      console.log(callbackUrl)
      const response = await signIn('credentials', {
        username: id,
        password,
        redirect: false,
        callbackUrl,
      })
      console.log(response) // 토큰 확인
    } catch (err) {
      console.error(err)
      setMessage('에러발생')
    }
  } */
  const handleKakao = async () => {
    const result = await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    })
  }
  const handleNaver = async () => {
    const result = await signIn('naver', {
      redirect: true,
      callbackUrl: '/',
    })
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const callbackUrl = `${process.env.NEXT_PUBLIC_LOCAL}/`
    console.log(callbackUrl)
    signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl,
    })
      .then((response) => {
        console.log(`response:${response}`)
      })
      .catch((error) => {
        console.log(`error:${error}`)
      })
  }

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div className="loginP notLoggedP centered">
      <h2>Log into USports</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            required
            value={email}
            onChange={onChangeId}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        
        <input type="submit" value="Log in" disabled={!email && !password} />
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
        <button
          className="naverBtn"
          onClick={() => signIn('naver', { redirect: true, callbackUrl: '/' })}
        >
          {/*           <Image
            src={'/naver_login.png'}
            alt="kakao"
            width={200}
            height={100}
          /> */}
          네이버로 로그인
        </button>
      </div>
    </div>
  )
}

export default LoginModal
