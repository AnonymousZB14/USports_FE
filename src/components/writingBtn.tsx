'use client'

import { WitingMode } from '@/store/mode'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { LuPencilLine } from 'react-icons/lu'
import { useRecoilState } from 'recoil'
const WritingBtn = () => {
  const onClickHandler = () => {
    setMode(true)
  }
  const [mode, setMode] = useRecoilState(WitingMode)

  const route = useRouter()
  return (
    <>
      <div style={{ cursor: 'pointer' }} onClick={onClickHandler}>
        <LuPencilLine />
      </div>
    </>
  )
}

export default WritingBtn
