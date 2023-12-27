import { Getfetch } from '@/func/fetchCall'
import { ExploreData } from '@/types/types'
import { QueryFunction } from '@tanstack/query-core'
type RecruitsProps = {
  searchParams: {
    page: string
    closeInclude?: string
    gender?: string
    region?: string
    search?: string
    sports?: string
  }
}
export const getRecruitsData: QueryFunction<
  ExploreData,
  [
    _1: string,
    _2: string,
    searchParams: {
      page: string
      closeInclude?: string
      gender?: string
      region?: string
      search?: string
      sports?: string
    },
  ]
> = ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey
  const urlSearchParams = new URLSearchParams(searchParams)
  const res = Getfetch(
    `/recruits?${urlSearchParams.toString()}`,
  ).then((res) => res)
  return res
}
