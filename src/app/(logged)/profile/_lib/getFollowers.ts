import { Getfetch, Postfetch } from '@/func/fetchCall'

export function getFollowers({ queryKey }: any) {
  const [_1, _2, memberId] = queryKey
  const res = Getfetch(`/follow/${memberId}/FOLLOWER`).then((res) => res)
  return res
}
