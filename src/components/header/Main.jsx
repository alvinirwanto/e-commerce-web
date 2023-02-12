import Link from 'next/link'
import { RiSearch2Line, RiShoppingCartLine } from 'react-icons/ri'

import styles from './header.module.scss'
import { useSelector } from 'react-redux'


export default function Main() {

    const { cart } = useSelector((state) => ({ ...state }))
    console.log(cart)

    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <Link href="/">
                    <div className={styles.logo}>
                        <img
                            src='/logo.png'
                        />
                    </div>
                </Link>

                <div className={styles.search}>
                    <input type="text" placeholder='Search ...' />
                    <div className={styles.search__icon}>
                        <RiSearch2Line />
                    </div>
                </div>

                <Link href="/">
                    <div className={styles.cart}>
                        <RiShoppingCartLine />
                        <span>
                            {cart.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
