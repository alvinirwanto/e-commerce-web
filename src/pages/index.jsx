import Head from 'next/head'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import axios from 'axios'

import { useSession, signIn, signOut } from "next-auth/react"
import MainHome from '@/components/home/main/Main'
import FlashDeals from '@/components/home/flashdeals/Flashdeals'
import db from '@/utils/db'
import Product from '@/models/Product'
import ProductCard from '@/components/product/ProductCard'

// const inter = Inter({ subsets: ['latin'] })
// const roboto = Roboto({
//     weight: '400',
//     subsets: ['latin'],
// })

// MongoDB ==> utils, api
// Redux =>  

export default function Home({ country, products }) {
    const { data: session } = useSession()
    // console.log(session)
    console.log(products)

    return (
        <>
            <Head>
                <title>Alvin & Co</title>
                <meta name="description" content="Alvin & Co shopping services for all of your needs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header country={country} />
            <div className='min-h-screen'>
                <div className='container flex flex-col gap-9'>
                    <MainHome />
                    <FlashDeals />

                    <div className='products flex justify-center gap-2'>
                        {
                            products.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer country={country} />
        </>
    )
}

export async function getServerSideProps() {
    db.connectDb()
    let products = await Product.find().sort({ createdAt: -1 }).lean()
    console.log(products)

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
            products: JSON.parse(JSON.stringify(products)),
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
