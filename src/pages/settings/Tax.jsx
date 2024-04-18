import '../../styles/settings.css'

import { Link } from 'react-router-dom'
import { useTaxFunctions } from '../../util/settings/useTaxFunctions'
import { BsCheck2, BsX } from 'react-icons/bs'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Footer from '../../partials/Footer'
import Card from '../../components/Card'
import Form from '../../components/Form'

function Tax() {
    
    const {
        taxInfo,
        isLoadingName,
        isLoadingRate,
        isLoadingType,
        isLoadingAuthority,
        isLoadingCalculationMethod,
        isLoadingEffectiveDate,
        isLoadingNotes,
        serverResponse,
        handleFieldChange
    } = useTaxFunctions()

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
                            <div className="inner-box-1">
                                <Card title="Tax Configuration" classes="card card-xx-large">
                                    <h4>The tax information saves automatically as you fill and leave the field.</h4>
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="tax-name">Tax Name</label>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                id="tax-name"
                                                value={taxInfo.name} 
                                                placeholder={!taxInfo.name ? 'Enter Tax Name' : ''}
                                                onChange={handleFieldChange} 
                                            />
                                            {
                                                isLoadingName ? <span className="loader"></span> : 
                                                serverResponse && serverResponse.name ? 
                                                    <span className={`responser 
                                                        ${serverResponse.name.status === 200 ? 'text-green' 
                                                        : serverResponse.name.status === 500 ? 'text-red' 
                                                        : ''}
                                                        `}
                                                    >
                                                        {
                                                            serverResponse.name.status === 200 ? <BsCheck2 alt="Success" title='Saved' /> 
                                                            : serverResponse.name.status === 500 ? <BsX alt="Error" title='Error' /> 
                                                            : null
                                                        }
                                                    </span> 
                                                : null
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tax-rate">Tax Rate (%)</label>
                                            <input 
                                                type="text" 
                                                name="rate" 
                                                id="tax-rate"
                                                value={taxInfo.rate} 
                                                placeholder={!taxInfo.rate ? 'Enter Tax Rate' : ''}
                                                onChange={handleFieldChange} 
                                            />
                                            {
                                                isLoadingRate ? <span className="loader"></span> : 
                                                serverResponse && serverResponse.rate ? 
                                                    <span className={`responser 
                                                        ${serverResponse.rate.status === 200 ? 'text-green' 
                                                        : serverResponse.rate.status === 500 ? 'text-red' 
                                                        : ''}
                                                        `}
                                                    >
                                                        {
                                                            serverResponse.rate.status === 200 ? <BsCheck2 alt="Success" title='Saved' /> 
                                                            : serverResponse.rate.status === 500 ? <BsX alt="Error" title='Error' /> 
                                                            : null
                                                        }
                                                    </span> 
                                                : null
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tax-type">Tax Type:</label>
                                            <select 
                                                name="type" 
                                                id="tax-type"
                                                value={taxInfo.type} 
                                                onChange={handleFieldChange}
                                            >
                                                <option value="">Select Tax Type</option>
                                                <option value="Standard Rate">
                                                    Standard Rate
                                                </option>
                                                <option value="Reduced Rate">
                                                    Reduced Rate
                                                </option>
                                                <option value="Zero Rate">
                                                    Zero Rate
                                                </option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tax-authority">Tax Authority:</label>
                                            <select 
                                                name="authority" 
                                                id="tax-authority"
                                                value={taxInfo.authority} 
                                                onChange={handleFieldChange}
                                            >
                                                <option value="">Select Tax Authority</option>
                                                <option value="Government Agency">
                                                    Government Agency
                                                </option>
                                                <option value="Regulatory Body">
                                                    Regulatory Body
                                                </option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tax-calculation-method">Tax Calculation Method:</label>
                                            <select 
                                                name="calculation_method" 
                                                id="tax-calculation-method"
                                                value={taxInfo.calculation_method} 
                                                onChange={handleFieldChange}
                                            >
                                                <option value="">Select Tax Calculation Method</option>
                                                <option value="Inclusive">
                                                    Inclusive
                                                </option>
                                                <option value="Exclusive">
                                                    Exclusive
                                                </option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="effective-date">Effective Date</label>
                                            <input 
                                                type="date" 
                                                name="effective_date" 
                                                id="effective-date"
                                                value={taxInfo.effective_date} 
                                                placeholder={!taxInfo.effective_date ? 'Enter Effective Date' : ''}
                                                onChange={handleFieldChange} 
                                            />
                                        </div>
                                    </Form>
                                </Card>
                            </div>
                            <div className="inner-box-2">
                                <Card title="Additional" classes="card card-xx-large">
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="additional-notes">Notes or Description</label>
                                            <textarea 
                                                id="additional-notes"
                                                name="notes" 
                                                rows="5" 
                                                value={taxInfo.notes} 
                                                placeholder={!taxInfo.notes ? 'Enter Additional Notes' : ''}
                                                onChange={handleFieldChange}
                                            >
                                                
                                            </textarea>
                                            {
                                                isLoadingNotes ? <span className="loader"></span> : 
                                                serverResponse ? 
                                                    <span className={`responser 
                                                        ${serverResponse.notes.status === 200 ? 'text-green' 
                                                        : serverResponse.notes.status === 500 ? 'text-red' 
                                                        : ''}
                                                        `}
                                                    >
                                                        {
                                                            serverResponse.notes.status === 200 ? <BsCheck2 alt="Success" title='Saved' /> 
                                                            : serverResponse.notes.status === 500 ? <BsX alt="Error" title='Error' /> 
                                                            : null
                                                        }
                                                    </span> 
                                                : null
                                            }
                                        </div>
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

export default Tax
