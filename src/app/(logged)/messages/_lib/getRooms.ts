import { Getfetch } from '@/func/fetchCall'


export function getRooms() {
  const res = Getfetch(
    `/chat/list`,
  ).then((res) => res)
  return res
}
