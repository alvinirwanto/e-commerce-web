import styles from './footer.module.scss'

import { IoLogoTiktok } from 'react-icons/io5'
import { RiInstagramFill, RiFacebookBoxFill, RiTwitterFill, RiYoutubeFill, RiPinterestFill, RiSnapchatFill } from 'react-icons/ri'

export default function Socials() {
    return (
        <div className={styles.footer__socials}>
            <section>
                <h3>Stay Connected</h3>
                <ul>
                    <li>
                        <a href="/" target='_blank'>
                            <RiInstagramFill />
                        </a>
                    </li>
                    <li>
                        <a href="/" target='_blank'>
                            <RiFacebookBoxFill />
                        </a>
                    </li>
                    <li>
                        <a href="/" target='_blank'>
                            <RiTwitterFill />
                        </a>
                    </li>
                    <li>
                        <a href="/" target='_blank'>
                            <RiYoutubeFill />
                        </a>
                    </li>
                    <li>
                        <a href="/" target='_blank'>
                            <RiPinterestFill />
                        </a>
                    </li>
                    <li>
                        <a href="/" target='_blank'>
                            <RiSnapchatFill />
                        </a>
                    </li>
                    <li>
                        <a href="/" target='_blank'>
                            <IoLogoTiktok />
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}