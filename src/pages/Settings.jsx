import '../styles/settings.css'

import { useTheme } from '../hooks/ThemeProvider'
import { useCurrency } from '../hooks/CurrencyProvider'
import { useExportData } from '../hooks/ExportDataProvider'
import { usePrefix } from '../hooks/SKUPrefixProvider'
import { useGeneralFunctions } from '../util/settings/useGeneralFunctions'
import { useNotificationThreshold } from '../hooks/NotificationThresholdProvider'
import { Link } from 'react-router-dom'
import { MdOutlineToggleOff, MdOutlineToggleOn, MdOutlineUpload, MdRefresh } from 'react-icons/md'

import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'
import Footer from '../partials/Footer'
import Card from '../components/Card'
import Form from '../components/Form'

function General() {

    const { theme, toggleTheme } = useTheme()
    const { currency, toggleCurrency } = useCurrency()
    const { exportData, importData, toggleExportData, toggleImportData } = useExportData()
    const { togglePrefix } = usePrefix()
    const { notificationThreshold, toggleNotificationThreshold, thresholds } = useNotificationThreshold()
    
    const {
        prefix,
        skuPrefix,
        currencies,
        serverResponse,
        fileInputRef,
        selectedFileName,
        fileSizeError,
        orgInfo,
        handleOrgInfoChange,
        handleFileChange,
        handleFileClick,
        handlePrefixChange
    } = useGeneralFunctions()

    document.title = 'Organization Name | General Settings'

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>

                    <div className="pills">
                        <li>
                            <Link to="/settings" className="link active">
                                General
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/uom" className="link">
                               Units of Measurement (UOM)
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/categories" className="link">
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/tax" className="link">
                                Tax
                            </Link>
                        </li>
                    </div>
                    
                    <div className="setting-container">
                        <h2>General Settings</h2>
                        <div className="box">
                            <div className="inner-box-1">
                                <Card title="Organization Details" classes="card card-xx-large">
                                    <Form onSubmit={() => {}}>
                                        <div className="form-group">
                                            <label htmlFor="name">Organization Name</label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                id="name" 
                                                value={orgInfo.name}
                                                placeholder={orgInfo.name === '' ? 'E.g. My Company' : ''}
                                                onChange={handleOrgInfoChange} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                id="email"
                                                value={orgInfo.email}
                                                placeholder={orgInfo.email === '' ? 'E.g. mycompany@example.com' : ''}
                                                onChange={handleOrgInfoChange} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input 
                                                type="text" 
                                                name="phone" 
                                                id="phone" 
                                                value={orgInfo.phone}
                                                placeholder={orgInfo.phone === '' ? 'E.g. +92123456789' : ''}
                                                onChange={handleOrgInfoChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input 
                                                type="text" 
                                                name="address" 
                                                id="address"
                                                value={orgInfo.address}
                                                placeholder={orgInfo.address === '' ? 'E.g. 123 Main St, Anytown, Country' : ''} 
                                                onChange={handleOrgInfoChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="website">Website</label>
                                            <input 
                                                type="text"
                                                name="website" 
                                                id="website" 
                                                value={orgInfo.website}
                                                placeholder={orgInfo.website === '' ? 'E.g. mycompany.com' : ''}
                                                onChange={handleOrgInfoChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tax">Logo</label>
                                            <div className="file-input-container">
                                                <input
                                                    type="file"
                                                    className="file-input"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    accept=".jpg, .jpeg, .png" 
                                                />
                                                <h5 onClick={handleFileClick}>
                                                    {
                                                        selectedFileName ? 
                                                        <>
                                                            <MdRefresh size={20} /> <i>Change</i> <i>({selectedFileName})</i> 
                                                        </>
                                                        : 
                                                        <>
                                                            <MdOutlineUpload size={20} /> <i> Upload Logo</i>
                                                        </>
                                                    }
                                                </h5>
                                            </div>
                                            {fileSizeError && <span className="error">{fileSizeError}</span>}
                                        </div>
                                        <button type="submit">Update and Save</button>
                                    </Form>
                                    {serverResponse && <h6 className="text-red">{serverResponse}</h6>}
                                </Card>
                            </div>
                            <div className="inner-box-2">

                                <Card title="Theme" classes="card card-small">
                                    <h4>Selected Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</h4>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="theme">Set Theme</label>
                                            <select name="theme" id="theme" onChange={toggleTheme}>
                                                <option value="light" selected={theme === 'light'}>Light</option>
                                                <option value="dark" selected={theme === 'dark'}>Dark</option>
                                            </select>
                                        </div>
                                    </form>
                                </Card>

                                <Card title="Notifications" classes="card card-small">
                                    <h4>
                                        {
                                            notificationThreshold === 5 ? (
                                                'Default count for low stock: 5'
                                            ) : (
                                                'Current count for low stock: ' + notificationThreshold
                                            )
                                        }
                                    </h4>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="stock">Set Low Stock Threshold</label>
                                            <select name="stock" id="stock" onChange={(e) => toggleNotificationThreshold(e.target.value)}>
                                                {
                                                    thresholds.map((threshold, index) => (
                                                        <option 
                                                            key={index} 
                                                            value={threshold} 
                                                            selected={threshold === notificationThreshold}
                                                        >
                                                            {threshold}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </form>
                                </Card>

                                <Card title="Currency" classes="card card-small">
                                    <h4>Selected Currency: {currency}</h4>
                                    {currencies ? (
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="currency">Set Currency</label>
                                                <select name="currency" id="currency" onChange={(event) => toggleCurrency(event.target.value)}>
                                                    {Object.keys(currencies).map((currencyCode) => (
                                                        <option key={currencyCode} value={currencyCode} selected={currencyCode === currency}>
                                                            {currencyCode} - {currencies[currencyCode]}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </form>
                                    ) : (
                                        <p>Loading currencies...</p>
                                    )}
                                </Card>

                                <Card title="Export Data" classes="card card-small">
                                    <h4>Export data option: {exportData === false ? 'Off' : 'On'}</h4>
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="export">Click to {exportData === false ? 'Enable' : 'Disable'} Export Data</label>
                                            <a id="export" className="link" onClick={toggleExportData}>
                                                {
                                                    exportData === false ? <MdOutlineToggleOff size={28} className="text-red" /> 
                                                    : <MdOutlineToggleOn size={28} className="text-green" />
                                                }
                                            </a>
                                        </div>
                                    </Form>
                                </Card>

                                <Card title="Import Data" classes="card card-small">
                                    <h4>Import data option: {importData === false ? 'Off' : 'On'}</h4>
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="import">Click to {importData === false ? 'Enable' : 'Disable'} Import Data</label>
                                            <a id="import" className="link" onClick={toggleImportData}>
                                                {
                                                    importData === false ? <MdOutlineToggleOff size={28} className="text-red" /> 
                                                    : <MdOutlineToggleOn size={28} className="text-green" />
                                                }
                                            </a>
                                        </div>
                                    </Form>
                                </Card>
                                
                                <Card title="SKU Prefix" classes="card card-small">
                                    {
                                        prefix === 'ON' ? 
                                        <h4>By default SKU Prefix: ON (<i>O</i>rganization <i>N</i>ame)</h4> 
                                        : <h4>Current SKU Prefix: {prefix}</h4>
                                    }
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="prefix">Update SKU Prefix</label>
                                            <input 
                                                type="text" 
                                                name="prefix" 
                                                id="prefix" 
                                                value={skuPrefix} 
                                                onChange={handlePrefixChange} 
                                                placeholder="According to your organisation" 
                                            />
                                        </div>
                                        {
                                            prefix === skuPrefix ? (
                                                <button 
                                                    type="button" 
                                                    disabled
                                                    title="No change detected"
                                                >
                                                    Update
                                                </button>
                                            ) : !skuPrefix || skuPrefix.length < 2 ? (
                                                <button 
                                                    type="button"
                                                    disabled
                                                    title="Add prefix first"
                                                >
                                                    Add
                                                </button>
                                            ) : (
                                                <button 
                                                    type="button"
                                                    title="Update and Save"
                                                    onClick={() => togglePrefix(skuPrefix)}
                                                >
                                                    Update
                                                </button>
                                            )
                                        }
                                    </Form>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default General
