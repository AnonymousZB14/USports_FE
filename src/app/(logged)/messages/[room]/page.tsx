'use client'
import React, { useEffect, useState } from 'react'
import Content from './_component/content'
import axios from 'axios'

const page = ({ params }: { params: { room: string } }) => {
  const [isItmember, setIsItmember] = useState<boolean>()
  const [isItLoading, setIsItLoading] = useState<boolean>(false)
  const checkUser = async () => {
    try {
      setIsItLoading(true)
      const res = await axios.get(`/usports/chat/${params.room}`)
      if (res.status === 200) {
        setIsItmember(true)
      } else {
        setIsItmember(false)
      }
      setIsItLoading(false)
    } catch (error) {
      console.log(error)
      setIsItLoading(false)
      setIsItmember(false)
    }
  }
  useEffect(() => {
    checkUser()
  }, [])
  useEffect(() => {
    if (isItmember === false) alert('해당 채팅방 접근 권한이 없습니다')
  }, [isItmember, isItLoading])

  return isItmember && <Content />
}

export default page
