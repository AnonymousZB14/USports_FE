'use client'
import { useState, useEffect } from 'react'
import { Getfetch } from '@/func/fetchCall'
import { BsArrowRightCircle } from 'react-icons/bs'
import Link from 'next/link'
export const GoToFollow = () => {
  const [list, setList] = useState({})
  useEffect(() => {
    try {
      Getfetch(`/home?page=1`).then(
        (resp) => {
          // console.log(resp)
          setList(resp.list)
        },
      )
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    // console.log(list)
  }, [list])

  return (
    <div className="go_to_follow">
      <p>You haven't followed anyone yet</p>
      <span>😓</span>
      <Link href="/explore">
        Find people to follow
        <BsArrowRightCircle />
      </Link>
    </div>
  )
}
