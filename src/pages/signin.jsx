import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import styles from '../styles/signin.module.scss'

import { BiLeftArrowAlt } from 'react-icons/bi'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import LoginInput from '@/components/inputs/loginInput/loginInput'

export default function signin() {
    return (
        <>
            <Header country="Indonesia" />
            <div className={styles.login}>
                <div className={styles.login__container}>
                    <div className={styles.login__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>

                        <span>
                            We'd be happy to join us!

                            <Link href='/'>
                                Go Store
                            </Link>
                        </span>
                    </div>

                    <div className={styles.login__form}>
                        <h1>Sign In</h1>
                        <p>Get access to one of the best E-commerce services in the world</p>

                        <Formik>
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput />
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer country="Indonesia" />
        </>
    )
}


