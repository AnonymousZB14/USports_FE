'use client'
import { useRouter, useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import 'flatpickr/dist/flatpickr.min.css'
import axios from 'axios'
import flatpickr from 'flatpickr'
import Title from '@/components/title'
import FormAddress from '../../../components/addressForm'
import DataPicker from '../../../components/dataPicker'
import Button from '@/components/commonButton'
import {
  OptionProps,
  AddressType,
  SportsItem,
  SportsLevel,
} from '@/types/types'
import FilterSection from '@/components/filterSection'
import FilterDialog from '@/components/filterDialog'
import { SlArrowDown } from 'react-icons/sl'
import { Getfetch, axiosInstance } from '@/func/fetchCall'
import { OptionProps } from '@/types/types'
import SportsFilterSection from '@/components/sportsFilterSection'
import { useRecoilState } from 'recoil'
import { RegionList, SportsLevelList, SportsList } from '@/store/types'
import LevelFilterSection from '@/components/levelFilterSection'

interface recruit {
  sportsName: string
  title: string
  content: string
  region: string
  cost: number
  recruitCount: number
  gender: string
  gradeFrom: number
  gradeTo: number
  address: string
  postCode: number
  placeName: string
  meetingDate: string
}
interface Sport {
  sportsId: number
  sportsName: string
}
const recruitWrite = () => {
  const params = useParams()
  const router = useRouter()

  const [addressData, setAddressData] = useState<AddressType | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [costNum, setCostNum] = useState('')
  const [personNum, setPersonNum] = useState('')
  const [optionList, setOptionList] = useState<OptionProps | undefined>()
  const [reviewModalContent, setReviewModalContent] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('모든지역')
  const [selectedSports, setSelectedSports] = useState<Sport>({
    sportsId: 0,
    sportsName: '운동종목',
  }) // 운동종목
  const [selectedGender, setSelectedGender] = useState<string>('성별')
  const [selectedGradeFrom, setSelectedGradeFrom] = useState<string>('레벨')
  const [selectedGradeTo, setSelectedGradeTo] = useState<string>('레벨')
  const [isFilterDialogOpen1, setIsFilterDialogOpen1] = useState(false)
  const [isFilterDialogOpen2, setIsFilterDialogOpen2] = useState(false)
  const [isFilterDialogOpen3, setIsFilterDialogOpen3] = useState(false)
  const [isFilterDialogOpen4, setIsFilterDialogOpen4] = useState(false)
  const [isFilterDialogOpen5, setIsFilterDialogOpen5] = useState(false)

  const openFilterDialog1 = () => {
    setIsFilterDialogOpen1(true)
  }

  const closeFilterDialog1 = () => {
    setIsFilterDialogOpen1(false)
  }

  const applyFilter1 = (filter: string) => {
    console.log('Applying filter 1:', filter)
    setSelectedRegion(filter)
  }

  const openFilterDialog2 = () => {
    setIsFilterDialogOpen2(true)
  }

  const closeFilterDialog2 = () => {
    setIsFilterDialogOpen2(false)
  }

  const applyFilter2 = (sportsId: number, sportsName: string) => {
    console.log('Applying filter 2:', sportsId)
    setSelectedSports({ sportsId, sportsName })
  }

  const openFilterDialog3 = () => {
    setIsFilterDialogOpen3(true)
  }

  const closeFilterDialog3 = () => {
    setIsFilterDialogOpen3(false)
  }

  const applyFilter3 = (filter: string) => {
    console.log('Applying filter 3:', filter)
    setSelectedGender(filter)
  }

  const openFilterDialog4 = () => {
    setIsFilterDialogOpen4(true)
  }

  const closeFilterDialog4 = () => {
    setIsFilterDialogOpen4(false)
  }

  const applyFilter4 = (filter: string) => {
    console.log('Applying filter 4:', filter)
    setSelectedGradeFrom(filter)
  }

  const openFilterDialog5 = () => {
    setIsFilterDialogOpen5(true)
  }

  const closeFilterDialog5 = () => {
    setIsFilterDialogOpen5(false)
  }

  const applyFilter5 = (filter: string) => {
    console.log('Applying filter 5:', filter)
    setSelectedGradeTo(filter)
  }

  const handleDateChange = (
    selectedDates: Date[],
    dateStr: string,
    instance: flatpickr.Instance,
  ) => {
    setSelectedDate(dateStr)
  }

  flatpickr('.date-selector', {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    onChange: handleDateChange,
  })
  const handleTitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleCostNumChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCostNum(event.target.value)
  }

  const handlePersonNumChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPersonNum(event.target.value)
  }

  const [optionList, setOptionList] = useState<OptionProps | undefined>()
  const [sports, setSports] = useRecoilState(SportsList)
  const [sportsLevel, setRportsLevel] = useRecoilState(SportsLevelList)
  const [region, setRegion] = useRecoilState(RegionList)
  useEffect(() => {
    axiosInstance
      .get(`/api/types`)
      .then((res) => {
        setOptionList(res.data)

        console.log('optionList: ', res.data, optionList?.genderList)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const recruitData = new FormData()

      const selectedSportsItem = optionList?.sportsList.find(
        (sport) => sport.sportsName === selectedSports,
      )

      if (selectedSportsItem) {
        recruitData.append('sportsId', selectedSportsItem.sportsId.toString())
      }
      const selectedSportsLevel = optionList?.sportsLevelList.find(
        (level) => level.description === selectedGradeFrom,
      )

      if (selectedSportsLevel) {
        recruitData.append('gradeFrom', selectedSportsLevel.sportsGrade)
      }

      const selectedSportsLevelTo = optionList?.sportsLevelList.find(
        (level) => level.description === selectedGradeTo,
      )

      if (selectedSportsLevelTo) {
        recruitData.append('gradeTo', selectedSportsLevelTo.sportsGrade)
      }

      const { address, postCode, additional } = addressData || {}

      const transformedAddressData = {
        address: address ? address.split(' ').slice(1).join(' ') : '', // 두 번째 단어부터 마지막까지의 주소
        postCode: postCode || '',
        placeName: additional || '', // additional을 placeName으로 사용
      }

      recruitData.append('address', transformedAddressData.address)
      recruitData.append('postCode', transformedAddressData.postCode)
      recruitData.append('placeName', transformedAddressData.placeName)
      recruitData.append('title', title)
      recruitData.append('content', content)
      recruitData.append('cost', costNum)
      recruitData.append('recruitCount', personNum)
      recruitData.append('meetingDate', selectedDate)
      recruitData.append('region', selectedRegion)
      recruitData.append('gender', selectedGender)
      recruitData.append('gradeFrom', selectedGradeFrom)
      recruitData.append('gradeTo', selectedGradeTo)

      console.log('Recruit Data:', Object.fromEntries(recruitData))
      const res = await axiosInstance.post(`/recruit`, {
        title: tit,
        content,
        cost: costNum,
        recruitCount: personNum,
        address: addressData?.address,
        meetingDate: new Date(selectedDate),
        postCode: addressData?.postCode,
        placeName: addressData?.additional,
        region: selectedRegion,
        sportsId: selectedSports.sportsId,
        gender: selectedGender,
        gradeFrom: selectedGradeFrom,
        gradeTo: selectedGradeTo,
      })

      console.log('Response:', res)

      if (res.status == 200) {
        setTit('')
        setContent('')
        setCostNum('')
        setPersonNum('')
        setAddressData(null)
        setSelectedDate('')
        setSelectedRegion('')
        setSelectedSports({ sportsId: 0, sportsName: '' })
        setSelectedGender('')
        setSelectedGradeFrom('')
        setSelectedGradeTo('')
        alert('작성 완료!')
        router.replace(`recruit/${res.data.recruitId}`)
      }
    } catch (error) {
      console.error('등록 중 오류:', error)
      setReviewModalContent('게시글 작성에 실패하였습니다.')
    }
  }

  return (
    <>
      <Title title="Explore" />

      <h1 className="write-tit">모집 글을 작성해주세요.</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="explore-form"
      >
        <div className="tit-input-wrap">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="id"
            name="title"
            value={title}
            onChange={handleTitChange}
            placeholder="제목을 입력해주세요.(50자 이내)"
          />
        </div>
        <div className="category-wrap">
          <label>카테고리</label>
          <FilterSection
            openFilterDialog={openFilterDialog1}
            closeFilterDialog={closeFilterDialog1}
            applyFilter={applyFilter1}
            isFilterDialogOpen={isFilterDialogOpen1}
            selectedFilter={selectedRegion}
            filterOptions={optionList?.regionList || []}
            title="모든지역"
          />

          <SportsFilterSection
            openFilterDialog={openFilterDialog2}
            closeFilterDialog={closeFilterDialog2}
            applyFilter={applyFilter2}
            isFilterDialogOpen={isFilterDialogOpen2}
            selectedFilter={selectedSports}
            filterOptions={sports}
            title="운동종목"
          />

          <FilterSection
            openFilterDialog={openFilterDialog3}
            closeFilterDialog={closeFilterDialog3}
            applyFilter={applyFilter3}
            isFilterDialogOpen={isFilterDialogOpen3}
            selectedFilter={selectedGender}
            filterOptions={optionList?.genderList || []}
            title="성별"
          />
        </div>
        <div className="category-wrap">
          <div className="category-con">
            <label>레벨</label>
            <LevelFilterSection
              openFilterDialog={openFilterDialog4}
              closeFilterDialog={closeFilterDialog4}
              applyFilter={applyFilter4}
              isFilterDialogOpen={isFilterDialogOpen4}
              selectedFilter={selectedGradeFrom}
              filterOptions={sportsLevel}
              title="레벨"
            />
            <span className="from-to-line"></span>
            <LevelFilterSection
              openFilterDialog={openFilterDialog5}
              closeFilterDialog={closeFilterDialog5}
              applyFilter={applyFilter5}
              isFilterDialogOpen={isFilterDialogOpen5}
              selectedFilter={selectedGradeTo}
              filterOptions={sportsLevel}
              title="레벨"
            />
          </div>
        </div>

        <div className="input-wrap">
          <label htmlFor="cost">비용</label>
          <div className="input-box">
            <input
              type="text"
              id="costNum"
              name="costNum"
              onChange={handleCostNumChange}
              value={costNum}
              placeholder="금액을 입력해주세요."
            />
            <p>원</p>
          </div>
        </div>

        <div className="input-wrap">
          <label htmlFor="num">모집정원</label>
          <div className="input-box">
            <input
              type="text"
              id="personNum"
              name="personNum"
              onChange={handlePersonNumChange}
              value={personNum}
              placeholder="정원을 입력해주세요."
            />
            <p>명</p>
          </div>
        </div>

        <div className="tit-input-wrap">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            name="content"
            onChange={handleContentChange}
            rows={4}
            placeholder="내용을 입력해주세요.(500자 이내)"
          />
        </div>

        <div className="tit-input-wrap">
          <label>주소</label>
          <FormAddress
            addressData={addressData}
            setAddressData={setAddressData}
          />
        </div>

        <div className="tit-input-wrap">
          <label>날짜</label>
          {/* <input type="text" className="date-selector" /> */}
          <DataPicker onChange={handleDateChange} />
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