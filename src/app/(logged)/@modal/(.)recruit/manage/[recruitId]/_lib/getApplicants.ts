import { Getfetch } from '@/func/fetchCall'

export function getApplicants({ queryKey }:any) {
  const [_1, recruitId] = queryKey
  const res = Getfetch(`/recruit/${recruitId}/applicants`).then(
    (res) => res,
  )
  return res
}
