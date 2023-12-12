'use client'
import React from 'react'
import Modal from '@/components/modal'
import { useRouter } from 'next/navigation'

export const data = {
  accountName: 'userId',
  name: 'NaraLee',
}
const Page = () => {
  const router = useRouter()
  return (
    <Modal>
      <div>
        <p>모집 인원 관리</p>
      </div>
    </Modal>
  )
}

export default Page
