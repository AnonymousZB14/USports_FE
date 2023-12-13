'use client'
import React from 'react'
import Modal from '@/components/modal'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import ApplyStatus from '@/components/applyStatus'

export const data = {
  accountName: 'userId',
  name: 'NaraLee',
}
const Page = () => {
  const router = useRouter()
  return (
    <Modal>
      <div className="modal-header">
        <h3>모집 인원 관리</h3>
      </div>
      <div className="modal-body">
        <div className="accept-info-wrap">
          <div className="accept-info">
            <p>현재 수락된 인원 수 :</p> <span>5 / 10 명</span>
          </div>
          <Button
            type="button"
            theme="blue"
            tailwindStyles="py-0 px-2 float-right"
            onClick={() => {}}
          >
            마감하기
          </Button>
        </div>
        <div className="apply-wrap">
          <label>지원자 현황</label>
          <ApplyStatus />
        </div>

        <div className="accept-wrap">
          <label>수락한 지원자 현황</label>
          <ApplyStatus />
        </div>
      </div>
    </Modal>
  )
}

export default Page
