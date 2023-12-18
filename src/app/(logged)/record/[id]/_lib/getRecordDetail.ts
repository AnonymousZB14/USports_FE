import { Getfetch } from '@/func/fetchCall'
type Props = { recordId: string }
export function getRecordDetail({ queryKey }: any) {
  const [_1, recordId] = queryKey
  const res = Getfetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/record/${recordId}`,
  ).then((res) => res)
  return res
}
