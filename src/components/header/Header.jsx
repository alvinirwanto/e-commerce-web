import Main from './Main'
import Ad from './Ad'
import styles from './header.module.scss'
import Top from './Top'

const Header = () => {
    return (
        <div className={styles.anjay}>
            <Ad />
            <Top />
            <Main />
        </div>
    )
}

export default Header