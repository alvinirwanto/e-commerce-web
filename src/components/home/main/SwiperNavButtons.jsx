import React from 'react'
import { useSwiper } from 'swiper/react'

export default function SwiperNavButtons() {
    const swiper = useSwiper()
  return (
    <div className='w-full h-full flex justify-between items-center absolute top-0 z-[50]'>
        <button className='bg-black text-white' onClick={() => swiper.slidePrev()}>Prev</button>
        <button className='bg-black text-white' onClick={() => swiper.slideNext()}>Next</button>
    </div>
  )
}
