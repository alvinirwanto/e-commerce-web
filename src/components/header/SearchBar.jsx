import Link from 'next/link'
import { RiArrowDropDownFill, RiSearch2Line, RiShoppingCartFill } from 'react-icons/ri'
import {
    GiLargeDress,
    GiClothes,
    GiHomeGarage,
    Gi3DHammer,
    GiWatch,
    GiBallerinaShoes,
    GiBabyBottle,
    GiHeadphones,
    GiHealthCapsule,
    GiSportMedal,
    GiBigDiamondRing,
    GiTv,
    GiGamepad,
    GiVibratingSmartphone,
    GiVintageRobot,
    GiPresent,
    GiArrowsShield
} from "react-icons/gi";

import { useSelector } from 'react-redux'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { menuArray } from '@/data/home'


export default function SearchBar() {
    const { data: session } = useSession()

    const { cart } = useSelector((state) => ({ ...state }))

    return (
        <>
            {/* <div className='bg-light-black fixed inset-0 z-[20]' /> */}

            <div className='flex items-center w-[95%] py-2 m-auto'>
                <div className='grid grid-cols-[3.5fr_1fr] place-items-center gap-8 w-full'>

                    <div className="grid grid-cols-[1fr_1fr_5fr] place-items-stretch w-full">
                        <Link href="/">
                            <div className=''>
                                <img
                                    src='/logo.svg'
                                    className='h-[2.5rem]'
                                />
                            </div>
                        </Link>

                        <div className='flex justify-center items-center group relative'>
                            <button className="w-full text-base bg-transparent rounded-lg md:w-auto md:inline md:mt-0 focus:outline-none font-semibold">
                                <span className='font-medium text-primary-grey cursor-pointer'>Category</span>
                            </button>

                            <div className="absolute top-10 left-12 z-50 hidden bg-grey-200 group-hover:block">
                                <div className="w-[25rem] bg-white shadow-lg text-primary-grey rounded-md">
                                    <div className="flex flex-col">
                                        {
                                            menuArray.map((menu, i) => (
                                                <Link href={menu.link} key={i} className='px-4 py-2 hover:text-secondary-blue flex gap-3 items-center' >
                                                    <div className='text-2xl'>
                                                        {i == 0 ? (
                                                            <GiLargeDress />
                                                        ) : i == 1 ? (
                                                            <GiClothes />
                                                        ) : i == 2 ? (
                                                            <GiHeadphones />
                                                        ) : i == 3 ? (
                                                            <GiWatch />
                                                        ) : i == 4 ? (
                                                            <GiHomeGarage />
                                                        ) : i == 5 ? (
                                                            <GiHealthCapsule />
                                                        ) : i == 6 ? (
                                                            <GiBallerinaShoes />
                                                        ) : i == 7 ? (
                                                            <GiBigDiamondRing />
                                                        ) : i == 8 ? (
                                                            <GiSportMedal />
                                                        ) : i == 9 ? (
                                                            <GiBabyBottle />
                                                        ) : i == 10 ? (
                                                            <GiTv />
                                                        ) : i == 11 ? (
                                                            <GiGamepad />
                                                        ) : i == 12 ? (
                                                            <GiVibratingSmartphone />
                                                        ) : i == 13 ? (
                                                            <GiVintageRobot />
                                                        ) : i == 14 ? (
                                                            <GiPresent />
                                                        ) : i == 15 ? (
                                                            <Gi3DHammer />
                                                        ) : i == 16 ? (
                                                            <GiArrowsShield />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <span>{menu.name}</span>
                                                </Link>
                                            ))
                                        }
                                        {/* <a href='/pegawai/rasio-dosen' className='hover:bg-gray-100 py-3 px-4'>Rasio Dosen</a>
                                        <a href='/pegawai/presensi' className='hover:bg-gray-100 py-3 px-4'>Presensi</a>
                                        <a href='/pegawai/data-pegawai' className='hover:bg-gray-100 py-3 px-4'>Data Pegawai</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center h-[40px] rounded border-2 group group-focus-within:border-secondary-blue'>
                            <input type="text" placeholder='Search ...' className='border-none outline-none w-full h-full bg-transparent pl-4 color-primary-blue' />
                            <div className='w-[3rem] h-8 grid place-items-center mx-1 bg-secondary-blue rounded cursor-pointer shadow'>
                                <RiSearch2Line className='w-8 h-8 text-white shadow-xl text-xl p-1' />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center items-center gap-9 w-full'>

                        <Link href="/" className='relative grid place-items-center'>
                            <RiShoppingCartFill className='w-7 h-7 text-primary-blue cursor-pointer hover:text-secondary-blue' />
                            <span className='absolute top-[-5px] right-[-10px] grid place-items-center bg-secondary-blue w-5 h-5 rounded-full text-center text-sm font-semibold text-white shadow'>
                                {cart.length}
                            </span>
                        </Link>

                        <div className='border-[1px] border-secondary-blue h-6' />

                        <div className='flex gap-1'>
                            {
                                session ? (
                                    <>
                                        <div></div>

                                        <div className='flex items-center gap-[3rem]'>
                                            <div className="hidden md:block relative group">
                                                <button className="w-full text-base bg-transparent rounded-lg md:w-auto md:inline md:mt-0 focus:outline-none font-semibold">
                                                    <div className='flex gap-2 justify-center items-center'>
                                                        <img src={session.user.image} className='h-9 w-9 rounded-full object-cover border-[1px]' alt="profile" />
                                                        {/* <span className='text-xs'>{session.user.name}</span> */}
                                                        <RiArrowDropDownFill className='text-3xl' />
                                                    </div>
                                                </button>

                                                <div className="absolute right-0 z-10 hidden bg-grey-200 group-hover:block">
                                                    <div className="bg-white shadow-md p-4 w-[20rem]">
                                                        <div className="flex flex-col">
                                                            <div className='flex justify-start items-center gap-4 border-2 p-2 rounded-md'>
                                                                <img src={session.user.image}
                                                                    alt="profile image"
                                                                    className='h-[3.5rem] w-[3.5rem] rounded-full border-[1px] object-cover p-0'
                                                                />
                                                                <div className='flex flex-col'>
                                                                    <div className='text-lg'>Hello, <span className='font-bold'>{(session.user.name).split(' ')[0]}</span></div>
                                                                    <span className='text-primary-grey text-xs'>{session.user.email}</span>
                                                                </div>
                                                            </div>
                                                            <ul className='mt-2 text-sm'>
                                                                <li className='py-1 pl-2 hover:bg-secondary-grey cursor-pointer'>
                                                                    <Link href='/profile'>Account</Link>
                                                                </li>
                                                                <li className='py-1 pl-2 hover:bg-secondary-grey cursor-pointer'>
                                                                    <Link href='/profile/orders'>My Orders</Link>
                                                                </li>
                                                                <li className='py-1 pl-2 hover:bg-secondary-grey cursor-pointer'>
                                                                    <Link href='/profile/messages'>Message Center</Link>
                                                                </li>
                                                                <li className='py-1 pl-2 hover:bg-secondary-grey cursor-pointer'>
                                                                    <Link href='/profile/address'>Address</Link>
                                                                </li>
                                                                <li className='py-1 pl-2 hover:bg-secondary-grey cursor-pointer'>
                                                                    <Link href='/profile/wistlist'>Wistlist</Link>
                                                                </li>
                                                                <li className='py-1 pl-2 hover:bg-secondary-grey cursor-pointer'>
                                                                    <span className='text-error-color' onClick={() => signOut()}>Sign Out</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                )
                                    :
                                    (
                                        <>
                                            <button
                                                className='btn_outline'
                                                onClick={() => signIn()}
                                            >
                                                Login
                                            </button>

                                            <button
                                                className='btn_primary'>
                                                Register
                                            </button>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
