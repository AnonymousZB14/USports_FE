import { Getfetch, Postfetch } from '@/func/fetchCall'

export function getFollowers({ queryKey }: any) {
  const [_1,_2, accoutName] = queryKey
  const res = Getfetch(`/follow/${'FOLLOWER'}`).then((res) => res)
  return res
}
