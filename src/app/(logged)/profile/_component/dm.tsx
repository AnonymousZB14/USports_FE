'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { getChatRoomId } from '../_lib/getChatRoomId'
interface DmData {
  chatRoomId: number
  message: string
}
const DmComponent = ({ memberId }: { memberId: number }) => {
  const [roomId, setRoomId] = useState<number>(0)
  const { data } = useQuery<DmData, Object>({
    queryKey: ['chatRoom', memberId],
    queryFn: getChatRoomId,
  })
  useEffect(() => {
    data && data.chatRoomId && setRoomId(data.chatRoomId)
  }, [data])
  return (
    <Link href={`/messages/${roomId}`}>
      <AiOutlineMessage />
    </Link>
  )
}

export default DmComponent
