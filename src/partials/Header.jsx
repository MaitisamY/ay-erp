import '../styles/header.css'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Header() {

    const { pathname } = useLocation()

    useEffect(() => {
        pathname === '/404' ? document.title = '404 - Page Not Found'
        : pathname === '/' ? document.title = 'Dashboard' 
        : pathname === '/products' ? document.title = 'Products' 
        : pathname === '/sales' ? document.title = 'Sales' 
        : pathname === '/customers' ? document.title = 'Customers'
        : pathname === '/purchases' ? document.title = 'Purchases' 
        : pathname === '/expenses' ? document.title = 'Expenses'
        : pathname === '/users' ? document.title = 'Users'
        : pathname === '/customers' ? document.title = 'Customers'
        : pathname === '/reports' ? document.title = 'Reports'
        : pathname === '/vendors' ? document.title = 'Vendors'
        : pathname === '/settings' ? document.title = 'General Settings'
        : pathname === '/settings/categories' ? document.title = 'Category Settings'
        : pathname === '/settings/uom' ? document.title = 'UOM Settings'
        : pathname === '/settings/tax' ? document.title = 'Tax Settings'
        : document.title = `${pathname.slice(1).replace(/-/, ' ').charAt(0).toUpperCase() + pathname.slice(1).replace(/-/, ' ').slice(1)}`
    }, [pathname])

    return (
        <header>
            <h1>
                {
                    pathname === '/' ? 'Dashboard' 
                    : pathname === '/settings/tax' 
                    || pathname === '/settings/uom' 
                    || pathname === '/settings/categories' ? 'Settings'
                    : pathname.slice(1).replace(/-/, ' ').charAt(0).toUpperCase() + pathname.slice(1).replace(/-/, ' ').slice(1)
                }
            </h1>
        </header>
    )
}

export default Header
