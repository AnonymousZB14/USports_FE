import { Getfetch } from '@/func/fetchCall'

export function getApplicants({ queryKey }:any) {
  const [_1, recruitId] = queryKey
  const res = Getfetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recruit/${recruitId}/applicants`).then(
    (res) => res,
  )
  return res
}
