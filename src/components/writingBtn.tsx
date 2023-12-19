'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { LuPencilLine } from 'react-icons/lu'
const WritingBtn = () => {
  const route = useRouter()
  return (
    <div style={{ cursor: 'pointer' }} onClick={() => route.replace('/record')}>
      <LuPencilLine />
    </div>
  )
}

export default WritingBtn
