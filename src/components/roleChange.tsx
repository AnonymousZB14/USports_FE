'use client'
import { getCookie } from '@/func/cookie_c'
import { UserDetailState } from '@/store/user'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { useRecoilState } from 'recoil'

const RoleChange = () => {
  const [user, setUser] = useRecoilState(UserDetailState)
  const [role, setRole] = useState('')
  useLayoutEffect(() => {
    const cookieRole = getCookie('role')
    if (cookieRole) {
      setRole(cookieRole)
    }
    console.log(role, cookieRole)
  }, [])
  if (role !== 'UNAUTH') return null
  return (
    <div className="rolebg">
      <div className="roleInner">
        <p>
          미인증 유저입니다.
          <br />
          추가 정보를 입력하고 어플을 이용해주시기 바랍니다 🙇🏻‍♀️
        </p>
        <Link href={`/member/${user.memberId}`}>인증하러 가기</Link>
      </div>
    </div>
  )
}

export default RoleChange
