import React, { useState, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Image from 'next/image'
import { A11y, Autoplay, EffectCreative, Navigation, Pagination, Scrollbar } from 'swiper'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

const items = [
    {
        id: '1',
        desc: '"On the windows talking painted pasture yet its express paties use. Sure last upon he same as knew next"',
        image: 'daniel-lincoln.jpg',
        author: 'Mike Taylor',
        role: 'Lahore, Pakistan'
    },
    {
        id: '2',
        desc: '"On the windows talking painted pasture yet its express paties use. Sure last upon he same as knew next"',
        image: 'daniel-lincoln.jpg',
        author: 'Anya Taylor',
        role: 'Wonogiri, Indonesia'
    },
    {
        id: '3',
        desc: '"On the windows talking painted pasture yet its express paties use. Sure last upon he same as knew next"',
        image: 'daniel-lincoln.jpg',
        author: 'Mike Tyson',
        role: 'Jeddah, Saudi Arabia'
    }
]

export default function Testimonial() {
    const [realSlide, setRealSlide] = useState(0)
    const swiper = useRef()

    // useCallback => hanya di gunakan jika ada perubahan di function realSlide
    const fnPrev = React.useCallback(
        () => {
            // Optional Chaining
            if (realSlide > 0) swiper?.current?.slidePrev()
        },
        [swiper, realSlide]
    )

    const fnNext = React.useCallback(
        () => {
            if (realSlide < items.length) swiper?.current?.slideNext()
        },
        [swiper, realSlide]
    )

    return (
        <section>
            <div className="max-w-7xl mx-auto relative px-4">
                <div className="flex">
                    <div className="w-6/12 pl-8 pr-20">
                        <div className="flex flex-col mb-16">
                            <h3 className="uppercase text-lg mb-2 text-gray-500">
                                Testimonials
                            </h3>
                            <h3 className="font-serif text-5xl text-gray-900 leading-snug mb-10">
                                What people say about us.
                            </h3>

                            <ul className="flex gap-x-6">
                                {
                                    items.map((item, i) => {
                                        return (
                                            <li
                                                key={item.id}
                                                className={['w-2 h-2 rounded-full', i === realSlide ? 'bg-gray-800 w-[50px]' : 'bg-gray-300'].join(" ")}
                                                onClick={() => i !== realSlide && swiper?.current?.slideTo(i)}
                                            >

                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    
                    <div className="w-6/12 flex items-center justify-center relative">
                        <div className="absolute -inset-10 -top-20">
                            <Swiper
                                modules={[
                                    Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCreative
                                ]}
                                spaceBetween={50}
                                slidesPerView={1}
                                effect='creative'
                                creativeEffect={{
                                    prev: {
                                        translate: [60, 70, 0]
                                    },
                                    next: {
                                        translate: ['-100%', '-100%', 0]
                                    }
                                }}
                                simulateTouch={false}
                                // loop={true}
                                // autoplay={{
                                //     delay: 3500,
                                //     disableOnInteraction: false,
                                // }}
                                onSlideChange={(s) => setRealSlide(s.realIndex)}
                                onSwiper={(s) => {
                                    swiper.current = s
                                }}
                            >
                                {
                                    items.map((item) => {
                                        return (
                                            <SwiperSlide key={item.id}>
                                                <div className="relative px-32 pt-20 pb-48">
                                                    <div className="relative">
                                                        <div className="bg-white shadow-xl rounded-xl p-6 relative z-20">
                                                            <span className="w-12 h-12 absolute -top-10 left-0 overflow-hidden transform -translate-x-1/2 translate-y-1/2 rounded-full flex-none mr-3">
                                                                <Image
                                                                    className='object-cover'
                                                                    width={500}
                                                                    height={500}
                                                                    src={`/images/profile/${item.image}`}
                                                                />
                                                            </span>

                                                            <p className="text-gray-500 mb-8">
                                                                {item.desc}
                                                            </p>
                                                            <h6 className='text-gray-900 text-lg'>
                                                                {item.author}
                                                            </h6>
                                                            <h6 className='text-gray-500 text-sm'>
                                                                {item.role}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className='w-1/12 items-center justify-end flex'>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={fnPrev}
                                className={[
                                    realSlide === 0 ? 'text-gray-300' : 'text-gray-800',
                                ].join(" ")}
                            >
                                <RiArrowUpSLine className='mr-2 text-3xl' />
                            </button>

                            <button
                                onClick={fnNext}
                                className={[
                                    realSlide === items.length - 1 ? 'text-gray-300' : 'text-gray-800'
                                ].join(" ")}
                            >
                                <RiArrowDownSLine className='mr-2 text-3xl' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
