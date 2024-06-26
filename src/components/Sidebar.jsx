import '../styles/sidebar.css'
import Logo from '../assets/images/logo-2.png'

import { useEffect } from 'react'
import { useMenuPreference } from '../hooks/MenuPreferenceProvider'
import { useOrganizationCredential } from '../hooks/OrganizationCredentialProvider'
import { BsArrowBarLeft, BsArrowBarRight, BsSpeedometer2, BsGift, BsPeople, BsPersonCheck } from 'react-icons/bs'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { MdOutlinePayments, MdPeopleOutline, MdOutlineFileCopy, MdOutlineSettings, MdMoneyOff } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

function Sidebar() {

    const { organizationCredential, setOrgCreds } = useOrganizationCredential()

    const { isCollapsed, onSidebarToggle } = useMenuPreference()
    const { pathname } = useLocation()

    const fetchCredentials = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/get/organization`)
            
            if (response.data.status === 200) {
                setOrgCreds(response.data.data[0])
            } else {
                console.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCredentials()
    }, [])

    return (
        <div className="sidebar" style={{ width: isCollapsed ? '70px' : '15%' }}>

            <div className="brand">
                <img 
                    src={organizationCredential && organizationCredential.logo ? 'http://localhost:5000/uploads/' + organizationCredential.logo : Logo} 
                    alt="logo" 
                />
                <span style={{ display: isCollapsed ? 'none' : 'block' }}>
                    {
                        organizationCredential === null || !organizationCredential.name ? 'Organization Name' : organizationCredential.name
                    }
                </span>
            </div>

            <ul>
                <li>
                    <Link to="/dashboard" className={`link ${pathname === '/dashboard' ? 'active' : ''}`}>
                        <BsSpeedometer2 size={20} /> 
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/products" className={`link ${pathname === '/products' || pathname === '/products/add' ? 'active' : ''}`}>
                        <BsGift size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="/sales" className={`link ${pathname === '/sales' || pathname === '/sales/add' ? 'active' : ''}`}>
                        <FaRegMoneyBillAlt size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Sales</span>
                    </Link>
                </li>
                <li>
                    <Link to="/purchases" className={`link ${pathname === '/purchases' ? 'active' : ''}`}>
                        <MdOutlinePayments size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Purchases</span>
                    </Link>
                </li>
                <li>
                    <Link to="/expenses" className={`link ${pathname === '/expenses' ? 'active' : ''}`}>
                        <MdMoneyOff size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Expenses</span>
                    </Link>
                </li>
                <li>
                    <Link to="/users" className={`link ${pathname === '/users' || pathname === '/users/add' ? 'active' : ''}`}>
                        <MdPeopleOutline size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Users</span>
                    </Link>
                </li>
                <li>
                    <Link to="/customers" className={`link ${pathname === '/customers' ? 'active' : ''}`}>
                        <BsPeople size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Customers</span>
                    </Link>
                </li>
                <li>
                    <Link to="/reports" className={`link ${pathname === '/reports' ? 'active' : ''}`}>
                        <MdOutlineFileCopy size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Reports</span>
                    </Link>
                </li>
                <li>
                    <Link to="/vendors" className={`link ${pathname === '/vendors' ? 'active' : ''}`}>
                        <BsPersonCheck size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Vendors</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/settings" 
                        className=
                        {`
                            link ${pathname === '/settings' 
                            ||  pathname === '/settings/profile' 
                            || pathname === '/settings/uom' 
                            || pathname === '/settings/categories' 
                            || pathname === '/settings/brands'
                            || pathname === '/settings/tax'
                            ? 'active' : ''}
                        `}
                    >
                        <MdOutlineSettings size={20} />
                        <span style={{ display: isCollapsed ? 'none' : 'block' }}>Settings</span>
                    </Link>
                </li>
            </ul>

            <button className="sidebar-toggle" onClick={onSidebarToggle}>
                {isCollapsed ? <BsArrowBarRight title="Expand Sidebar" /> : <BsArrowBarLeft title="Collapse Sidebar" /> }
            </button>
        </div>
    )
}

export default Sidebar
