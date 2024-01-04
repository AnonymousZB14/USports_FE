"use client"
import Button from '@/components/commonButton';
import { useRouter } from 'next/navigation';
import React from 'react';

const FollowManageBtn = () => {
  const route = useRouter()
  return (
    <div className='followManageBtn'>
    <Button onClick={()=>{route.push('/notifications/followManage')}}>팔로우 요청 확인</Button>
  </div>
  );
};

export default FollowManageBtn;