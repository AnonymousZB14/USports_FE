import { Getfetch } from '@/func/fetchCall'
type Props = { accoutName: string }
export function getMyRecords({ pageParam = 1, queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = Getfetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${accountName}/records?page=${pageParam}`,
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/profile/${accountName}/records?page=${pageParam}`,
  ).then((res) => res)
  return res
}
