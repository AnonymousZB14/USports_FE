'use client'
import { useQuery } from '@tanstack/react-query'
import { BsPersonCircle } from 'react-icons/bs'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getFollowers } from '../../_lib/getFollowers'
import { FollowUserPerType, FollowUserPerTypeList } from '@/types/types'
import { getFollowing } from '../../_lib/getFollowing'
import Modal from '@/components/modal'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

const FollowList = ({ memberId }: { memberId: number }) => {
  const [followers, setFollowers] = useState<FollowUserPerTypeList[]>()
  const [following, setFollowing] = useState<FollowUserPerTypeList[]>()
  const [showModal, setShowModal] = useState(false)
  const { data: followerData } = useQuery<FollowUserPerType>({
    queryKey: ['followList', 'FOLLOWERS', memberId],
    queryFn: getFollowers,
  })
  const { data: followingData } = useQuery<FollowUserPerType>({
    queryKey: ['followList', 'FOLLOWING', memberId],
    queryFn: getFollowing,
  })
  useEffect(() => {
    followerData && setFollowers(followerData.list)
  }, [followerData])
  useEffect(() => {
    followingData && setFollowing(followingData.list)
  }, [followingData])

  return (
    <>
      <div
        className="profileFollowList"
        onClick={() => setShowModal((prev) => !prev)}
      >
        <p>
          팔로잉 <span>{followingData?.totalElements}</span>
        </p>
        <p>
          팔로워 <span>{followerData?.totalElements}</span>
        </p>
      </div>
      {showModal && (
        <FollowListModal
          setShowModal={setShowModal}
          followerList={followers!}
          followingList={following!}
        />
      )}
    </>
  )
}

export default FollowList

const FollowListModal = ({
  setShowModal,
  followingList,
  followerList,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>
  followingList: FollowUserPerTypeList[]
  followerList: FollowUserPerTypeList[]
}) => {
  const router = useRouter()
  return (
    <div id="modal">
      <div className="modalInner">
        <div
          className="closeModalBtn"
          onClick={() => {
            setShowModal((prev) => !prev)
          }}
        >
          <IoClose />
        </div>
        <div className="listWrap">
          <section>
            <h3>팔로잉</h3>
            <ul>
              {followingList.map((user) => {
                return (
                  <li
                    onClick={() =>
                      router.replace(`/profile/${user.toMemberAccountName}`)
                    }
                  >
                    <BsPersonCircle />
                    &nbsp; {user.toMemberAccountName}
                  </li>
                )
              })}
            </ul>
          </section>
          <section>
            <h3>팔로워</h3>
            <ul>
              {followerList.map((user) => {
                return (
                  <li
                    onClick={() =>
                      router.replace(`/profile/${user.fromMemberAccountName}`)
                    }
                  >
                    <BsPersonCircle />
                    &nbsp; {user.fromMemberAccountName}
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
