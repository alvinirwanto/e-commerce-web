import Link from 'next/link'
import Image from 'next/image'
import Ads from '../../../public/images/ad.jpg'

const Ad = () => {
    return (
        <Link href='https://google.com'>
            <div className='object-contain bg-no-repeat bg-center bg-[#4B53B6] flex justify-center relative'>
                <Image
                    src={Ads}
                    className='h-[30px] w-auto'
                />
            </div>
        </Link>
    )
}

export default Ad