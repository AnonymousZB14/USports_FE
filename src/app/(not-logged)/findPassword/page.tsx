'use client'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import React, { FormEventHandler, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
const page = () => {
  const [sendingEmailSuccess, setSendingEmailSuccess] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { register, handleSubmit, getValues } = useForm()

  const onSubmit = async (e: any) => {
    setSendingEmailSuccess(false)
    const emailregExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i
    const email = getValues('email')
    const phoneNumber = getValues('phoneNumber')
    const regPhone = /^\d{3}-\d{3,4}-\d{4}$/
    if (!emailregExp.test(email)) {
      toast.warn('이메일 형식이 잘못되었습니다')
      return
    }
    if (!regPhone.test(phoneNumber)) {
      toast.warning('휴대폰 번호는 000-0000-0000 형식으로 입력해주세요')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`/usports/member/password-lost`, e)
      if (res.status === 200) {
        setSendingEmailSuccess(true)
        toast.success('전송 성공! 이메일 내역을 확인해주세요!')
      }
    } catch (error) {
      toast.error('기입한 정보를 다시 확인해주세요')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="findPwdP notLoggedP centered">
      <h2>Find Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register('name')}
            id="name"
            placeholder="이름을 입력해주세요"
            required
          />
          <input
            type="email"
            {...register('email')}
            id="email"
            placeholder="이메일을 입력해주세요"
            required
          />
          <input
            type="tel"
            {...register('phoneNumber')}
            id="phoneNumber"
            placeholder="휴대폰 번호를 입력해주세요 (ex. 000-0000-0000)"
            required
          />
        </div>
        <input
          type="submit"
          value={
            sendingEmailSuccess
              ? 'Check your Email !'
              : isLoading
                ? 'Sending...'
                : 'Send'
          }
        />
      </form>
      <div className="linkWrap">
        <Link href={'/login'}>Back to Login </Link>
      </div>
    </div>
  )
}

export default page
