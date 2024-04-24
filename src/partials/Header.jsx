import '../styles/header.css'

import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { MdPerson, MdNotifications, MdLogout } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Dropdown from '../components/dropdown/Dropdown'

function Header() {

    const { pathname } = useLocation()

    const [notificationMenu, setNotificationMenu] = useState(false)
    const [profileMenu, setProfileMenu] = useState(false)

    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    const toggleNotificationMenu = () => {
        if(profileMenu) {
            setProfileMenu(false)
        }
        setNotificationMenu(!notificationMenu)
    }

    const toggleProfileMenu = () => {
        if(notificationMenu) {
            setNotificationMenu(false)
        }
        setProfileMenu(!profileMenu)
    }

    useEffect(() => {

        // if(user.token === '' || user.type !== 'student') {
        //     navigate('/')
        // }

        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target) &&
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setNotificationMenu(false);
                setProfileMenu(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [])

    useEffect(() => {
        pathname === '/404' ? document.title = '404 - Page Not Found'
        : pathname === '/' ? document.title = 'Dashboard' 
        : pathname === '/products' ? document.title = 'Products'
        : pathname === '/products/add' ? document.title = 'Add Product' 
        : pathname === '/sales' ? document.title = 'Sales'
        : pathname === '/sales/add' ? document.title = 'Add Sale' 
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
        : pathname === '/settings/brands' ? document.title = 'Brand Settings'
        : document.title = `${pathname.slice(1).replace(/-/, ' ').charAt(0).toUpperCase() + pathname.slice(1).replace(/-/, ' ').slice(1)}`
    }, [pathname])

    return (
        <header>
            <h1>
                {
                    pathname === '/' ? 'Dashboard' 
                    : pathname === '/settings/brands'
                    || pathname === '/settings/tax' 
                    || pathname === '/settings/uom' 
                    || pathname === '/settings/categories' ? 'Settings'
                    : pathname === '/products/add' ? 'Products'
                    : pathname === '/sales/add' ? 'Sales'
                    : pathname.slice(1).replace(/-/, ' ').charAt(0).toUpperCase() + pathname.slice(1).replace(/-/, ' ').slice(1)
                }
            </h1>

            <div className="utils">
                <a ref={notificationRef} className="dropdown" onClick={toggleNotificationMenu}>
                    <MdNotifications />

                    {
                        notificationMenu && (
                            <Dropdown
                                headerContent={
                                    <>
                                        <Link className="dropdown-link" to="/notifications">View All</Link>
                                    </>
                                }
                                title="Notifications"
                            >
                            </Dropdown>
                        )
                    }
                </a>

                <a ref={profileRef} className="dropdown" onClick={toggleProfileMenu}>
                    <MdPerson />

                    {
                        profileMenu && (
                            <Dropdown
                                headerContent={
                                    <>
                                        <Link className="dropdown-link" to="/profile">Go to Profile</Link>
                                    </>
                                }
                                title="Profile"
                            >
                            </Dropdown>
                        )
                    }
                </a>

                <a className="dropdown">
                    <MdLogout />
                </a>
            </div>
        </header>
    )
}

export default Header
