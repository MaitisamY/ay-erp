
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../../hooks/CurrencyProvider'
import { useSaleFunctions } from '../../util/sales/useSaleFunctions'
import { useTaxFunctions } from '../../util/settings/useTaxFunctions'
import { BsX } from 'react-icons/bs'
import { toast } from 'react-toastify'

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

    const [products, setProducts] = useState([
        {
            id: 1,
            productName: 'Cut marker',
            brand: 'Mercury',
            category: 26,
            quantity: 10,
            uom: 'Pcs'
        },
        {
            id: 2,
            productName: 'Ball Pen',
            brand: 'Dollar',
            category: 23,
            quantity: 20,
            uom: 'Pack'
        },
        {
            id: 3,
            productName: 'Eraser',
            brand: 'Shark',
            category: 26,
            quantity: 200,
            uom: 'Carton'
        }
    ])

    const [seller, setSeller] = useState({
        id: '',
        productName: '',
        brand: '',
        category: '',
        quantity: '',
        uom: '',
    })

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleSellerChange = (e) => {
        const { name, value } = e.target
        setSeller({ ...seller, [name]: value })
    }

    const handleProductSelect = (e) => {
        const selectedProduct = e.target.value;
        if (selectedProduct === "") {
            // If the input field is cleared, reset the seller state
            setSeller({ id: '', productName: '', brand: '', category: '', quantity: '', uom: '' });
        } else {
            const product = products.find((p) => (p.productName + ' - ' + p.brand) === selectedProduct);
            if (product) {
                setSeller({ ...seller, productName: product.productName, category: product.category, quantity: '', uom: product.uom });
            }
        }
    };

    const clearProductName = () => {
        setSeller({ ...seller, productName: '', brand: '', category: '', quantity: '', uom: '' });
        setSelectedProducts([]);
    }    

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        if (selectedProducts.includes(value)) {
            setSelectedProducts(selectedProducts.filter(item => item !== value));
            setSeller({ ...seller, quantity: value });
        } else {
            setSelectedProducts([...selectedProducts, value]);
        }
    }

    const addProduct = () => {
        // Find the product index in the selected products array
        const existingProductIndex = selectedProducts.findIndex(product => product.productName === seller.productName);
    
        // Calculate the total quantity including the new addition
        const totalQuantity = existingProductIndex !== -1
            ? parseInt(seller.quantity, 10) + selectedProducts[existingProductIndex].quantity
            : parseInt(seller.quantity, 10);
    
        // Check if the total quantity exceeds the available quantity
        if (existingProductIndex !== -1 && totalQuantity > products.quantity) {
            // If the total quantity exceeds the available quantity, show a message or handle as desired
            console.log("Cannot add more than available quantity");
            toast.error("Cannot add more than available quantity", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        } else if (existingProductIndex !== -1) {
            // Update the quantity of the existing product
            const updatedProducts = [...selectedProducts];
            updatedProducts[existingProductIndex].quantity = totalQuantity;
            setSelectedProducts(updatedProducts);
        } else {
            // Check if the first time adding the product and ensure that seller.quantity reflects the available quantity
            const availableQuantity = products.find(product => product.productName === seller.productName)?.quantity || 0;
    
            if (totalQuantity > availableQuantity) {
                // If the total quantity exceeds the available quantity, show a message or handle as desired
                console.log("Cannot add more than available quantity");
                toast.error("Cannot add more than available quantity", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            } else {
                // Add the new product to the list
                setSelectedProducts([
                    ...selectedProducts,
                    {
                        id: selectedProducts.length + 1, // Generate unique ID
                        productName: seller.productName,
                        brand: seller.brand,
                        category: seller.category,
                        quantity: parseInt(seller.quantity, 10), // Convert to integer
                        uom: seller.uom
                    }
                ]);
            }
        }
    }
    
            

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
                            <ul className="sale-list-items">
                                <li><h4>Fields with (<i className="text-red">*</i>) are mandatory</h4></li>
                                <li><h4>The (<i className="text-red">AD</i>) flag represents "Auto Detection"</h4></li>
                                <li><h4>Datalist is used for the ease of product selection</h4></li>
                            </ul>
                            <div className="inner-box-2">
                                <Form onSubmit={() => {}}>

                                    <Card classes="card-less card-small">
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

                                    <Card classes="card-less card-small">
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

                                    <Card classes="card-less card-small">
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

                                    {/* <Card classes="card-less card-x-small">
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
                                    </Card> */}

                                    <Card classes="card-less card-small">
                                        <div className="form-group">
                                            <label htmlFor="product">Products<i>*</i></label>
                                            <div className="input-group bordered">
                                                <input
                                                    type="text" 
                                                    name="productName" // Change to "productName"
                                                    value={seller.productName} 
                                                    id="product" 
                                                    placeholder="E.g. T-Shirt"  
                                                    onInput={handleProductSelect}
                                                    list="supporting-products"
                                                />
                                                {
                                                    seller.productName && seller.quantity > 0 && 
                                                    <div className="danger" onClick={clearProductName} style={{ cursor: 'pointer' }}>
                                                        <BsX />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <datalist id="supporting-products">
                                            {products.map((product) => 
                                                <option key={product.id} value={product.productName + ' - ' + product.brand} label={product.productName} />
                                            )}
                                        </datalist>
                                    </Card>

                                    <Card classes="card-less card-small">
                                        <div className="form-group">
                                            <label htmlFor="category">Category</label> {/* Changed to category */}
                                            <input 
                                                type="text" 
                                                name="category" 
                                                value={
                                                    categoryOptions.map(option => {
                                                        return seller.productName ?
                                                            (products.find(product => product.productName === seller.productName)?.category ?
                                                                categoryOptions.find(opt => opt.id === products.find(product => product.productName === seller.productName)?.category)?.name : '') : '';
                                                    })}
                                                id="category" 
                                                placeholder="AD" 
                                                onChange={handleSellerChange} 
                                                readOnly
                                                title="Category: Read only"
                                            />
                                        </div>
                                    </Card>

                                    <Card classes="card-less card-small">
                                        <div className="form-group">
                                            <label htmlFor="quantity">Quantity</label>
                                            <div className="input-group bordered">
                                                <input 
                                                    type="number" 
                                                    name="quantity" 
                                                    value={seller.quantity} 
                                                    id="quantity" 
                                                    placeholder="E.g. 10" 
                                                    onChange={handleSellerChange}
                                                />
                                                <div className="normal">
                                                    Availability: &nbsp;
                                                    {
                                                        seller.productName ?
                                                        (
                                                            products.find(product => product.productName === seller.productName) ?
                                                            products.find(product => product.productName === seller.productName).quantity + ' ' +
                                                            products.find(product => product.productName === seller.productName).uom :
                                                            'AD'
                                                        ) :
                                                        'AD'
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    {
                                        seller.productName && seller.quantity > 0 &&
                                        <Card classes="card-less card-xx-small">
                                            <div className="form-group">
                                                <button type="button" onClick={addProduct}>Add</button>
                                            </div>
                                        </Card>
                                    }
                                    
                                </Form>
                            </div>
                            <div className="inner-box-1">
                                <Form onSubmit={() => {}}>
                                    <Card title="Products" classes="card card-xxx-large">
                                        <div className="form-group">
                                            {
                                                selectedProducts.length > 0 ? selectedProducts.map((product) => (
                                                    <p>{product.productName} X {product.quantity}</p>
                                                )) : <h4>Products will be shown here</h4>
                                            }
                                        </div>
                                    </Card>

                                </Form>
                            </div>
                        </div>
                    </div>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default AddSale
