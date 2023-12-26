'use client'
import React, { useEffect, useState } from 'react'
import Modal from '@/components/modal'
import { useParams, useRouter } from 'next/navigation'
import Button from '@/components/commonButton'
import ApplyStatus from '@/components/applyStatus'
import { useQuery } from '@tanstack/react-query'
import { getApplicants } from './_lib/getApplicants'
import { RecruitApplicants, IngList, AcceptedList } from '@/types/types'

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const { recruitId } = params
  const { data, isFetching } = useQuery<RecruitApplicants, Object>({
    queryKey: ['applicants', recruitId],
    queryFn: getApplicants,
  })
  const [ingList, setIngList] = useState<IngList[]>([])
  const [acceptedList, setAcceptedList] = useState<IngList[]>([])
  useEffect(() => {
    if (!data) return
    setIngList(data?.ingList)
    setAcceptedList(data?.acceptedList)
  }, [data])
  const setListHandler = (accept: boolean, item: IngList) => {
    if (accept === true) {
      setIngList(ingList.filter((origin) => origin.memberId !== item.memberId))
      setAcceptedList([...acceptedList, item])
    } else {
      setIngList(ingList.filter((origin) => origin.memberId !== item.memberId))
    }
  }
  return (
    <Modal>
      <div className="modal-header">
        <h3>모집 인원 관리 {recruitId}</h3>
      </div>
      <div className="modal-body">
        <div className="accept-info-wrap">
          <div className="accept-info">
            <p>현재 수락된 인원 수 :</p>{' '}
            <span>
              {data?.currentCount} / {data?.totalCount} 명
            </span>
          </div>
          <Button
            type="button"
            theme="blue"
            tailwindStyles="py-0 px-2 float-right"
            onClick={() => {}}
            disabled={data?.totalCount === data?.acceptedList}
          >
            마감하기
          </Button>
        </div>
        <div className="apply-wrap">
          <label>지원자 현황</label>
          {data && (
            <ApplyStatus
              list={ingList}
              accepted={false}
              recruitId={+recruitId}
              setListHandler={setListHandler}
            />
          )}
        </div>

        <div className="accept-wrap">
          <label>수락한 지원자 현황</label>
          {data && (
            <ApplyStatus
              list={acceptedList}
              accepted={true}
              recruitId={+recruitId}
              setListHandler={setListHandler}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Page
