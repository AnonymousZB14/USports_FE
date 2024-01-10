'use client'
import { Getfetch } from '@/func/fetchCall'
import React, { useEffect } from 'react'

const SseComponent = () => {
  const subscribe = async () => {
    try {
      const res = await Getfetch(`/usports/subscribe`)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    subscribe()
  }, [])
  return null
}

export default SseComponent
