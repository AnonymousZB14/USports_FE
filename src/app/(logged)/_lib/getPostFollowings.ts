import { Getfetch } from '@/func/fetchCall'
type Props = { pageParam?: number }
export function getPostFollowings({ pageParam }: Props) {
  const res = Getfetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/api/postFollowings?page=${pageParam}`,
    // `${process.env.NEXT_PUBLIC_BASE_URL}/home/recommend?page=${pageParam}`,
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/home?type=FOLLOW&page=${pageParam}`,
  ).then((res) => res)
  return res
}
