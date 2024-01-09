'use client'
import Modal from '@/components/modal'
import React, { FormEventHandler, useState } from 'react'
import { IoSearchCircle, IoSearch } from 'react-icons/io5'
const page = () => {
  const [value, setValue] = useState('')
  const submithandler: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <Modal>
      <div className="findUserWrap">
        <form onSubmit={submithandler}>
          <input
            type="text"
            placeholder="사용자 이름을 검색하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">
            <IoSearchCircle />
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default page
