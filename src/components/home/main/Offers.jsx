import React, { useRef, useState } from "react";
import { offersArray } from "@/data/home"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function Offers() {

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
            if (realSlide < offersArray.length) swiper?.current?.slideNext()
        },
        [swiper, realSlide]
    )

    return (
        <div className="grid grid-cols-[1fr_4fr] gap-5">

            <div className="rounded-md shadow-md w-full">
                <img src="/images/flash.webp" alt="" className="object-cover rounded-md w-full h-full" />
            </div>

            <Swiper
                slidesPerView={5}
                // centeredSlides={true}
                spaceBetween={15}
                grabCursor={true}
                // navigation={true}
                modules={[Pagination]}
                onSlideChange={(s) => setRealSlide(s.realIndex)}
                onSwiper={(s) => {
                    swiper.current = s
                }}
                className="mySwiper w-full !mr-0 group"
            >
                {/* {[...Array(10).keys()].map((i) => (
                    <SwiperSlide>
                        <img src={`../../../images/swiper/${i + 1}.jpg`} alt="image" className="object-cover w-[full] h-[15rem] rounded-lg" />
                    </SwiperSlide>
                ))} */}
                {
                    offersArray.map((offer, i) => (
                        <SwiperSlide key={i} className='!w-[12rem] py-4' >
                            <div className="flex flex-col shadow-md rounded-xl py-5 px-2">
                                <img src={offer.image} alt="image" className="object-cover h-[11rem] rounded-lg" />
                                <span className="text-base font-semibold mt-2">${offer.price}</span>
                                <div className="flex gap-2 items-center">
                                    <span className="text-xs font-medium bg-error-soft p-1 text-error-color rounded-md">{offer.discount}%</span>
                                    <span className="text-xs font-medium line-through">${offer.priceBefore}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
                <div className={`group-hover:opacity-100 group-hover:duration-300 opacity-0 flex ${realSlide === 0 ? 'justify-end' : 'justify-between'} w-full gap-2 absolute top-[40%] z-50`}>
                    <button
                        onClick={fnPrev}
                        className={`bg-white p-2 rounded-full shadow-lg ml-4 ${realSlide === 0 ? 'hidden' : 'text-gray-800'}`}
                    >
                        <RiArrowLeftSLine className='text-3xl' />
                    </button>

                    <button
                        onClick={fnNext}
                        className={`bg-white p-2 rounded-full shadow-lg mr-2 ${realSlide === offersArray.length - 1 ? 'hidden' : 'text-gray-800'}`}
                    >
                        <RiArrowRightSLine className='text-3xl' />
                    </button>
                </div>
            </Swiper>

        </div>
    );
}
