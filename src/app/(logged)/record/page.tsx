'use client'
import Title from '@/components/title'
import { useEffect, useState } from 'react'
import { filterOptions } from '../../../types/data'
import FilterDialog from '@/components/filterDialog'
import Button from '@/components/commonButton'
import { SlArrowDown } from 'react-icons/sl'
import { IoCloseOutline } from 'react-icons/io5'
import { axiosInstance } from '@/func/fetchCall'
import axios from 'axios'
import { UserDetailState, UserTokenState } from '@/store/user'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'
import { SportsList } from '@/types/types'
import { SportsList as SportsListStore } from '@/store/types'
import SportsFilterDialog from '@/components/sportsFilterDialog'
import LoadingScreen from '@/components/loading-screen'
interface Sport {
  sportsId: number
  sportsName: string
}
const recordWrite = () => {
  const [isFilterDialogOpen2, setIsFilterDialogOpen2] = useState(false)
  const [sportsList, setSportsList] = useState<SportsList>([])
  const [user, setUser] = useRecoilState(UserDetailState)
  const [userToken, setUserToken] = useRecoilState(UserTokenState)
  const [selectedSports, setselectedSports] = useState<Sport>({
    sportsId: 0,
    sportsName: '운동종목',
  })
  const [showImages, setShowImages] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const route = useRouter()
  const [sports, setSports] = useRecoilState<any>(SportsListStore)
  const [isLoading, setLoading] = useState(false)
  const openFilterDialog2 = () => {
    setIsFilterDialogOpen2(true)
  }

  const closeFilterDialog2 = () => {
    setIsFilterDialogOpen2(false)
  }

  const applyFilter2 = (sportsId: number, sportsName: string) => {
    setselectedSports({ sportsId, sportsName })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    images.map((file) => formData.append('images', file))
    const blob = new Blob(
      [
        JSON.stringify({
          sportsId: selectedSports.sportsId,
          content: content,
        }),
      ],
      {
        type: 'application/json',
      },
    )
    formData.append('request', blob)
    let isSuccess = false
    let recordId
    try {
      const res = await axios.post(`/usports/record`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          credentials: 'include',
          Authorization: `Bearer ${userToken.accessToken}`,
        },
      })
      if (!(res.status === 200)) return
      alert('작성 완료!')
      setLoading(false)
      recordId = res.data.recordId
      isSuccess = true
    } catch (error) {
      setLoading(false)
    }
    if (isSuccess && recordId) {
      route.replace(`record/${recordId}`)
    }
  }

  // 이미지 상대경로 저장
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setImages([...images, event.target.files[0]])
    const imageLists = event.target.files ?? []
    let imageUrlLists: string[] = [...showImages]
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i])
      imageUrlLists.push(currentImageUrl)
    }
    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5)
    }
    setShowImages(imageUrlLists)
  }

  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id))
    setImages(images.filter((_, index) => index !== id))
  }
  return (
    <>
      {isLoading ?? <LoadingScreen fixed={true} />}
      <Title title="Explore" />
      <h1 className="write-tit">기록 글을 작성해주세요.</h1>
      <form onSubmit={handleSubmit} className="explore-form">
        <div className="category-wrap">
          <label>카테고리</label>
          <ul className="category-con">
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  openFilterDialog2()
                }}
                className={selectedSports.sportsId === 0 ? '' : 'active'}
              >
                {selectedSports.sportsName}
                <SlArrowDown className="category-arrow" />
              </button>
            </li>
          </ul>

          {isFilterDialogOpen2 && (
            <SportsFilterDialog
              optionsList={sports}
              onApplyFilter={applyFilter2}
              onClose={closeFilterDialog2}
              selectedFilterName={selectedSports}
            />
          )}
        </div>

        <div className="tit-input-wrap">
          <label>내용</label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
            placeholder="내용을 입력해주세요.(500자 이내)"
          />
        </div>

        <div className="tit-input-wrap">
          <label>사진</label>
          <div className="upload-wrap">
            <label htmlFor="input-file">
              <input
                type="file"
                id="input-file"
                name="input-file"
                multiple
                onChange={handleAddImages}
                className="text-xl file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-6 file:py-4 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400"
              />
              <div className="text-xl mt-5">
                👉🏼 최대 5개까지 업로드할 수 있습니다.
              </div>
            </label>

            <div className="grid grid-cols-8 gap-2 my-2">
              {showImages.map((image, id) => (
                <div className="relative aspect-video col-span-4" key={id}>
                  <div>
                    <img
                      src={image}
                      alt={`${image}-${id}`}
                      className="object-cover"
                    />
                  </div>
                  <IoCloseOutline
                    className="absolute top top-0 right-0"
                    size="20"
                    onClick={() => handleDeleteImage(id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-20 justify-center">
          <Button
            tailwindStyles="py-0 px-2"
            theme="gray"
            onClick={() => {
              route.back()
            }}
          >
            작성취소
          </Button>
          <Button type="submit" tailwindStyles="py-0 px-2" theme="blue">
            작성완료
          </Button>
        </div>
      </form>
    </>
  )
}

export default recordWrite
