
import { Link } from 'react-router-dom'
import { usePrefix } from '../../hooks/SKUPrefixProvider'
import { useCurrency } from '../../hooks/CurrencyProvider'
import { useProductFunctions } from '../../util/products/useProductFunctions'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Footer from '../../partials/Footer'
import Card from '../../components/Card'
import Form from '../../components/Form'

function AddProduct() {

    const { prefix } = usePrefix()
    const { currency } = useCurrency()
    const {
        categoryOptions,
        product,
        generateSKU,
        handleChange
    } = useProductFunctions()

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>

                    <div className="pills">
                        <li>
                            <Link to="/products" className="link">
                                All Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/products/add" className="link active">
                                Add Product
                            </Link>
                        </li>
                    </div>

                    <div className="container">
                        <h2>Product Details Form</h2>

                        <div className="box">
                            <Form onSubmit={() => {}}>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="name">Product Name</label>
                                        <input type="text" name="name" value={product.name} id="name" placeholder="E.g. T-Shirt" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="selling-price">Selling Price</label>
                                        <div className="input-group">
                                            {currency && <span>{currency}</span>}
                                            <input type="text" name="selling-price" value={product.sellingPrice} id="selling-price" placeholder="E.g. 1400" onChange={handleChange} />
                                        </div>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="sku">Product SKU (Stock Keeping Unit)</label>
                                        <div className="input-group">
                                            {prefix && <span>{prefix}-</span>}
                                            <input type="text" name="sku" value={product.sku} id="sku" placeholder="E.g. P1" onChange={handleChange} />
                                            <a onClick={generateSKU}>Generate</a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cut-off-price">Cut/ Off Price</label>
                                        <div className="input-group">
                                            {currency && <span>{currency}</span>}
                                            <input type="text" name="cut-off-price" value={product.cutOffPrice} id="cut-off-price" placeholder="E.g. 1299" onChange={handleChange} />
                                        </div>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="category">Product Category</label>
                                        <select name="category" id="category" onChange={handleChange}>
                                            <option value="">Select Category</option>
                                        {
                                            categoryOptions &&
                                            categoryOptions.map((cat, index) => (
                                                <option key={index} value={cat.id}>{cat.name}</option>
                                            ))
                                        }
                                        </select>
                                    </div>
                                    
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="purchase-cost">Purchase Cost</label>
                                        <div className="input-group">
                                            {currency && <span>{currency}</span>}
                                            <input type="text" name="purchase-cost" value={product.purchaseCost} id="purchase-cost" placeholder="E.g. 1000" onChange={handleChange} />
                                        </div>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    
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

export default AddProduct
