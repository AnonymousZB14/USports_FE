import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const swiper = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      centeredSlides={true}
      speed={1000}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {CarouselData.map((carouselItem) => (
        <SwiperSlide key={carouselItem.id}>
          <img src={carouselItem.img} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default swiper

interface CarouselDataType {
  [key: string]: string
}
export const CarouselData: CarouselDataType[] = [
  {
    id: '1',
    img: 'https://react-shop-oinochoe.vercel.app/img_shop_fashion.jpeg',
    mainTit: '물빠진 청바지',
    subTit: '이제 막 도착한 패션 청바지를 구경해보세요',
    src: '',
  },
  {
    id: '2',
    img: 'https://react-shop-oinochoe.vercel.app/img_shop_digital.jpeg',
    mainTit: '신속한 업무처리',
    subTit: '다양한 디지털 상품을 만나보세요',
    src: '',
  },
  {
    id: '3',
    img: 'https://react-shop-oinochoe.vercel.app/img_shop_grocery.jpeg',
    mainTit: '신선한 식품!',
    subTit: '농장 직배송으로 더욱 신선한 식료품을 만나보세요',
    src: '',
  },
]
