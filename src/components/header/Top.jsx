import { RiCustomerServiceLine, RiQuestionLine, RiHeart3Line, RiShieldLine } from 'react-icons/ri'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const Top = ({ country }) => {
    const { data: session } = useSession()
    const [visible, setVisible] = useState(false)

    return (
        <div className='bg-secondary-grey relative'>
            <div className='max-w-[95%] m-auto p-[5px] flex justify-end items-center'>

                <ul className='flex gap-4'>
                    <li className='header__top-item'>
                        <img
                            className='w-[20px] h-[20px] rounded-full border-[1.5px] border-[#CCC]'
                            src={country.flag}
                            alt='Bendera'
                        />
                        <span>{country.name} / Rp</span>
                    </li>

                    <li className='header__top-item'>
                        <RiShieldLine />
                        <span>Buyer Protection</span>
                    </li>
                    <li className='header__top-item'>
                        <RiCustomerServiceLine />
                        <span>Customer Service</span>
                    </li>
                    <li className='header__top-item'>
                        <RiQuestionLine />
                        <span>Help</span>
                    </li>
                    {/* <li className='header__top-item'>
                        <RiHeart3Line />
                        <Link href="/profile/wistlist">
                            <span>Wistlist</span>
                        </Link>
                    </li> */}

                    {/* <ul className='header__top-item'
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {
                            session ? (
                                <li className={styles.li}>
                                    <div className={styles.flex}>
                                        <img src={session.user.image} alt="profile" />
                                        <span>{session.user.name}</span>
                                        <RiArrowDropDownFill />
                                    </div>
                                </li>
                            ) : (
                                <li className={styles.li}>
                                    <div className={styles.flex}>
                                        <RiAccountPinCircleLine />
                                        <span>Account</span>
                                        <RiArrowDropDownFill />
                                    </div>
                                </li>
                            )
                        }

                        {
                            visible && <UserMenu session={session} />
                        }
                    </ul> */}
                </ul>
            </div>
        </div>
    )
}

export default Top
