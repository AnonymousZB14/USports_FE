'use client'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import BackBtn from './backBtn'
const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return (
    <div id="modal">
      <div className="modalInner">
        <BackBtn />
        {children}
      </div>
    </div>
  )
}

export default Modal
