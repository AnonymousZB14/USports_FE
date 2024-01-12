'use client'
import React, { useEffect, useState } from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { Postfetch } from '@/func/fetchCall'
import { useRouter } from 'next/navigation'
interface DmData {
  chatRoomId: number
  message: string
}
const DmComponent = ({ memberId }: { memberId: number }) => {
  const route = useRouter()
  const [roomId, setRoomId] = useState<number>(0)
  const getRoomId = () => {
    try {
      const res = Postfetch(`/chat/direct-message`, {
        memberId: memberId,
      }).then((res) => {
        res.status === 200 && setRoomId(res.data.chatRoomId)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    roomId !== 0 && route.push(`/messages/${roomId}`)
  }, [roomId])

  return (
    <div onClick={getRoomId}>
      <AiOutlineMessage />
    </div>
  )
}

export default DmComponent
