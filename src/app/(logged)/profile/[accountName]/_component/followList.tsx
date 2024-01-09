'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getFollowers } from '../../_lib/getFollowers'
import { FollowUserPerTypeList } from '@/types/types'

const FollowList = () => {
  const [followers, setFollowers] = useState<FollowUserPerTypeList>()
  const { data } = useQuery<FollowUserPerTypeList>({
    queryKey: ['followList', 'FOLLOWER'],
    queryFn: getFollowers,
  })
  useEffect(() => {
    data && setFollowers(data)
  }, [data])

  return (
    <div className='profileFollowList'>
      <p>
        팔로잉 <span>9</span>
      </p>
      <p>
        팔로워 <span>9</span>
      </p>
    </div>
  )
}

export default FollowList
