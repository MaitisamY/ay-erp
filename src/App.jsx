import './styles/app.css'
import 'react-toastify/dist/ReactToastify.css';

import { OrganizationCredentialProvider } from './hooks/OrganizationCredentialProvider'
import { useTheme } from './hooks/ThemeProvider'
import { MenuPreferenceProvider } from './hooks/MenuPreferenceProvider'
import { CurrencyProvider } from './hooks/CurrencyProvider'
import { ExportDataProvider } from './hooks/ExportDataProvider'
import { SKUPrefixProvider } from './hooks/SKUPrefixProvider'
import { NotificationThresholdProvider } from './hooks/NotificationThresholdProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Purchases from './pages/Purchases'
import Expenses from './pages/Expenses'
import Users from './pages/Users'
import Customers from './pages/Customers'
import Reports from './pages/Reports'
import Vendors from './pages/Vendors'
import General from './pages/Settings'
import Categories from './pages/settings/Categories'
import UOM from './pages/settings/UOM'
import Tax from './pages/settings/Tax'
import NotDefined from './pages/404'

function App() {

    const { theme } = useTheme()

    return (
        <div id="app" className={theme === 'light' ? '' : 'dark'}>
            <Router>
                <OrganizationCredentialProvider>
                    <CurrencyProvider>
                        <ExportDataProvider>
                            <MenuPreferenceProvider>
                                <SKUPrefixProvider>
                                    <NotificationThresholdProvider>
                                        <ToastContainer />
                                        <Routes>
                                            <Route path="*" element={<NotDefined />} />
                                            <Route path="/" element={<Dashboard />} />
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route path="/products" element={<Products />} />
                                            <Route path="/sales" element={<Sales />} />
                                            <Route path="/purchases" element={<Purchases />} />
                                            <Route path="/expenses" element={<Expenses />} />
                                            <Route path="/users" element={<Users />} />
                                            <Route path="/customers" element={<Customers />} />
                                            <Route path="/reports" element={<Reports />} />
                                            <Route path="/vendors" element={<Vendors />} />
                                            <Route path="/settings" element={<General />} />
                                            <Route path="/settings/categories" element={<Categories />} />
                                            <Route path="/settings/uom" element={<UOM />} />
                                            <Route path="/settings/tax" element={<Tax />} />
                                        </Routes>
                                    </NotificationThresholdProvider>
                                </SKUPrefixProvider>
                            </MenuPreferenceProvider>
                        </ExportDataProvider>
                    </CurrencyProvider>
                </OrganizationCredentialProvider>
            </Router>
        </div>
    )
}

export default App
