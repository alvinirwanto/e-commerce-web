import Main from './Main'
import Ad from './Ad'
import styles from './header.module.scss'
import Top from './Top'

const Header = ({ country }) => {
    return (
        <div className={styles.anjay}>
            <Ad />
            <Top country={country} />
            <Main />
        </div>
    )
}

export default Header