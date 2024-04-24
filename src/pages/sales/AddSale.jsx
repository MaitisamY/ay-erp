
import { Link } from 'react-router-dom'
import { useCurrency } from '../../hooks/CurrencyProvider'
import { useSaleFunctions } from '../../util/sales/useSaleFunctions'
import { useTaxFunctions } from '../../util/settings/useTaxFunctions'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Footer from '../../partials/Footer'
import Card from '../../components/Card'
import Form from '../../components/Form'

function AddSale() {

    const { currency } = useCurrency()
 
    const {
        taxInfo
    } = useTaxFunctions()

    const {
        categoryOptions,
        sale,
        handleChange,
    } = useSaleFunctions()

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>
                    <div className="pills">
                        <li>
                            <Link to="/sales" className="link">
                                All Sales
                            </Link>
                        </li>
                        <li>
                            <Link to="/sales/add" className="link active">
                                Add Sale
                            </Link>
                        </li>
                    </div>

                    <div className="container">
                        <h2>Sale Details Form</h2>

                        <div className="box">
                            <h4>Fields with (<i className="text-red">*</i>) are mandatory</h4>
                            <h4>The flag (<i className="text-red">AD</i>) means Auto Deduction</h4>
                            <Form onSubmit={() => {}}>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="sale-id">Sale Id</label>
                                        <input // customer name can be manual or from existing customers
                                            type="text"
                                            name="sale-id" 
                                            value="00900001" 
                                            id="sale-id"  
                                            readOnly
                                        />
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="client-name">Client Name</label>
                                        <div className="input-group bordered">
                                            <input // customer name can be manual or from existing customers
                                                type="text"
                                                name="clientName" 
                                                value={sale.clientName} 
                                                id="client-name" 
                                                placeholder="E.g. John Doe" 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="tax">Tax</label>
                                        <div className="input-group bordered">
                                            <span>{taxInfo && taxInfo.name && taxInfo.name}</span>
                                            <span>{currency && currency}</span>
                                            <input 
                                                type="text" 
                                                name="tax" 
                                                value={sale.tax} 
                                                id="tax" 
                                                placeholder="E.g. 50" 
                                                onChange={handleChange} 
                                            />
                                            <p>/-</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="warehouse">Warehouse<i>*</i></label>
                                        <select onChange={handleChange} name="warehouse" id="warehouse">
                                            <option value="">Select Warehouse</option>
                                            <option value="warehouse-001">Warehouse 001</option>
                                            <option value="warehouse-002">Warehouse 002</option>
                                            <option value="warehouse-003">Warehouse 003</option>
                                            <option value="warehouse-004">Warehouse 004</option>
                                            <option value="warehouse-005">Warehouse 005</option>
                                        </select>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="product">Products<i>*</i></label>
                                        <input // product will be filtered as the user types
                                            type="text" 
                                            name="product" 
                                            value={sale.products[0]} 
                                            id="product" 
                                            placeholder="E.g. T-Shirt" 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="product">Category</label>
                                        <input // category will be automatically selected (detected) based on product
                                            type="text" 
                                            name="category" 
                                            value={sale.category[0]} 
                                            id="category" 
                                            placeholder="AD" 
                                            onChange={handleChange} 
                                            readOnly
                                        />
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="quantity">Quantity</label>
                                        <div className="input-group bordered">
                                        <input // quantity can be manually entered, the maximum quantity will be shown
                                            type="text" 
                                            name="quantity" 
                                            value={sale.quantity[0]} 
                                            id="quantity" 
                                            placeholder="E.g. 10" 
                                            onChange={handleChange}
                                        />
                                        <div>Availablity: AD</div>
                                        </div>
                                    </div>
                                </Card>

                            </Form>
                        </div>
                    </div>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default AddSale
