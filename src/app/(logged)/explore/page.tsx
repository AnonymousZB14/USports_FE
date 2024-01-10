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
import { useRecoilState } from 'recoil'
import { RegionList, SportsList } from '@/store/types'
import { ExploreRecruitItem } from './_component/ExploreRecruitItem'

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
  const [selectedRegion, setSelectedRegion] = useState<string>('모든 지역')
  const [isFilterDialogOpen2, setIsFilterDialogOpen2] = useState(false)
  const [selectedSports, setSelectedSports] = useState<string>('운동종목')
  const [isFilterDialogOpen3, setIsFilterDialogOpen3] = useState(false)
  const [selectedGender, setSelectedGender] = useState<string>('성별 무관')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const onSearchHandler = (value: string) => {
    setSearchQuery(value)
  }

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
    setFilter((prev) => {
      return {
        ...prev,
        page: currentPage + '',
      }
    })
  }, [currentPage])
  useEffect(() => {
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
    setCurrentPage(1)
    setSelectedRegion(filter)
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
    setCurrentPage(1)
    setSelectedSports(filter)
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
    setCurrentPage(1)
    setSelectedGender(filter)
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
            selectedFilter={selectedRegion}
            filterOptions={region}
            title="모든 지역"
          />

          <FilterSection
            openFilterDialog={openFilterDialog2}
            closeFilterDialog={closeFilterDialog2}
            applyFilter={applyFilter2}
            isFilterDialogOpen={isFilterDialogOpen2}
            selectedFilter={selectedSports}
            filterOptions={sportList.map((sport) => sport.sportsName)}
            title="운동종목"
          />

          <FilterSection
            openFilterDialog={openFilterDialog3}
            closeFilterDialog={closeFilterDialog3}
            applyFilter={applyFilter3}
            isFilterDialogOpen={isFilterDialogOpen3}
            selectedFilter={selectedGender}
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
        &nbsp;
        <Button
          tailwindStyles="py-0 px-2"
          theme="blue"
          onClick={() => {
            router.push(`/explore`)
            setSelectedRegion('모든 지역')
            setSelectedSports('운동종목')
            setSelectedGender('성별 무관')
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

export default explore
