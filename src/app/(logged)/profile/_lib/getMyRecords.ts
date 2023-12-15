import { auth } from '@/auth'
import { Getfetch } from '@/func/fetchCall'
type Props = { accoutName: string; pageParam?: number }
export function getMyRecords({ queryKey }: any) {
  const [accoutName, pageParam] = queryKey
  const res = Getfetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${accoutName}-records?page=${pageParam}`,
  ).then((res) => res)
  return res
}
