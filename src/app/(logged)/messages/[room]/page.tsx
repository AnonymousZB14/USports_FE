'use client'
import React, { useEffect, useState } from 'react'
import Content from './_component/content'
import axios from 'axios'
import { useParams } from 'next/navigation'

const page = () => {
  const [isItmember, setIsItmember] = useState<boolean>()
  const param = useParams()
  const { room } = param
  const [isItLoading, setIsItLoading] = useState<boolean>(false)
  const checkUser = async () => {
    try {
      setIsItLoading(true)
      const res = await axios.get(`/usports/chat/${room}`)
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
