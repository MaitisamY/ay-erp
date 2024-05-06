import './styles/app.css'
import 'react-toastify/dist/ReactToastify.css';

import { lazy, Suspense } from 'react'
import { OrganizationCredentialProvider } from './hooks/OrganizationCredentialProvider'
import { useTheme } from './hooks/ThemeProvider'
import { MenuPreferenceProvider } from './hooks/MenuPreferenceProvider'
import { CurrencyProvider } from './hooks/CurrencyProvider'
import { ExportDataProvider } from './hooks/ExportDataProvider'
import { SKUPrefixProvider } from './hooks/SKUPrefixProvider'
import { NotificationThresholdProvider } from './hooks/NotificationThresholdProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Products = lazy(() => import('./pages/Products'))
const AddProduct = lazy(() => import('./pages/products/AddProduct'))
const Sales = lazy(() => import('./pages/Sales'))
const AddSale = lazy(() => import('./pages/sales/AddSale'))
const Purchases = lazy(() => import('./pages/Purchases'))
const Expenses = lazy(() => import('./pages/Expenses'))
const Users = lazy(() => import('./pages/Users'))
const Customers = lazy(() => import('./pages/Customers'))
const Reports = lazy(() => import('./pages/Reports'))
const Vendors = lazy(() => import('./pages/Vendors'))
const GeneralSettings = lazy(() => import('./pages/Settings'))
const CategorySettings = lazy(() => import('./pages/settings/Categories'))
const UOMSettings = lazy(() => import('./pages/settings/UOM'))
const TaxSettings = lazy(() => import('./pages/settings/Tax'))
const BrandSettings = lazy(() => import('./pages/settings/Brands'))
const NotDefined = lazy(() => import('./pages/404'))

function App() {

    const { theme } = useTheme()

    return (
        <div id="app" className={theme === 'light' ? '' : 'dark'}>
            <Suspense fallback={<div className="lazy-loading"><span className="suspense-loader"></span></div>}>
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
                                                <Route path="/" element={<Login />} />
                                                <Route path="/dashboard" element={<Dashboard />} />
                                                <Route path="/products" element={<Products />} />
                                                <Route path="/products/add" element={<AddProduct />} />
                                                <Route path="/sales" element={<Sales />} />
                                                <Route path="/sales/add" element={<AddSale />} />
                                                <Route path="/purchases" element={<Purchases />} />
                                                <Route path="/expenses" element={<Expenses />} />
                                                <Route path="/users" element={<Users />} />
                                                <Route path="/customers" element={<Customers />} />
                                                <Route path="/reports" element={<Reports />} />
                                                <Route path="/vendors" element={<Vendors />} />
                                                <Route path="/settings" element={<GeneralSettings />} />
                                                <Route path="/settings/categories" element={<CategorySettings />} />
                                                <Route path="/settings/uom" element={<UOMSettings />} />
                                                <Route path="/settings/tax" element={<TaxSettings />} />
                                                <Route path="/settings/brands" element={<BrandSettings />} />
                                            </Routes>
                                        </NotificationThresholdProvider>
                                    </SKUPrefixProvider>
                                </MenuPreferenceProvider>
                            </ExportDataProvider>
                        </CurrencyProvider>
                    </OrganizationCredentialProvider>
                </Router>
            </Suspense>
        </div>
    )
}

export default App
