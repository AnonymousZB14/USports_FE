'use client'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'
const BackBtn = () => {
  const router = useRouter()
  return (
    <div
      className="closeModalBtn"
      onClick={() => {
        router.back()
      }}
    >
      <IoClose />
    </div>
  )
}

export default BackBtn
