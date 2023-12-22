'use client'
import FilterSection from '@/components/filterSection'
import SearchBar from '@/components/searchBar'
import SwitchButton from '@/components/switchButton'
import Title from '@/components/title'
import { useEffect, useState } from 'react'
import { filterOptions } from '../../../types/data'
import Button from '@/components/commonButton'
import Pagination from '@/components/pagination'
import { useRouter } from 'next/navigation'
import { recruitItemProps } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { ExploreData } from '@/types/types'
import { getRecruitsData } from './_lib/getRecruitsData'
import { Getfetch } from '@/func/fetchCall'
import { useRecoilState } from 'recoil'
import { RegionList, SportsList } from '@/store/types'
import LoadingScreen from '@/components/loading-screen'

type Props = {
  searchParams: {
    page: string
    closeInclude?: string
    gender?: string
    region?: string
    search?: string
    sports?: string
  }
}
const explore = ({ searchParams }: Props) => {
  const [sportList, _] = useRecoilState(SportsList)
  const [region, setRegion] = useRecoilState(RegionList)
  const router = useRouter()
  const [isOn, setIsOn] = useState(false)
  const [isFilterDialogOpen1, setIsFilterDialogOpen1] = useState(false)
  const [selectedFilter1, setSelectedFilter1] = useState<string>('모든 지역')
  const [isFilterDialogOpen2, setIsFilterDialogOpen2] = useState(false)
  const [selectedFilter2, setSelectedFilter2] = useState<string>('운동종목')
  const [isFilterDialogOpen3, setIsFilterDialogOpen3] = useState(false)
  const [selectedFilter3, setSelectedFilter3] = useState<string>('성별 무관')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const onSearchHandler = (value: string) => {
    setSearchQuery(value)
  }

  useEffect(() => {
    console.log(searchQuery)
  }, [searchQuery])
  const [list, setList] = useState<recruitItemProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<{
    page?: string
    closeInclude?: string
    gender?: string
    region?: string
    search?: string
    sports?: string
  }>({})
  useEffect(() => {
    console.log(currentPage)
    // setCurrentPage((current) => current)
    setFilter((prev) => {
      return {
        ...prev,
        page: currentPage + '',
      }
    })
  }, [currentPage])
  useEffect(() => {
    console.log(filter)
    handleSearchForm()
  }, [filter])
  const postsPerPage = 6
  const {
    data,
    isFetching,
    isLoading: isDataLoading,
    isPending,
  } = useQuery<
    ExploreData,
    Object,
    ExploreData,
    [_1: string, _2: string, Props['searchParams']]
  >({
    queryKey: ['explore', 'recruits', searchParams],
    queryFn: getRecruitsData,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  })
  const handleSearchForm = () => {
    const urlSearchParams = new URLSearchParams(filter)
    router.push(`/explore?${urlSearchParams.toString()}`)
  }
  useEffect(() => {
    if (data?.list) setList(data.list)
  }, [data])
  const openFilterDialog1 = () => {
    setIsFilterDialogOpen1(true)
  }
  const closeFilterDialog1 = () => {
    setIsFilterDialogOpen1(false)
  }
  const applyFilter1 = (filter: string) => {
    console.log('Applying filter 1:', filter)
    setCurrentPage(1)
    setSelectedFilter1(filter)
    setFilter((prev) => {
      return {
        ...prev,
        region: filter === '모든 지역' ? '' : filter,
      }
    })
  }
  const openFilterDialog2 = () => {
    setIsFilterDialogOpen2(true)
  }
  const closeFilterDialog2 = () => {
    setIsFilterDialogOpen2(false)
  }
  const applyFilter2 = (filter: string) => {
    console.log('Applying filter 2:', filter)
    setCurrentPage(1)
    setSelectedFilter2(filter)
    setFilter((prev) => {
      return {
        ...prev,
        sports: filter === '운동종목' ? '' : filter,
      }
    })
  }
  const openFilterDialog3 = () => {
    setIsFilterDialogOpen3(true)
  }
  const closeFilterDialog3 = () => {
    setIsFilterDialogOpen3(false)
  }
  const applyFilter3 = (filter: string) => {
    console.log('Applying filter 3:', filter)
    setCurrentPage(1)
    setSelectedFilter3(filter)
    setFilter((prev) => {
      return {
        ...prev,
        gender: filter === '성별 무관' ? 'BOTH' : filter,
      }
    })
  }
  const handleSearch = () => {
    setFilter((prev) => {
      return {
        ...prev,
        page: '1',
        search: searchQuery === '' ? '' : searchQuery,
      }
    })
    handleSearchForm()
  }
  const toggleHandler = () => {
    setIsOn(!isOn)
    setCurrentPage(1)
    setFilter((prev) => {
      return {
        ...prev,
        closeInclude: isOn + '',
      }
    })
  }
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const currentItems = list

  return (
    <>
      <Title title="Explore" />
      <SearchBar
        onSearchHandler={onSearchHandler}
        value={searchQuery}
        isLoading={isLoading}
        handleSearch={handleSearch}
      />
      <div className="filter-wrap">
        <div className="category-wrap">
          <FilterSection
            openFilterDialog={openFilterDialog1}
            closeFilterDialog={closeFilterDialog1}
            applyFilter={applyFilter1}
            isFilterDialogOpen={isFilterDialogOpen1}
            selectedFilter={selectedFilter1}
            filterOptions={region}
            title="모든 지역"
          />

          <FilterSection
            openFilterDialog={openFilterDialog2}
            closeFilterDialog={closeFilterDialog2}
            applyFilter={applyFilter2}
            isFilterDialogOpen={isFilterDialogOpen2}
            selectedFilter={selectedFilter2}
            filterOptions={sportList.map((sport) => sport.sportsName)}
            title="운동종목"
          />

          <FilterSection
            openFilterDialog={openFilterDialog3}
            closeFilterDialog={closeFilterDialog3}
            applyFilter={applyFilter3}
            isFilterDialogOpen={isFilterDialogOpen3}
            selectedFilter={selectedFilter3}
            filterOptions={filterOptions.options3}
            title="성별 무관"
          />
        </div>
        <div className="switch-wrap">
          <p>마감 제외</p>
          <SwitchButton isOn={isOn} toggleHandler={toggleHandler} />
        </div>
      </div>
      <div className="board-header">
        <p style={{ flex: '1' }}>총 {list.length}건</p>
{/*         <Button
          tailwindStyles="py-0 px-2"
          theme="blue"
          onClick={() => {
            handleSearchForm()
          }}
        >
          필터링 적용하기
        </Button> */}
        &nbsp;
        <Button
          tailwindStyles="py-0 px-2"
          theme="blue"
          onClick={() => {
            router.push(`/explore`)
            setSelectedFilter1('모든 지역')
            setSelectedFilter2('운동종목')
            setSelectedFilter3('성별 무관')
            setIsOn(false)
            setSearchQuery('')
            setCurrentPage(1)
            setFilter({})
          }}
        >
          모두 초기화
        </Button>
      </div>
      {!isPending && currentItems.length < 1 ? (
        <div className="noData">
          <p>검색 조건에 맞는 결과가 없습니다</p>
        </div>
      ) : (
        <ul className="board-list">
          {currentItems.map((el, idx) => (
            <ExploreRecruitItem key={idx} item={el} />
          ))}
        </ul>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data?.totalElement!}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  )
}

export const ExploreRecruitItem = ({ item }: { item: recruitItemProps }) => {
  const router = useRouter()
  const [sportList, _] = useRecoilState(SportsList)
  const [sportname, setSportname] = useState('')
  useEffect(() => {
    const selectedSport = sportList.find(
      (sport) => sport.sportsId == item.sportsId,
    )
    console.log(selectedSport)
    setSportname(selectedSport?.sportsName!)
  }, [])
  return (
    <li
      className="board-item"
      key={item.recruitId}
      onClick={() => {
        router.replace(`/recruit/${item.recruitId}`)
      }}
    >
      <div className="badge">{item.sportsName}</div>
      <div className="content">
        <p className="title">{item.title}</p>
        <div className="condition">
          <span className="gender">{item.gender}</span>
          <span className="bar"></span>
          <span className="level">
            {item.gradeFrom}~{item.gradeTo}
          </span>
        </div>
      </div>
      <div className="status">{item.recruitStatus}</div>
    </li>
  )
}
export default explore
