import styles from './footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function Links() {
    return (
        <div className={styles.footer__links}>
            {
                links.map((link, i) => (
                    <ul>
                        {
                            i === 0
                                ? <Image
                                    src="/logo.png"
                                    width={500}
                                    height={500}
                                    alt='logo'
                                />
                                : <b>{link.heading}</b>
                        }
                        {
                            link.links.map((link) => (
                                <li>
                                    <Link href={link.link}>{link.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                ))
            }
        </div>
    )
}

const links = [
    {
        heading: "Alvin&Co",
        links: [
            {
                name: "About us",
                link: "",
            },
            {
                name: "Contact us",
                link: "",
            },
            {
                name: "Social Responsibility",
                link: "",
            },
            {
                name: "",
                link: "",
            },
        ],
    },
    {
        heading: "Help & Support",
        links: [
            {
                name: "Shipping Info",
                link: "",
            },
            {
                name: "Returns",
                link: "",
            },
            {
                name: "How To Order",
                link: "",
            },
            {
                name: "How To Track",
                link: "",
            },
            {
                name: "Size Guide",
                link: "",
            },
        ],
    },
    {
        heading: "Customer service",
        links: [
            {
                name: "Customer service",
                link: "",
            },
            {
                name: "Terms and Conditions",
                link: "",
            },
            {
                name: "Consumers (Transactions)",
                link: "",
            },
            {
                name: "Take our feedback survey",
                link: "",
            },
        ],
    },
];
