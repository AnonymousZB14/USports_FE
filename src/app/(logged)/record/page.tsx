'use client'
import Title from '@/components/title'
import { useState } from 'react'
import { filterOptions } from '../../../types/data'
import FilterDialog from '@/components/filterDialog'
import Button from '@/components/commonButton'
import { SlArrowDown } from 'react-icons/sl'
import { IoCloseOutline } from 'react-icons/io5'

const recordWrite = () => {
  const [isFilterDialogOpen2, setIsFilterDialogOpen2] = useState(false)
  const [selectedFilter2, setSelectedFilter2] = useState<string>('운동종목')
  const [showImages, setShowImages] = useState([])

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  // 이미지 상대경로 저장
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files ?? []
    let imageUrlLists = [...showImages]

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i])
      imageUrlLists.push(currentImageUrl)
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5)
    }

    setShowImages(imageUrlLists)
  }

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id))
  }

  return (
    <>
      <Title title="Explore" />

      <form onSubmit={handleSubmit} className="explore-form">
        <h1>기록 글을 작성해주세요.</h1>

        <div className="tit-input-wrap">
          <h2>제목</h2>
          <input type="text" placeholder="제목을 입력해주세요.(50자 이내)" />
        </div>

        <div className="category-wrap">
          <h2>카테고리</h2>
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
          <h2>내용</h2>
          <textarea placeholder="내용을 입력해주세요.(500자 이내)" />
        </div>

        <div className="tit-input-wrap">
          <h2>사진</h2>
          <div className="upload-wrap">
            <label htmlFor="input-file">
              <input
                type="file"
                id="input-file"
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
