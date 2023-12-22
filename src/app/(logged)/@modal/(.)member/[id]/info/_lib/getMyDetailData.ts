import { Getfetch } from '@/func/fetchCall'

export function getMyDetailData() {
  const res = Getfetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mypage/member`).then(
    (res) => res,
  )
  return res
}
