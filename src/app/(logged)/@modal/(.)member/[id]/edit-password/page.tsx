'use client'
import Modal from '@/components/modal'
import { UserDetailState } from '@/store/user'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'
const Page = () => {
  const { register, handleSubmit, getValues } = useForm()
  const router = useRouter()
  const [user, _] = useRecoilState(UserDetailState)
  let isItSuccess = false
  const onSubmit = async (e: any) => {
    isItSuccess = false
    if (user.memberId === 0) return
    if (e.newPassword !== e.newPasswordCheck) {
      toast.error('입력하신 새로운 비밀번호 확인 값이 일치하지 않습니다')
      return
    }
    const pwdregex =
      /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
    const newpwd = getValues('newPassword')
    if (!pwdregex.test(newpwd)) {
      toast.error(
        '비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자로 입력해주세요',
      )
      return
    }
    try {
      const res = await axios.put(
        `/usports/member/${user.memberId}/edit-password`,
        e,
      )
      if (res.status === 200) {
        toast.success('비밀번호 수정이 완료되었습니다!')
        isItSuccess = true
      }
    } catch (error) {
      console.log(error)
    }
    if (isItSuccess) router.back()
  }
  return (
    <Modal>
      <div className="editPwd">
        <p>비밀번호 변경하기</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            {...register('currentPassword')}
            placeholder="현재 비밀번호"
            required
          />
          <input
            type="password"
            {...register('newPassword')}
            placeholder="새 비밀번호"
            required
          />
          <input
            type="password"
            {...register('newPasswordCheck')}
            placeholder="새 비밀번호 확인"
            required
          />
          <div>
            <input
              type="button"
              value={'취소'}
              onClick={() => {
                router.back()
              }}
            />
            <input type="submit" value={'수정하기'} />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default Page
