import { Getfetch } from '@/func/fetchCall'

export function getInviteList({ queryKey }: any) {
  const [_1, _2, room] = queryKey
  const res = Getfetch(`/chat/${room}/invite-list`).then((res) => res)
  return res
}
