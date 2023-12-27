import { Getfetch } from '@/func/fetchCall'
type Props = { accoutName: string }
export function getMyRecruits({ pageParam = 1, queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = Getfetch(
    `/profile/${accountName}/recruits?page=${pageParam}`,
  ).then((res) => res)
  return res
}
