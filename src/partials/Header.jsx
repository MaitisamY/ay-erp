import '../styles/header.css';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdPerson, MdNotifications, MdLogout, MdOutlinePerson } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../hooks/UserProvider';
import Dropdown from '../components/dropdown/Dropdown';

function Header() {
    const { token, user, updateUser, updateToken } = useUser();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [notificationMenu, setNotificationMenu] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);

    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    const toggleNotificationMenu = () => {
        if (profileMenu) setProfileMenu(false);
        setNotificationMenu(!notificationMenu);
    };

    const toggleProfileMenu = () => {
        if (notificationMenu) setNotificationMenu(false);
        setProfileMenu(!profileMenu);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current && !notificationRef.current.contains(event.target) &&
                profileRef.current && !profileRef.current.contains(event.target)
            ) {
                setNotificationMenu(false);
                setProfileMenu(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.title = pathname === '/404' ? '404 - Page Not Found'
            : pathname === '/' ? 'Dashboard'
            : pathname === '/products' ? 'Products'
            : pathname === '/products/add' ? 'Add Product'
            : pathname === '/sales' ? 'Sales'
            : pathname === '/sales/add' ? 'Add Sale'
            : pathname === '/purchases' ? 'Purchases'
            : pathname === '/expenses' ? 'Expenses'
            : pathname === '/users' ? 'Users'
            : pathname === '/users/add' ? 'Add User'
            : pathname === '/customers' ? 'Customers'
            : pathname === '/reports' ? 'Reports'
            : pathname === '/vendors' ? 'Vendors'
            : pathname === '/settings' ? 'General Settings'
            : pathname === '/settings/categories' ? 'Category Settings'
            : pathname === '/settings/uom' ? 'UOM Settings'
            : pathname === '/settings/tax' ? 'Tax Settings'
            : pathname === '/settings/brands' ? 'Brand Settings'
            : pathname.slice(1).replace(/-/, ' ').charAt(0).toUpperCase() + pathname.slice(1).replace(/-/, ' ').slice(1);
    }, [pathname]);

    // Logout Handler
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            updateUser(null);
            updateToken(null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

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
                                    : pathname === '/users/add' ? 'Users'
                                        : pathname.slice(1).replace(/-/, ' ').charAt(0).toUpperCase() + pathname.slice(1).replace(/-/, ' ').slice(1)
                }
            </h1>

            <div className="utils">
                <a ref={notificationRef} className="dropdown" onClick={toggleNotificationMenu}>
                    <MdNotifications size={20} />
                    {
                        notificationMenu && (
                            <Dropdown
                                headerContent={<Link className="dropdown-link" to="/notifications">View All</Link>}
                                title="Notifications"
                            >
                            </Dropdown>
                        )
                    }
                </a>

                <a ref={profileRef} className="dropdown" onClick={toggleProfileMenu}>
                    <MdPerson size={20} /> {user && user.name}
                    {
                        profileMenu && (
                            <Dropdown
                                headerContent={<Link className="dropdown-link" to="/profile">Go to Profile</Link>}
                                title="Profile"
                            >
                                {
                                    user && user.photo ?
                                    <img src={user.photo} alt="Profile" />
                                    :
                                    <MdOutlinePerson size={32} />
                                }
                                {
                                    user && user.name && <p>{user.name} <span className="badge">{user.role === 1 ? 'Admin' : user.role === 2 ? 'Manager' : 'Staff'}</span></p>
                                }
                                {
                                    user && user.email && <p>{user.email}</p>
                                }
                            </Dropdown>
                        )
                    }
                </a>

                <a className="dropdown" onClick={handleLogout}>
                    <MdLogout size={20} />
                </a>
            </div>
        </header>
    );
}

export default Header;
