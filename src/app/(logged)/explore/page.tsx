'use client'
import FilterSection from '@/components/filterSection'
import SearchBar from '@/components/searchBar'
import SwitchButton from '@/components/switchButton'
import Title from '@/components/title'
import { useEffect, useState } from 'react'
import FilterDialog from '@/components/filterDialog'
import { filterOptions } from '../../../types/data'
import Button from '@/components/button'
import Pagination from '@/components/pagination'

const explore = () => {
  const [isOn, setIsOn] = useState(false)
  const [isFilterDialogOpen1, setIsFilterDialogOpen1] = useState(false)
  const [selectedFilter1, setSelectedFilter1] = useState<string>('모든지역')
  const [isFilterDialogOpen2, setIsFilterDialogOpen2] = useState(false)
  const [selectedFilter2, setSelectedFilter2] = useState<string>('운동종목')
  const [isFilterDialogOpen3, setIsFilterDialogOpen3] = useState(false)
  const [selectedFilter3, setSelectedFilter3] = useState<string>('성별')

  const openFilterDialog1 = () => {
    setIsFilterDialogOpen1(true)
  }

  const closeFilterDialog1 = () => {
    setIsFilterDialogOpen1(false)
  }

  const applyFilter1 = (filter: string) => {
    console.log('Applying filter 1:', filter)
    setSelectedFilter1(filter)
  }

  const openFilterDialog2 = () => {
    setIsFilterDialogOpen2(true)
  }

  const closeFilterDialog2 = () => {
    setIsFilterDialogOpen2(false)
  }

  const applyFilter2 = (filter: string) => {
    console.log('Applying filter 2:', filter)
    setSelectedFilter2(filter)
  }

  const openFilterDialog3 = () => {
    setIsFilterDialogOpen3(true)
  }

  const closeFilterDialog3 = () => {
    setIsFilterDialogOpen3(false)
  }

  const applyFilter3 = (filter: string) => {
    console.log('Applying filter 3:', filter)
    setSelectedFilter3(filter)
  }

  const toggleHandler = () => {
    setIsOn(!isOn)
  }
  const [list, setList] = useState<
    {
      id: number
      title: string
      badge: string
      gender: string
      level: string
      status: string
    }[]
  >([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  const mockData = [
    {
      id: 1,
      title: '강동 알레 클라이밍 12/4',
      badge: '클라이밍',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 2,
      title: '안양 평콘 칼라힐 풋살파크',
      badge: '축구',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 3,
      title: '한강 러닝하실 분',
      badge: '러닝',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 4,
      title: 'xx대학교 농구장에서 농구하실분',
      badge: '농구',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 5,
      title: '강남 xx파크(초보만)',
      badge: '스쿼시',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 6,
      title: '하나테니스장에서 테니스 치실분',
      badge: '테니스',
      gender: '남녀모두',
      level: '모든레벨',
      status: '마감',
    },
    {
      id: 7,
      title: '강남 xx파크(초보만)',
      badge: '탁구',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 8,
      title: '일산 더클라임',
      badge: '축구',
      gender: '여',
      level: '모든레벨',
      status: '마감',
    },
    {
      id: 9,
      title: '강남 xx파크(초보만)',
      badge: '축구',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 10,
      title: '일산 더클라임',
      badge: '농구',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 11,
      title: '강남 xx파크(초보만)',
      badge: '농구',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
    {
      id: 12,
      title: '강남 xx파크(초보만)',
      badge: '테니스',
      gender: '남녀모두',
      level: '모든레벨',
      status: '모집중',
    },
  ]

  useEffect(() => {
    setList(mockData)
  }, [])

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastItem = currentPage * postsPerPage
  const indexOfFirstItem = indexOfLastItem - postsPerPage
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <>
      <Title title="Explore" />
      <SearchBar />
      <div className="filter-wrap">
        <div className="category-wrap">
          <FilterSection
            openFilterDialog={openFilterDialog1}
            closeFilterDialog={closeFilterDialog1}
            applyFilter={applyFilter1}
            isFilterDialogOpen={isFilterDialogOpen1}
            selectedFilter={selectedFilter1}
            filterOptions={filterOptions.options1}
            title="모든지역"
          />

          <FilterSection
            openFilterDialog={openFilterDialog2}
            closeFilterDialog={closeFilterDialog2}
            applyFilter={applyFilter2}
            isFilterDialogOpen={isFilterDialogOpen2}
            selectedFilter={selectedFilter2}
            filterOptions={filterOptions.options2}
            title="운동종목"
          />

          <FilterSection
            openFilterDialog={openFilterDialog3}
            closeFilterDialog={closeFilterDialog3}
            applyFilter={applyFilter3}
            isFilterDialogOpen={isFilterDialogOpen3}
            selectedFilter={selectedFilter3}
            filterOptions={filterOptions.options3}
            title="성별"
          />
        </div>
        <div className="switch-wrap">
          <p>마감 제외</p>
          <SwitchButton isOn={isOn} toggleHandler={toggleHandler} />
        </div>
      </div>
      <div className="board-header">
        <p>총 {list.length}건</p>
        <Button tailwindStyles="py-0 px-2" theme="blue">
          모집글 작성하기
        </Button>
      </div>

      <ul className="board-list">
        {currentItems.map((el) => (
          <li className="board-item" key={el.id}>
            <div className="badge">{el.badge}</div>
            <div className="content">
              <p className="title">{el.title}</p>
              <div className="condition">
                <span className="gender">{el.gender}</span>
                <span className="bar"></span>
                <span className="level">{el.level}</span>
              </div>
            </div>
            <div className="status">{el.status}</div>
          </li>
        ))}
      </ul>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={list.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  )
}

export default explore
