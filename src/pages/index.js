import Head from 'next/head'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import axios from 'axios'

import { useSession, signIn, signOut } from "next-auth/react"

// const inter = Inter({ subsets: ['latin'] })
// const roboto = Roboto({
//     weight: '400',
//     subsets: ['latin'],
// })

// MongoDB ==> utils, api
// Redux =>  

export default function Home({ country }) {
    const { data: session } = useSession()
    console.log(session)
    return (
        <>
            <Head>
                <title>Alvin & Co</title>
                <meta name="description" content="Alvin & Co shopping services for all of your needs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header country={country} />
            {
                session ? "You are logged in" : "you are not"
            }
            <Footer country={country} />
        </>
    )
}

export async function getServerSideProps() {
    let data = await axios
        .get('https://api.ipregistry.co/?key=pnr5zpg9h6vz5yg3')
        .then((res) => {
            return res.data.location.country
        })
        .catch((err) => {
            console.log(err)
        })
    return {
        props: {
            country: {
                // Real API
                // name: data.name,
                // flag: data.flag.emojitwo
                name: "Indonesia",
                flag: 'https://img.freepik.com/free-vector/illustration-indonesia-flag_53876-27131.jpg?w=360'
            }
        }
    }
}

// Notes:
// - @reduxjs/toolkit : is the modern way of doing redux
// - redux-wrapper : to wrap all of the application with the store
// - redux-thunk : to allow async function
// - redux-persist : to store the information even the page was refresh (it is still can access the store and see the information)
