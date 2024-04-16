import '../../styles/settings.css'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTaxFunctions } from '../../util/settings/useTaxFunctions'

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
        handleChange,
        handleSubmit
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
                                <Card title="Tax Configuration Form" classes="card card-xx-large">
                                    <h4>The tax information saves automatically as you fill and leave the field.</h4>
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="tax-name">Tax Name</label>
                                            <input type="text" name="taxName" value={taxInfo.taxName} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tax-rate">Tax Rate (%)</label>
                                            <input type="number" name="taxRate" value={taxInfo.taxRate} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tax-type">Tax Type:</label>
                                            <select name="taxType" value={taxInfo.taxType} onChange={handleChange}>
                                                <option value="">Select Tax Type</option>
                                                <option value="Standard Rate">Standard Rate</option>
                                                <option value="Reduced Rate">Reduced Rate</option>
                                                <option value="Zero Rate">Zero Rate</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tax-authority">Tax Authority:</label>
                                            <select name="taxAuthority" value={taxInfo.taxAuthority} onChange={handleChange}>
                                                <option value="">Select Tax Authority</option>
                                                <option value="Government Agency">Government Agency</option>
                                                <option value="Regulatory Body">Regulatory Body</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="tax-calculation-method">Tax Calculation Method:</label>
                                            <select name="taxCalculationMethod" value={taxInfo.taxCalculationMethod} onChange={handleChange}>
                                                <option value="">Select Tax Calculation Method</option>
                                                <option value="Inclusive">Inclusive</option>
                                                <option value="Exclusive">Exclusive</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="effective-date">Effective Date</label>
                                            <input type="date" name="effectiveDate" value={taxInfo.effectiveDate} onChange={handleChange} />
                                        </div>
                                    </Form>
                                </Card>
                            </div>
                            <div className="inner-box-2">
                                <Card title="Additional" classes="card card-xx-large">
                                    <Form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="additional-notes">Notes or Description</label>
                                            <textarea name="additionalNotes" value={taxInfo.additionalNotes} onChange={handleChange}></textarea>
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
