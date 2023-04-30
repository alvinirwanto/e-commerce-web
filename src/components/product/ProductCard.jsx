import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductSwiper from './ProductSwiper'

export default function ProductCard({ product }) {
    const [active, setActive] = useState(0)
    const [images, setImages] = useState(product.subProducts[active]?.images)
    const [prices, setPrices] = useState(
        product.subProducts[active]?.sizes.map((s) => {
            return s.price
        })).sort((a, b) => {
            return a - b
        })

    const [styless, setStyless] = useState(
        product.subProducts.map((p) => {
            return p.color
        }))

    useEffect(() => {
        setImages(product.subProducts[active].images)

        setPrices(
            product.subProducts[active]?.sizes.map((s) => {
                return s.price
            })
                .sort((a, b) => {
                    return a - b
                })
        )
    }, [active])


    return (
        <div className='product w-[10rem] h-[20rem]'>
            <div className='product_container'>
                <Link href={`/product/${product.slug}?style=${active}`}>
                    <div>
                        <ProductSwiper images={images} />
                    </div>
                </Link>
                {
                    product.subProducts[active].discount && (
                        <div className="discount">
                            {
                                product.subProducts[active].discount
                            }
                        </div>
                    )
                }

                <div className="product__infos1">
                    <span>
                        {
                            product.name.length > 45
                                ? `${product.name.substring(0, 45)} ...`
                                : product.name
                        }
                    </span>

                    <span>
                        {
                            prices.length === 1
                                ? `USD ${prices[0]}`
                                : `USD ${prices[0] - prices[prices.length - 1]}$`
                        }
                    </span>

                    <div className='product__colors'>
                        {
                            styless && styless.map((style, i) => (
                                style.image
                                    ? <img
                                        src={style.image}
                                        className={
                                            i === active && styles.active
                                        }
                                    />
                                    : (
                                        <span
                                            style={{ backgroundColor: `${style.color}` }}
                                            onMouseOver={() => {
                                                setImages(product.subProducts[i].images)
                                                setActive(i)
                                            }}
                                        >

                                        </span>
                                    )
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
