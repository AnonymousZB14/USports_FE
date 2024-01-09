'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { getChatRoomId } from '../_lib/getChatRoomId'

const DmComponent = ({memberId} : {memberId : number}) => {
  const { data: chatRoomId } = useQuery<any, Object>({
    queryKey: ['chatRoom', memberId],
    queryFn: getChatRoomId,
  })
  return (
    <Link href={'/home'}>
      <AiOutlineMessage />
    </Link>
  )
}

export default DmComponent
