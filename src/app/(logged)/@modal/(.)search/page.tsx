'use client'
import Avatar from '@/components/avatar'
import Modal from '@/components/modal'
import { Getfetch, axiosInstance } from '@/func/fetchCall'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FormEventHandler, useState } from 'react'
import { IoSearchCircle, IoSearch } from 'react-icons/io5'
interface UserList {
  accountName: string
  email: string
  memberId: number
  name: string
  profileImage: string
}
const page = () => {
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const route = useRouter()
  const [userList, setUserList] = useState<UserList[]>()
  const submithandler: FormEventHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.get(`member/search?accountName=${value}`)
      if (res.status === 200) {
        setUserList(res.data)
      }
    } catch (error) {
      console.log(error)
    }
    setValue('')
    setResult(value)
  }
  const onClickHandler = (accountName: string) => {
    route.back()
    setTimeout(() => {
      route.replace(`/profile/${accountName}`)
    }, 100)
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
            <IoSearch />
          </button>
        </form>
        <div className="findUserResult">
          {userList && userList.length >= 1 ? (
            <>
              <p className="findresult">
                🔎 "{result}"에 대한 검색 결과입니다.{' '}
              </p>
              <ul>
                {userList.map((item) => {
                  return (
                    <li key={item.memberId}>
                      <div
                        className="userInfoSec"
                        onClick={() => onClickHandler(item.accountName)}
                      >
                        <div style={{ width: 40, height: 40 }}>
                          <div className="avatar_img">
                            {
                              <img
                                src={item.profileImage}
                                alt="profile"
                                width={100}
                                height={100}
                              />
                            }
                          </div>
                        </div>
                        <div className="user_info">
                          <h3>{item.name}</h3>
                          <p>@{item.accountName}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : (
            <p className="info">검색 조건에 맞는 결과가 없습니다</p>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default page
