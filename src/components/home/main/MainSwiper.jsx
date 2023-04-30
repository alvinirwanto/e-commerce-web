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

const items = [
    {
        id: 1,
        image: '1.jpg'
    },
    {
        id: 2,
        image: '2.jpg'
    },
    {
        id: 3,
        image: '3.jpg'
    },
    {
        id: 4,
        image: '4.jpg'
    },
    {
        id: 5,
        image: '5.jpg'
    },
    {
        id: 6,
        image: '6.jpg'
    },
    {
        id: 7,
        image: '7.jpg'
    },
    {
        id: 8,
        image: '8.jpg'
    },
    {
        id: 9,
        image: '9.jpg'
    },
    {
        id: 10,
        image: '10.jpg'
    },
]

export default function MainSwiper() {
    const [realSlide, setRealSlide] = useState(0)
    const swiper = useRef()

    const fnPrev = React.useCallback(
        () => {
            // Optional Chaining
            if (realSlide < items.length) swiper?.current?.slidePrev()
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
        <div className="w-full h-[11rem] xl:h-[21rem] relative group">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                effect={"creative"}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ["-120%", 0, -500],
                    },
                    next: {
                        shadow: true,
                        translate: ["120%", 0, -500],
                    },
                }}
                onSlideChange={(s) => setRealSlide(s.realIndex)}
                onSwiper={(s) => {
                    swiper.current = s
                }}
                modules={[EffectCreative, Autoplay]}
                className="w-full h-full object-cover"
            >
                {/* {[...Array(10).keys()].map((i) => (
                    <SwiperSlide>
                        <img src={`../../../images/swiper/${i + 1}.jpg`} alt="image" className="object-cover w-full h-full rounded-lg" />
                    </SwiperSlide>
                ))} */}
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <img src={`../../images/swiper/${item.image}`} alt="image" className="object-cover w-full h-full rounded-lg" />
                        </SwiperSlide>
                    ))
                }

            </Swiper>

            <ul className="flex justify-center items-center py-3 px-5 gap-2 z-50 md:absolute bottom-0">
                {
                    items.map((item, i) => {
                        return (
                            <li
                                key={item.id}
                                className={['h-1.5 rounded-full', i === realSlide ? 'bg-secondary-blue xl:bg-white w-[50px]' : 'bg-gray-300 w-1.5'].join(" ")}
                                onClick={() => i !== realSlide && swiper?.current?.slideTo(i)}
                            >

                            </li>
                        )
                    })
                }
            </ul>

            <div className="hidden group-hover:opacity-100 group-hover:duration-300 opacity-0 xl:flex justify-between w-full gap-2 absolute top-[50%] z-50">
                <button
                    onClick={fnPrev}
                    className={`bg-white p-3 rounded-full shadow-lg -ml-[2rem] ${realSlide === 0 ? '' : 'text-gray-800'}`}
                >
                    <RiArrowLeftSLine className='text-3xl' />
                </button>

                <button
                    onClick={fnNext}
                    className={`bg-white p-3 rounded-full shadow-lg -mr-[2rem] ${realSlide === items.length - 1 ? '' : 'text-gray-800'}`}
                >
                    <RiArrowRightSLine className='text-3xl' />
                </button>
            </div>
        </div>
    );
}