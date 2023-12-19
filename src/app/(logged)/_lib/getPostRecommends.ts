import { Getfetch } from '@/func/fetchCall'

type Props = { pageParam?: number }
export function getPostRecommends({ pageParam }: Props) {
  const res = Getfetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends?page=${pageParam}`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/home/recommend?page=${pageParam}`,
  ).then((res) => res)
  return res
}
