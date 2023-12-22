import { Getfetch } from '@/func/fetchCall'

export function getMypageData() {
  const res = Getfetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mypage`).then(
    (res) => res,
  )
  return res
}
