import { Getfetch } from '@/func/fetchCall'

export function getChatRoomInfo({ queryKey }: any) {
  const [_, room] = queryKey
  const res = Getfetch(`/chat/${room}`).then((res) => res)
  return res
}
