import './styles/app.css'
import 'react-toastify/dist/ReactToastify.css';

// Import modules and hooks
import { lazy, Suspense } from 'react'
import { OrganizationCredentialProvider } from './hooks/OrganizationCredentialProvider'
import { useTheme } from './hooks/ThemeProvider'
import { UserProvider } from './hooks/UserProvider';
import { MenuPreferenceProvider } from './hooks/MenuPreferenceProvider'
import { CurrencyProvider } from './hooks/CurrencyProvider'
import { ExportDataProvider } from './hooks/ExportDataProvider'
import { SKUPrefixProvider } from './hooks/SKUPrefixProvider'
import { NotificationThresholdProvider } from './hooks/NotificationThresholdProvider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// Import pages with lazy loading
import ProtectedRoute from './pages/protected/ProtectedRoute'
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Products = lazy(() => import('./pages/Products'))
const AddProduct = lazy(() => import('./pages/products/AddProduct'))
const Sales = lazy(() => import('./pages/Sales'))
const AddSale = lazy(() => import('./pages/sales/AddSale'))
const Purchases = lazy(() => import('./pages/Purchases'))
const Expenses = lazy(() => import('./pages/Expenses'))
const Users = lazy(() => import('./pages/Users'))
const AddUser = lazy(() => import('./pages/users/AddUser'))
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
                                            <UserProvider>
                                                <ToastContainer />
                                                <Routes>
                                                    <Route path="*" element={<NotDefined />} />
                                                    <Route path="/" element={<Login />} />
                                                    <Route path="/reset-password" element={<ForgotPassword />} />
                                                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                                    <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                                                    <Route path="/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                                                    <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
                                                    <Route path="/sales/add" element={<ProtectedRoute><AddSale /></ProtectedRoute>} />
                                                    <Route path="/purchases" element={<ProtectedRoute><Purchases /></ProtectedRoute>} />
                                                    <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
                                                    <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                                                    <Route path="/users/add" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
                                                    <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
                                                    <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                                                    <Route path="/vendors" element={<ProtectedRoute><Vendors /></ProtectedRoute>} />
                                                    <Route path="/settings" element={<ProtectedRoute><GeneralSettings /></ProtectedRoute>} />
                                                    <Route path="/settings/categories" element={<ProtectedRoute><CategorySettings /></ProtectedRoute>} />
                                                    <Route path="/settings/uom" element={<ProtectedRoute><UOMSettings /></ProtectedRoute>} />
                                                    <Route path="/settings/tax" element={<ProtectedRoute><TaxSettings /></ProtectedRoute>} />
                                                    <Route path="/settings/brands" element={<ProtectedRoute><BrandSettings /></ProtectedRoute>} />
                                                </Routes>
                                            </UserProvider>
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
