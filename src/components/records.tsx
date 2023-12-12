'use client'
import { getUsersRecords } from '@/test/records'
import { RecordsState } from '@/store/records'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import Skeleton from './skeleton'

const Records = () => {
  const [records, setRecords] = useRecoilState(RecordsState)
  const recordLoadable = useRecoilValueLoadable(RecordsState)
  useEffect(() => {
    getUsersRecords('user').then((resp) => {
      setRecords(resp.records)
    })
  }, [setRecords])

  return (
    <ul>
      {records.map((record) => {
        return (
          <Record
            key={record.recordId}
            imageAddress={record.imageAddress}
            recordId={record.recordId}
          />
        )
      })}
    </ul>
  )
}

export default Records

const Record = ({
  imageAddress,
  recordId,
}: {
  imageAddress: string
  recordId: number
}) => {
  return (
    <li>
      <div className="thumbnail">
        <Link href={`/record/${recordId}`}>
          <img src={imageAddress} alt="thumbnail" />
        </Link>
      </div>
    </li>
  )
}
