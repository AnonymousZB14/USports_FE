import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const SwiperWrap = ({ CarouselData }: { CarouselData: string[] }) => {
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
      {CarouselData.map((carouselItem, idx) => (
        <SwiperSlide key={idx}>
          <img src={carouselItem} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperWrap
