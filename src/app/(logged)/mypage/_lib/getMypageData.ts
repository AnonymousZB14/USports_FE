import { Getfetch } from '@/func/fetchCall'

export function getMypageData() {
  const res = Getfetch(`/mypage`).then(
    (res) => res,
  )
  return res
}
