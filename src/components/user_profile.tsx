'use client'
import React from 'react'
import Avatar from './avatar'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
const UserProfile = () => {
  const [user, setUser] = useRecoilState(UserDetailState)
  return (
    <div className="user_profile">
      <Avatar
        width="100px"
        height="100px"
        imgAddress={user.member.profileImage}
      />
    </div>
  )
}

export default UserProfile
