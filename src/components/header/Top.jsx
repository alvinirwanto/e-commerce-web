import Image from 'next/image'
import styles from './header.module.scss'
import { BsShieldShaded } from 'react-icons/bs'
import { BsSuitHeart } from 'react-icons/bs'
import { RiAccountPinCircleLine, RiArrowDropDownFill, RiCustomerServiceLine, RiQuestionLine, RiHeart3Line, RiShieldLine } from 'react-icons/ri'
import Link from 'next/link'
import { useState } from 'react'
import UserMenu from './UserMenu'
import { useSession } from 'next-auth/react'

const Top = ({ country }) => {
    const { data: session } = useSession()
    const [visible, setVisible] = useState(false)

    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        <img
                            src={country.flag}
                            alt='Bendera'
                        />
                        <span>{country.name} / Rp</span>
                    </li>
                    <li className={styles.li}>
                        <RiShieldLine />
                        <span>Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <RiCustomerServiceLine />
                        <span>Customer Service</span>
                    </li>
                    <li className={styles.li}>
                        <RiQuestionLine />
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <RiHeart3Line />
                        <Link href="/profile/wistlist">
                            <span>Wistlist</span>
                        </Link>
                    </li>
                    <ul className={styles.li}
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
                    </ul>
                </ul>
            </div>
        </div>
    )
}

export default Top
