import { auth } from '@/auth'
import { Getfetch } from '@/func/fetchCall'
import { cookies } from 'next/headers'
type Props = { accoutName: string }
export function getMyRecords({ pageParam, queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = Getfetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${accountName}-records?page=${pageParam}`,
    
  ).then((res) => res)
  return res
}
