'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { scrollHandler } from '@/func/scrollEvent'
import { useRouter } from 'next/navigation'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { FaRegCommentAlt, FaRegHeart, FaHeart } from 'react-icons/fa'
import Comment from '@/components/comment'
import CommentInput from '@/components/commentInput'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import dayjs from 'dayjs'
import { Getfetch, Postfetch, axiosInstance } from '@/func/fetchCall'
import { useQuery } from '@tanstack/react-query'
import { RecordDetail } from '@/types/types'
import { getRecordDetail } from './_lib/getRecordDetail'
import Link from 'next/link'
import SwiperWrap from '@/components/swiper'
import Button from '@/components/commonButton'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
type PageParams = {
  id: string
}
interface CommentType {
  accountName: string
  commentId: number
  content: string
  memberId: number
  name: string
  parentId: number
  profileImage: string
  recordId: number
  registerAt: Date
  updatedAt: Date
}
type CommentListType = CommentType[]
const page = ({ params }: { params: PageParams }) => {
  const { data, isSuccess } = useQuery<RecordDetail, Object>({
    queryKey: ['record', params.id],
    queryFn: getRecordDetail,
  })
  const router = useRouter()
  const pageRef = useRef(null)
  const [likeStatus, setLikeStatus] = useState(false)
  const [user, _] = useRecoilState(UserDetailState)
  const [showInput, setShowInput] = useState(false)
  const [commentList, setCommentList] = useState<CommentListType>([])
  const setCommentListHandler = (
    content: string,
    accountName: string,
    profileImage: string,
  ) => {
    setCommentList([
      ...commentList,
      {
        accountName: accountName,
        commentId: 0,
        content: content,
        memberId: 0,
        name: accountName,
        parentId: 0,
        profileImage: profileImage,
        recordId: 0,
        registerAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  }
  useLayoutEffect(() => {
    if (pageRef.current === null) return
    scrollHandler(pageRef.current)
  }, [pageRef])
  useEffect(() => {
    console.log(data)
    if (data?.currentUserLikes) {
      setLikeStatus(data?.currentUserLikes)
    }
    if (data?.commentList) {
      setCommentList(data?.commentList)
    }
  }, [data])
  const deleteHandler = async () => {
    let isSuccess = false
    try {
      const res = await axiosInstance.delete(`/record/${data?.recordId}`)
      if (res.status === 200) {
        alert('게시글이 삭제되었습니다')
        isSuccess = true
      }
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) router.back()
  }
  const likeHandler = async (value: boolean) => {
    if (data?.accountName === user.accountName) {
      alert('본인 게시글에는 좋아요할 수 없습니다')
      return;
    }
    try {
      const res = await Postfetch(`/record/${params.id}/like`)
      if (res.status === 200) {
        setLikeStatus((prev) => !prev)
      }
    } catch (error) {
      console.log(error)
    }
  }
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
                <Link href={`/profile/${data.accountName}`}>
                  <img
                    src={data.profileImage || '/basicProfile.png'}
                    alt="profileImage"
                  />
                </Link>
              </div>
            </div>
            <div className="user_info">
              <h3>{data.accountName}</h3>
              <p>@{data.name}</p>
            </div>
          </div>
        </div>
        <div className="page_mid">
          <div className="record_img_sec">
            <SwiperWrap CarouselData={data!.imageAddressList} />
          </div>
          <div className="icon_wrap">
            {likeStatus ? (
              <FaHeart
                className="hoverScaleAct"
                onClick={() => {
                  likeHandler(true)
                }}
              />
            ) : (
              <FaRegHeart
                className="hoverScaleAct"
                onClick={() => {
                  likeHandler(true)
                }}
              />
            )}
            <FaRegCommentAlt
              className="hoverScaleAct"
              onClick={() => {
                setShowInput(!showInput)
              }}
            />
            <span className="dayjs" style={{ marginLeft: 'auto' }}>
              {dayjs(data.updatedAt).format('MM/DD/YYYY')}
            </span>
          </div>
          <div className="record_contents">
            <span>{data.accountName}</span>
            <p>{data.recordContent}</p>
          </div>
        </div>
        <div className="page_btm">
          <div className="comments">
            {commentList.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
          {data.memberId === user.memberId && (
            <Button
              tailwindStyles="py-0 px-2 float-right"
              theme="red"
              onClick={deleteHandler}
            >
              게시글 삭제
            </Button>
          )}
        </div>
      </section>
      {showInput && (
        <CommentInput
          id={params.id}
          setShowInput={setShowInput}
          setCommentListHandler={setCommentListHandler}
        />
      )}
    </>
  )
}

export default page
