'use client'
import Modal from '@/components/modal'
import React, { ChangeEventHandler, useState } from 'react'

const Page = () => {
  return (
    <Modal>
      <div className="editPwd">
        <p>비밀번호 변경하기</p>
        <form action="">
          <input
            type="password"
            name="old"
            placeholder="현재 비밀번호"
            required
          />
          <input
            type="password"
            name="new"
            placeholder="새 비밀번호"
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="새 비밀번호 확인"
            required
          />
          <div>
            <input type="button" value={'취소'} />
            <input type="submit" value={'수정하기'} />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default Page
