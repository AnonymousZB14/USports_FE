'use client'
import Modal from '@/components/modal'
import { UserDetailState } from '@/store/user'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'
import { onLogoutFun } from '@/func/service'
import LocalStorage from '@/func/localstrage'
import { removeCookie } from '@/func/cookie_c'
import { Cookies } from 'react-cookie'
import Button from '@/components/commonButton'
const Page = () => {
  const { register, handleSubmit, getValues } = useForm()

  const router = useRouter()
  const [user, _] = useRecoilState(UserDetailState)
  const cookies = new Cookies()
  let isItSuccess = false
  const onSubmit = async (e: any) => {
    if (!confirm('정말 탈퇴하시겠습니까?')) return
    isItSuccess = false
    if (user.memberId === 0) return
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
      const res = await axios.post(
        `/usports/member/${user.memberId}/withdraw`,
        e,
      )
      if (res.status === 200) {
        toast.success('탈퇴되었습니다')
        await onLogoutFun(LocalStorage.getItem('accessToken')!)
        removeCookie('accessToken')
        removeCookie('refreshToken')
        removeCookie('role')
        cookies.remove('accessToken')
        cookies.remove('refreshToken')
        cookies.remove('role')
        delete axios.defaults.headers.common.Authorization
        isItSuccess = true
      }
    } catch (error) {
      console.log(error)
      toast.error('비밀번호를 확인해주세요')
    }
    if (isItSuccess) router.replace('/login')
  }
  return (
    <Modal>
      <div className="editPwd">
        <p>본인 확인</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            {...register('password')}
            placeholder="비밀번호 확인"
            required
          />
          <div>
            {/* <input type="button" value={'취소'} onClick={() => {}} /> */}
            <Button theme="gray" onClick={() => router.back()}>
              취소
            </Button>
            <Button type="submit" theme="red">
              탈퇴하기
            </Button>
            {/* <input type="submit" value={'수정하기'} /> */}
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default Page
