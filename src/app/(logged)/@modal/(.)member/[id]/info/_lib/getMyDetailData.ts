import { Getfetch } from '@/func/fetchCall'

export function getMyDetailData() {
  const res = Getfetch(`/mypage/member`).then(
    (res) => res,
  )
  return res
}
