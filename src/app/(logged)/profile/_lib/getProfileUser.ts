import { Getfetch } from '@/func/fetchCall'
type Props = { accoutName: string }
export function getProfileUser({ queryKey }: any) {
  const [_1, accountName] = queryKey
  const res = Getfetch(
    `/profile/${accountName}`,
  ).then((res) => res)
  return res
}
