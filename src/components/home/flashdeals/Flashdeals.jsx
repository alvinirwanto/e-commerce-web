import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, EffectCreative } from "swiper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import { RiFlashlightLine } from 'react-icons/ri'
import { flashDealsArray } from "@/data/home";
import Countdown from "./Countdown";

export default function FlashDeals() {
    const [realSlide, setRealSlide] = useState(0)
    const swiper = useRef()

    const fnPrev = React.useCallback(
        () => {
            // Optional Chaining
            if (realSlide > 0) swiper?.current?.slidePrev()
        },
        [swiper, realSlide]
    )

    const fnNext = React.useCallback(
        () => {
            if (realSlide < flashDealsArray.length) swiper?.current?.slideNext()
        },
        [swiper, realSlide]
    )

    return (
        <div className="flex flex-col gap-3">
            <div className='flex justify-between items-center bg-soft-blue rounded-md px-4 py-3'>
                <div className='flex items-center text-secondary-blue gap-2 font-semibold text-2xl'>
                    <span>Flash Deals</span>
                    <RiFlashlightLine />
                </div>

                <Countdown date={new Date(2023, 4, 12, 14, 50)} />
            </div>

            {/* Slide */}
            <div className="w-full h-full relative group">
                <Swiper
                    slidesPerView={6}
                    spaceBetween={15}
                    slidesPerGroupSkip={6}
                    grabCursor={true}
                    onSlideChange={(s) => setRealSlide(s.realIndex)}
                    onSwiper={(s) => {
                        swiper.current = s
                    }}
                    className='w-full h-full'
                >
                    {
                        flashDealsArray.map((product, i) => (
                            <SwiperSlide key={i} className='w-[95%] !h-[18rem] my-2 rounded-md shadow-md overflow-clip'>
                                <img src={product.image} alt="image" className="object-cover w-full !h-[50%]" />
                                <div className="flex flex-col p-2">
                                    <div className="inline-flex w-min items-center text-success-color text-sm gap-2 bg-success-soft rounded-sm px-1">
                                        <span>Hemat</span>
                                        <span>${(product.price - (product.price - (product.price / product.discount))).toFixed(2)}</span>
                                    </div>
                                    <span className="text-lg font-semibold mt-2">${(product.price - (product.price / product.discount)).toFixed(2)}</span>
                                    <div className="flex gap-2 items-center">
                                        <span className="text-sm font-medium bg-red-discount-light p-1 text-red-discount rounded-md">{product.discount}%</span>
                                        <span className="text-sm text-primary-grey font-medium line-through">${product.price}</span>
                                    </div>
                                    <div className="w-full h-full rounded-md mt-2">
                                        <div className="bg-background-grey w-full rounded-md flex justify-start items-center h-1.5">
                                            <div style={{ width: `${product.sold}%` }} className={`bg-red-discount rounded-md h-1.5`} />
                                        </div>
                                        <span className="text-[12px] text-red-discount">Sold {product.sold}%</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

                <div className={`hidden xl:block z-50 w-full gap-2`}>
                    <button
                        onClick={fnPrev}
                        className={`group-hover:opacity-100 group-hover:duration-300 opacity-0 bg-white p-3 rounded-full shadow-lg -ml-[2rem] absolute top-[40%] left-0 z-50 ${realSlide === 0 ? 'hidden' : 'text-gray-800'}`}
                    >
                        <RiArrowLeftSLine className='text-3xl' />
                    </button>

                    <button
                        onClick={fnNext}
                        className={`group-hover:opacity-100 group-hover:duration-300 opacity-0 bg-white p-3 rounded-full shadow-lg -mr-[2rem] absolute top-[40%] right-0 z-50 ${realSlide === 1 ? 'hidden' : 'text-gray-800'}`}
                    >
                        <RiArrowRightSLine className='text-3xl' />
                    </button>
                </div>
            </div>
        </div>
    )
}
