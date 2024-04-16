import '../../styles/settings.css'

import { useOrganizationCredential } from '../../hooks/OrganizationCredentialProvider'
import { useTheme } from '../../hooks/ThemeProvider'
import { useCurrency } from '../../hooks/CurrencyProvider'
import { useExportData } from '../../hooks/ExportDataProvider'
import { usePrefix } from '../../hooks/SKUPrefixProvider'
import { useGeneralFunctions } from '../../util/settings/useGeneralFunctions'
import { useNotificationThreshold } from '../../hooks/NotificationThresholdProvider'
import { Link } from 'react-router-dom'
import { MdOutlineToggleOff, MdOutlineToggleOn, MdOutlineUpload, MdRefresh } from 'react-icons/md'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Footer from '../../partials/Footer'
import Card from '../../components/Card'
import Form from '../../components/Form'

function Tax() {

    const { organizationCredential } = useOrganizationCredential()
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
        handleFileChange,
        handleFileClick,
        handlePrefixChange
    } = useGeneralFunctions()

    document.title = organizationCredential !== null ? organizationCredential.name + ' | Tax Settings' : 'Organization Name | Tax Settings'

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>

                    <div className="pills">
                        <li>
                            <Link to="/settings" className="link">
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
                            <Link to="/settings/tax" className="link active">
                                Tax
                            </Link>
                        </li>
                    </div>
                    
                    <div className="setting-container">
                        <h2>Tax Settings</h2>
                        <div className="box">

                        </div>
                    </div>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default Tax
