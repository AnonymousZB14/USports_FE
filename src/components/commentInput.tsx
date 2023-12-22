'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Avatar from './avatar'
import { IoSend, IoClose } from 'react-icons/io5'
import { useRecoilState } from 'recoil'
import { UserDetailState } from '@/store/user'
import { Postfetch } from '@/func/fetchCall'
import { useRouter } from 'next/navigation'
const CommentInput = ({
  setShowInput,
  id,
}: {
  setShowInput: Dispatch<SetStateAction<boolean>>
  id: string
}) => {
  const [user, _] = useRecoilState(UserDetailState)
  const [comment, setComment] = useState('')
  const route = useRouter()
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    try {
      const res = Postfetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/record/${id}/comment`,
        comment,
      ).then((res) => {
        if (res.status === 200) {
          alert('댓글 작성 완료!')
          // route.replace(`/record/${id}`)
          route.refresh()
        }
      })
    } catch (error) {}
  }
  return (
    <div className="commentInput">
      <form onSubmit={submitHandler}>
        <div className="inner">
          <Avatar
            width="35px"
            height="35px"
            isItprofile={false}
            imgAddress={user.profileImage}
          />
          <input
            type="text"
            placeholder={`${user.accountName}(으)로 댓글달기...`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button type="submit">
            <IoSend />
          </button>
        </div>
      </form>
      <button
        className="close"
        onClick={(prev) => {
          setShowInput(!prev)
        }}
      >
        <IoClose />
      </button>
    </div>
  )
}

export default CommentInput
