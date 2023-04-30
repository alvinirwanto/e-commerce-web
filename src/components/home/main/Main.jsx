import Testimonial from '@/components/testimonials/Testimonial'
import React from 'react'
import MainSwiper from './MainSwiper'
import Offers from './Offers'

export default function MainHome() {
    return (
        <div className='flex flex-col gap-8'>
            <MainSwiper />
            <Offers />
            {/* <Testimonial /> */}
            {/* <div className='row-span-3 h-[31rem] bg-red-400 shadow-md rounded-md'>menu</div>
            <div className='col-span-2 h-[4rem] shadow-md rounded-md'>header</div>
            <div className='row-span-2 shadow-md rounded-md'>user</div>
            <div className='shadow-md rounded-md h-[10rem]'>offers</div> */}
        </div>
    )
}
