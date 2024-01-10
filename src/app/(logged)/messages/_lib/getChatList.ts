import { Getfetch } from '@/func/fetchCall'
type Props = { queryKey: any; pageParam?: number }
export function getChatList({ queryKey, pageParam }: Props) {
  const [_, room] = queryKey
  const res = Getfetch(`/chat/${room}/message-list?page=${pageParam}`).then(
    (res) => res,
  )
  return res
}
