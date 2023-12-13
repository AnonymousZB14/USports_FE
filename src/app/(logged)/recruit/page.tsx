'use client'
import Title from '@/components/title'
import { filterOptions } from '../../../types/data'
import FormAddress from '../../../components/addressForm'
import DataPicker from '../../../components/dataPicker'
import { useEffect, useState } from 'react'
import { AddressType } from '../../../types/types'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import FilterDialog from '@/components/filterDialog'
import Button from '@/components/Button'
import { SlArrowDown } from 'react-icons/sl'
import FilterSection from '@/components/filterSection'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Getfetch } from '@/func/fetchCall'

const recruitWrite = () => {
  const router = useRouter()
  const [addressData, setAddressData] = useState<AddressType | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [isFilterDialogOpen1, setIsFilterDialogOpen1] = useState(false)
  const [selectedFilter1, setSelectedFilter1] = useState<string>('모든지역')
  const [isFilterDialogOpen2, setIsFilterDialogOpen2] = useState(false)
  const [selectedFilter2, setSelectedFilter2] = useState<string>('운동종목')
  const [isFilterDialogOpen3, setIsFilterDialogOpen3] = useState(false)
  const [selectedFilter3, setSelectedFilter3] = useState<string>('성별')
  const [isFilterDialogOpen4, setIsFilterDialogOpen4] = useState(false)
  const [selectedFilter4, setSelectedFilter4] = useState<string>('레벨')
  const [isFilterDialogOpen5, setIsFilterDialogOpen5] = useState(false)
  const [selectedFilter5, setSelectedFilter5] = useState<string>('레벨')

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

  const openFilterDialog4 = () => {
    setIsFilterDialogOpen4(true)
  }

  const closeFilterDialog4 = () => {
    setIsFilterDialogOpen4(false)
  }

  const applyFilter4 = (filter: string) => {
    console.log('Applying filter 4:', filter)
    setSelectedFilter4(filter)
  }

  const openFilterDialog5 = () => {
    setIsFilterDialogOpen5(true)
  }

  const closeFilterDialog5 = () => {
    setIsFilterDialogOpen5(false)
  }

  const applyFilter5 = (filter: string) => {
    setSelectedFilter5(filter)
  }

  const handleDateChange = (
    selectedDates: Date[],
    dateStr: string,
    instance: flatpickr.Instance,
  ) => {
    setSelectedDate(dateStr)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const [list, setList] = useState({})
  useEffect(() => {
    try {
      axios
        .get('http://3.39.34.245:8080/recruit/1')
        .then((res) => res.data)
        .then((resp) => console.log(resp))
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    console.log('dkdk:' + list)
  }, [list])

  // const getProfile = async () => {
  //   const res = await axiosInstance.get(`http://3.39.34.245:8080/recruit/1`)

  //   if (res.status === 200) {
  //     console.log('dkdk:' + res)
  //   }
  // }
  // useEffect(() => {
  //   getProfile()
  // }, [])

  return (
    <>
      <Title title="Explore" />

      <form onSubmit={handleSubmit} className="explore-form">
        <h1>모집 글을 작성해주세요.</h1>

        <div className="tit-input-wrap">
          <h2>제목</h2>
          <input type="text" placeholder="제목을 입력해주세요.(50자 이내)" />
        </div>
        <div className="category-wrap">
          <h2>카테고리</h2>
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
        <div className="category-wrap">
          <div className="category-con">
            <h2>레벨</h2>
            <FilterSection
              openFilterDialog={openFilterDialog4}
              closeFilterDialog={closeFilterDialog4}
              applyFilter={applyFilter4}
              isFilterDialogOpen={isFilterDialogOpen4}
              selectedFilter={selectedFilter4}
              filterOptions={filterOptions.options4}
              title="레벨"
            />
            <span className="from-to-line"></span>
            <FilterSection
              openFilterDialog={openFilterDialog5}
              closeFilterDialog={closeFilterDialog5}
              applyFilter={applyFilter5}
              isFilterDialogOpen={isFilterDialogOpen5}
              selectedFilter={selectedFilter5}
              filterOptions={filterOptions.options5}
              title="레벨"
            />
          </div>
        </div>

        <div className="input-wrap">
          <h2>비용</h2>
          <div className="input-box">
            <input type="text" placeholder="금액을 입력해주세요." />
            <p>원</p>
          </div>
        </div>

        <div className="input-wrap">
          <h2>모집정원</h2>
          <div className="input-box">
            <input type="text" placeholder="정원을 입력해주세요." />
            <p>명</p>
          </div>
        </div>

        <div className="tit-input-wrap">
          <h2>내용</h2>
          <textarea placeholder="내용을 입력해주세요.(500자 이내)" />
        </div>

        <div className="tit-input-wrap">
          <h2>주소</h2>
          <FormAddress
            addressData={addressData}
            setAddressData={setAddressData}
          />
        </div>

        <div className="tit-input-wrap">
          <h2>날짜</h2>
          <DataPicker onChange={handleDateChange} />
          {/* <p>{selectedDate}</p> */}
        </div>

        <div className="flex gap-5 mt-20 justify-center">
          <Button
            tailwindStyles="py-0 px-2"
            theme="gray"
            onClick={() => {
              router.back()
            }}
          >
            작성취소
          </Button>
          <Button
            type="submit"
            tailwindStyles="py-0 px-2"
            theme="blue"
            onClick={() => {
              console.log(addressData, selectedDate)
            }}
          >
            작성완료
          </Button>
        </div>
      </form>
    </>
  )
}

export default recruitWrite
