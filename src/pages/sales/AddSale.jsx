
import { Link } from 'react-router-dom'
import { useSaleFunctions } from '../../util/sales/useSaleFunctions'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Footer from '../../partials/Footer'
import Card from '../../components/Card'
import Form from '../../components/Form'

function AddSale() {

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
                            <h5>Sale Id: 00900001</h5>
                            <Form onSubmit={() => {}}>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="client-name">Client Name<i>*</i></label>
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
                                        <label htmlFor="product">Products<i>*</i></label>
                                        <input // product will be filtered as the user types
                                            type="text" 
                                            name="product" 
                                            value={sale.product} 
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
                                            value={sale.category} 
                                            id="category" 
                                            placeholder="E.g. Pencil" 
                                            onChange={handleChange} 
                                            readOnly
                                        />
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="quantity">Quantity <span>Available Qty: 50</span></label>
                                        <input // quantity can be manually entered, the maximum quantity will be shown
                                            type="text" 
                                            name="quantity" 
                                            value={sale.quantity} 
                                            id="quantity" 
                                            placeholder="E.g. 10" 
                                            onChange={handleChange}
                                        />
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
