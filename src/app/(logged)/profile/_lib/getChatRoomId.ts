import { Getfetch, Postfetch } from '@/func/fetchCall'

export function getChatRoomId({ queryKey }: any) {
  const [_1, memberId] = queryKey
  const res = Postfetch(`/chat/direct-message`, {
    memberId: memberId,
  }).then((res) => res)
  return res
}
