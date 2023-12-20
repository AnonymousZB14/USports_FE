import { Getfetch } from '@/func/fetchCall'
type Props = { accoutName: string }
export function getMyRecruits({ pageParam = 1, queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = Getfetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/profile/${accountName}/recruits?page=${pageParam}`,
  ).then((res) => res)
  return res
}
