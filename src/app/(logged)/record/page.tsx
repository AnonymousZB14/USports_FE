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
import { UserDetailState } from '@/store/user'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

const recordWrite = () => {
  const [isFilterDialogOpen2, setIsFilterDialogOpen2] = useState(false)
  const [user, setUser] = useRecoilState(UserDetailState)
  const [selectedFilter2, setSelectedFilter2] = useState<string>('운동종목')
  const [showImages, setShowImages] = useState([])
  const [images, setImages] = useState<File[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const route = useRouter()
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    // formData.append('images', images[0])
    images.map((file) => formData.append('images', file))
    const blob = new Blob([JSON.stringify({ sportsId: 1, content: content })], {
      type: 'application/json',
    })
    formData.append('request', blob)

    try {
      console.dir(images)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/record`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            credentials: 'include',
            Authorization: `Bearer ${user.tokenDto.accessToken}`,
          },
        },
      )
      if (!(res.status === 200)) return
      alert('작성 완료!')
      route.replace(`record/${res.data.recordId}`)
    } catch (error) {
      console.log
    }
  }

  useEffect(() => {
    console.log(selectedFilter2)
  }, [selectedFilter2])

  // 이미지 상대경로 저장
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setImages([...images, event.target.files[0]])
    /*     const imageLists = event.target.files ?? []
    let imageUrlLists = [...showImages]
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i])
      imageUrlLists.push(currentImageUrl)
    }
    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5)
    }
    setShowImages(imageUrlLists) */
  }

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id))
  }

  return (
    <>
      <Title title="Explore" />

      <h1 className="write-tit">기록 글을 작성해주세요.</h1>
      <form onSubmit={handleSubmit} className="explore-form">

        <div className="category-wrap">
          <label>카테고리</label>
          <ul className="category-con">
            <li>
              <button
                onClick={openFilterDialog2}
                className={selectedFilter2 === '운동종목' ? '' : 'active'}
              >
                {selectedFilter2}
                <SlArrowDown className="category-arrow" />
              </button>
            </li>
          </ul>

          {isFilterDialogOpen2 && (
            <FilterDialog
              options={filterOptions.options2}
              onApplyFilter={applyFilter2}
              onClose={closeFilterDialog2}
              selectedFilterName={selectedFilter2}
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
            // onClick={() => {
            //   router.back()
            // }}
          >
            작성취소
          </Button>
          <Button
            type="submit"
            tailwindStyles="py-0 px-2"
            theme="blue"
            onClick={() => {
              console.log('a')
            }}
          >
            작성완료
          </Button>
        </div>
      </form>
    </>
  )
}

export default recordWrite
