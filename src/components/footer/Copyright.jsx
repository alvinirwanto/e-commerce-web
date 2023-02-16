import Link from 'next/link';
import { RiMapPinLine } from 'react-icons/ri';
import styles from './footer.module.scss'

export default function Copyright({ country }) {
    return (
        <div className={styles.footer__copyright}>
            <section>
                © {new Date().getFullYear()} Alvin & Co All Rights Reserved
            </section>

            <section>
                <ul>
                    {
                        data.map((link, i) => (
                            <li key={i}>
                                <Link href={link.link}>
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }

                    <li>
                        <Link href="">
                            <RiMapPinLine />
                            {country.name}
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    )
}

const data = [
    {
        name: "Privacy Center",
        link: "",
    },
    {
        name: "Privacy & Cookie Policy",
        link: "",
    },
    {
        name: "Manage Cookies",
        link: "",
    },
    {
        name: "Terms & Conditions",
        link: "",
    },
    {
        name: "Copyright Notice",
        link: "",
    },
];