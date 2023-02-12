import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Roboto } from '@next/font/google'

import styles from '@/styles/Home.module.scss'
import Header from '@/components/header/Header'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

// MongoDB ==> utils, api
// Redux =>  

export default function Home() {
    return (
        <div className={roboto.className}>
            <Head>
                <title>Alvin & Co</title>
                <meta name="description" content="Alvin & Co shopping services for all of your needs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className={`${roboto.className} ${styles.red}`}>
            </main>
        </div>
    )
}

// Notes:
// - @reduxjs/toolkit : is the modern way of doing redux
// - redux-wrapper : to wrap all of the application with the store
// - redux-thunk : to allow async function
// - redux-persist : to store the information even the page was refresh (it is still can access the store and see the information)
