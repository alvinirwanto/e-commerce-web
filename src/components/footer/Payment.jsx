import styles from './footer.module.scss'
import Image from 'next/image'

import VisaImg from '../../../public/images/payment/visa.webp'
import MastercardImg from '../../../public/images/payment/mastercard.webp'
import PaypalImg from '../../../public/images/payment/paypal.webp'

export default function Payment() {
    return (
        <div className={styles.footer__payment}>
            <h3>We Accept</h3>
            <div className={styles.footer__flexwrap}>
                <Image
                    src={VisaImg}
                    alt='payment'
                />
                <Image
                    src={MastercardImg}
                    alt='payment'
                />
                <Image
                    src={PaypalImg}
                    alt='payment'
                />
            </div>
        </div>
    )
}
