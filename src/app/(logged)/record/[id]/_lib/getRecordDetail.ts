import { Getfetch } from '@/func/fetchCall'
import axios from 'axios'
type Props = { recordId: string }
export function getRecordDetail({ queryKey }: any) {
  const {accessToken} = JSON.parse(localStorage.getItem('accessToken')!)
  const [_1, recordId] = queryKey
  const res = axios
    .get(`/usports/record/${recordId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
  return res
}
