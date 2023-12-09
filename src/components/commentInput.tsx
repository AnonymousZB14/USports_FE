'use client'
import React, { Dispatch, SetStateAction } from 'react'
import Avatar from './avatar'
import { IoSend, IoClose } from 'react-icons/io5'
const CommentInput = ({
  setShowInput,
}: {
  setShowInput: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className="commentInput">
      <div className="inner">
        <Avatar width="35px" height="35px" isItprofile={false} />
        <input type="text" placeholder="userId(으)로 댓글달기..."></input>
        <button>
          <IoSend />
        </button>
      </div>
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
