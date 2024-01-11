import { Getfetch, Postfetch } from '@/func/fetchCall'

export function getFollowing({ queryKey }: any) {
  const [_1, _2, memberId] = queryKey
  const res = Getfetch(`/follow/${memberId}/FOLLOWING`).then((res) => res)
  return res
}
