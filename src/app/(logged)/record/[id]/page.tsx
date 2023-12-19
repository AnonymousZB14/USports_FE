'use client'
import UserInfoSec from '@/components/userInfoSec'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { scrollHandler } from '@/func/scrollEvent'
import { useRouter } from 'next/navigation'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { FaRegCommentAlt, FaHeart } from 'react-icons/fa'
import Comment from '@/components/comment'
import CommentInput from '@/components/commentInput'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import dayjs from 'dayjs'
import { Getfetch } from '@/func/fetchCall'
import { useQuery } from '@tanstack/react-query'
import { RecordDetail } from '@/types/types'
import { getRecordDetail } from './_lib/getRecordDetail'
import Link from 'next/link'
type PageParams = {
  id: string
}
const page = ({ params }: { params: PageParams }) => {
  const { data, isSuccess } = useQuery<RecordDetail, Object>({
    queryKey: ['record', params.id],
    queryFn: getRecordDetail,
  })
  const router = useRouter()
  const pageRef = useRef(null)
  const [showInput, setShowInput] = useState(false)
  useLayoutEffect(() => {
    if (pageRef.current === null) return
    scrollHandler(pageRef.current)
  }, [pageRef])
  useEffect(() => {
    console.log(data)
  }, [data])
  if (!isSuccess) return null
  return (
    <>
      <section ref={pageRef} className="record_detail_sec">
        <div className="page_top">
          <button onClick={() => router.back()} className="hoverScaleAct">
            <IoChevronBackCircleSharp />
          </button>
          <div className="userInfoSec">
            <div style={{ width: '60px', height: '60px' }}>
              <div className="avatar_img">
                <Link href={`profile/${data.accountName}`}>
                  <img src={data.profileImage} alt="profileImage" />
                </Link>
              </div>
            </div>
            <div className="user_info">
              <h3>{data.accountName}</h3>
              <p>@{data.accountName}</p>
            </div>
          </div>
        </div>
        <div className="page_mid">
          <div className="record_img_sec">
            <ul>
              {data!.imageAddressList.map((img: string) => (
                <li>
                  <div>
                    <img src={img} alt="img" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="icon_wrap">
            <FaHeart className="hoverScaleAct" />
            <FaRegCommentAlt
              className="hoverScaleAct"
              onClick={() => {
                setShowInput(!showInput)
              }}
            />
            <span className="dayjs" style={{ marginLeft: 'auto' }}>
              {dayjs(Date.now()).format('MM/DD/YYYY')}
            </span>
          </div>
          <div className="record_contents">
            <span>{data.accountName}</span>
            <p>{data.recordContent}</p>
          </div>
        </div>
        <div className="page_btm">
          <div className="comments">
            {data.commentList.map((comment) => (
              <Comment comment={comment}/>
            ))}
          </div>
        </div>
      </section>
      {showInput && <CommentInput setShowInput={setShowInput} />}
    </>
  )
}

export default page
