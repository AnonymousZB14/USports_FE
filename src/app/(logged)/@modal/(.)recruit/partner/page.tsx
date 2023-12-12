'use client'
import Modal from '@/components/modal'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  return (
    <Modal>
      <div>파트너 평가!!</div>
    </Modal>
  )
}

export default Page
