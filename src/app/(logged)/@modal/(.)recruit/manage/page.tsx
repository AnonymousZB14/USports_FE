'use client'
import React from 'react'
import Modal from '@/components/modal'
import { useRouter } from 'next/navigation'
import Button from '@/components/commonButton'
import ApplyStatus from '@/components/applyStatus'
import { useQuery } from '@tanstack/react-query'

export const data = {
  accountName: 'userId',
  name: 'NaraLee',
}
export interface Data {
  currentElements: number
  currentPage: number
  list: {
    confirmedAt: Date
    evaluationAt: Date
    meetingDate: Date
    memberId: number
    participantId: number
    recruitId: number
    registeredAt: Date
    sportsSkill: string
    status: string
  }[]

  pageSize: number
  totalElement: number
  totalPages: number
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
