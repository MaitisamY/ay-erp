import '../styles/header.css'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Header() {

    const { pathname } = useLocation()
    const titlePrefix = 'Organization Name | '

    useEffect(() => {
        pathname === '/' ? document.title = `${titlePrefix} Dashboard` 
        : pathname === '/products' ? document.title = `${titlePrefix} Products`
        : pathname === '/sales' ? document.title = `${titlePrefix} Sales`
        : pathname === '/customers' ? document.title = `${titlePrefix} Customers`
        : pathname === '/purchases' ? document.title = `${titlePrefix} Purchases`
        : pathname === '/expenses' ? document.title = `${titlePrefix} Expenses`
        : pathname === '/users' ? document.title = `${titlePrefix} Users`
        : pathname === '/customers' ? document.title = `${titlePrefix} Customers`
        : pathname === '/vendors' ? document.title = `${titlePrefix} Vendors`
        : pathname === '/settings' ? document.title = `${titlePrefix} Settings`
        : document.title = `
            ${titlePrefix} ${pathname.slice(1).replace(/-/, ' ').charAt(0).toUpperCase() 
                            + pathname.slice(1).replace(/-/, ' ').slice(1)}`
    }, [pathname])

    return (
        <header>
            <h1>
                {
                    pathname === '/' ? 'Dashboard' 
                    : pathname === '/settings/profile' || pathname === '/settings/uom' || pathname === '/settings/categories' ? 'Settings'
                    : pathname.slice(1).replace(/-/, ' ').charAt(0).toUpperCase() 
                    + pathname.slice(1).replace(/-/, ' ').slice(1)
                }
            </h1>
        </header>
    )
}

export default Header
