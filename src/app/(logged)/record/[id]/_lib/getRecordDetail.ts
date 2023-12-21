import { Getfetch } from '@/func/fetchCall'
import axios from 'axios'
type Props = { recordId: string }
export function getRecordDetail({ queryKey }: any) {
  const accessToken = localStorage.getItem('accessToken')
  const [_1, recordId] = queryKey
  const res = axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/record/${recordId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
  return res
}