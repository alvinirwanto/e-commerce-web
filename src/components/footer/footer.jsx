import Copyright from './Copyright'
import styles from './footer.module.scss'
import Links from './Links'
import NewsLetter from './NewsLetter'
import Payment from './Payment'
import Socials from './Socials'

export default function Footer({ country }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <Links />
                <Socials />
                <NewsLetter />
                <Payment />
                <Copyright country={country} />
            </div>
        </footer>
    )
}
