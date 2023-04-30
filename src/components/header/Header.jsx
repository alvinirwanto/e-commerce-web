import Ad from './Ad'
import Top from './Top'
import SearchBar from './SearchBar'
import { useEffect, useState } from 'react'

const Header = ({ country }) => {
    
    // Add shadow to the navbar when scroll
    const [shadowNav, setShadowNav] = useState(false)

    const addShadowNav = () => {
        window.scrollY >= 60 ? setShadowNav(true) : setShadowNav(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', addShadowNav)
        return () => window.removeEventListener('scroll', addShadowNav);
    })

    return (
        <div className={`w-full bg-white z-[200] sticky top-0 ${shadowNav ? 'shadow-md' : 'shadow-none'}`}>
            {/* <Ad /> */}
            <Top country={country} />
            <SearchBar />
        </div>
    )
}

export default Header