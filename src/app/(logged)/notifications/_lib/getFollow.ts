import { Getfetch } from '@/func/fetchCall'

export function getFollow({ queryKey }: any) {
  const [_, room] = queryKey
  const res = Getfetch(`/follow/requested-follow`).then((res) => res)
  return res
}
