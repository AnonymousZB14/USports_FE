import { Getfetch } from '@/func/fetchCall'
type Props = { accoutName: string }
export function getProfileUser({ queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = Getfetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${accountName}`,
  ).then((res) => res)
  return res
}
