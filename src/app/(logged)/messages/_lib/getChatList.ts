import { Getfetch } from '@/func/fetchCall'

export function getChatList({ queryKey }: any) {
  const [_, room] = queryKey
  const res = Getfetch(`/chat/${room}/message-list`).then((res) => res)
  return res
}
