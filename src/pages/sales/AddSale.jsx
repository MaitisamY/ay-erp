
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/ThemeProvider'
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

    const { theme } = useTheme()
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
            productName: 'Penner',
            brand: 'Mercury',
            category: 23,
            quantity: 10,
            uom: 'Pcs',
            price: 25
        },
        {
            id: 2,
            productName: 'My Pencil',
            brand: 'Dollar',
            category: 29,
            quantity: 20,
            uom: 'Pack',
            price: 30
        },
        {
            id: 3,
            productName: 'Cut marker',
            brand: 'Shark',
            category: 26,
            quantity: 200,
            uom: 'Carton',
            price: 20
        }
    ])

    const [seller, setSeller] = useState({
        id: '',
        productName: '',
        brand: '',
        category: '',
        quantity: '',
        uom: '',
        price: '',
        discount: '',
        remarks: '',
    })

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        if (selectedProducts.includes(value)) {
            setSelectedProducts(selectedProducts.filter(item => item !== value));
            setSeller({ ...seller, quantity: value });
        } else {
            setSelectedProducts([...selectedProducts, value]);
        }
    }

    const handleSellerChange = (e) => {
        const { name, value } = e.target
        setSeller({ ...seller, [name]: value })
    }

    const handleProductSelect = (e) => {
        const selectedProduct = e.target.value;
        if (selectedProduct === "") {
            // If the input field is cleared, reset the seller state
            setSeller({ id: '', productName: '', brand: '', category: '', quantity: '', uom: '', price: '', discount: '', remarks: '' });
        } else {
            const product = products.find((p) => (p.productName + ' - ' + p.brand) === selectedProduct);
            if (product) {
                setSeller({ 
                    ...seller, 
                    productName: product.productName, 
                    category: product.category, 
                    quantity: '', 
                    uom: product.uom, 
                    price: product.price, 
                    remarks: product.remarks 
                });
            }
        }
    };

    const clearProductName = () => {
        setSeller({ ...seller, productName: '', brand: '', category: '', quantity: '', uom: '', price: '', discount: '', remarks: '' });
    }  
    
    const removeProducts = () => {
        setSelectedProducts([])
    }
    const addProduct = () => {
        const existingProductIndex = selectedProducts.findIndex(product => product.productName === seller.productName);
    
        const totalQuantity = parseInt(seller.quantity, 10);
    
        if (existingProductIndex !== -1) {
            const updatedProducts = [...selectedProducts];
            const newQuantity = selectedProducts[existingProductIndex].quantity + totalQuantity;
    
            if (newQuantity > products.find(product => product.productName === seller.productName)?.quantity) {
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
                return; // Exit the function early if quantity exceeds available quantity
            }
    
            updatedProducts[existingProductIndex].quantity = newQuantity;
            setSelectedProducts(updatedProducts);
            setSeller(prevSeller => ({ ...prevSeller, productName: '', brand: '', category: '', quantity: '', uom: '', price: '', discount: '', remarks: '' }));
        } else {
            const availableQuantity = products.find(product => product.productName === seller.productName)?.quantity || 0;
    
            if (totalQuantity > availableQuantity) {
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
                const product = products.find(product => product.productName === seller.productName);
                if (product) {
                    // Add the new product to the list with price included
                    setSelectedProducts([
                        ...selectedProducts,
                        {
                            id: selectedProducts.length + 1, 
                            productName: seller.productName,
                            brand: seller.brand,
                            category: seller.category,
                            quantity: totalQuantity, 
                            uom: seller.uom,
                            price: product.price // Include the price
                        }
                    ]);
                }
            }
        }
    }
         
    
    const removeSingleProduct = (id) => {
        setSelectedProducts([
            ...selectedProducts.filter((product) => product.id !== id)
        ])
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

                                    <Card classes="card-less card-xx-small">
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
                                            <label htmlFor="discount">Discount</label>
                                            <div className="input-group bordered">
                                                <input // customer name can be manual or from existing customers
                                                    type="text"
                                                    name="discount" 
                                                    value={sale.discount} 
                                                    id="discount" 
                                                    placeholder="E.g. 100" 
                                                    onChange={handleProductSelect} 
                                                />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card classes="card-less card-small">
                                        <div className="form-group">
                                            <label htmlFor="product">Product<i>*</i></label>
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
                                                    seller.productName &&  
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
                                                    seller.productName &&
                                                    categoryOptions.find(opt => opt.id === products.find(product => product.productName === seller.productName)?.category)?.name             
                                                }
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

                                    <Card classes="card-less card-xx-large">
                                        <div className="form-group">
                                            <label htmlFor="remarks">Remarks</label>
                                            <textarea 
                                                placeholder="Thank You!"
                                                name="remarks" 
                                                id="remarks" 
                                                value={seller.remarks}
                                                onChange={handleChange}
                                            >
                                            </textarea>
                                        </div>
                                    </Card>
                                    
                                </Form>
                            </div>
                            <div className="inner-box-1">
                                {
                                    selectedProducts.length > 0 ? (
                                    <Form onSubmit={() => {}}>
                                        <Card 
                                            title="Products" 
                                            headerContent={
                                                selectedProducts.length > 1 &&
                                                <span 
                                                    onClick={removeProducts} 
                                                    style={{ 
                                                        cursor: 'pointer', 
                                                        fontSize: 'small',
                                                        backgroundColor: '#ca1818', 
                                                        color: '#fff',
                                                        padding: '5px 10px',
                                                        borderRadius: '6px'
                                                    }}
                                                >
                                                    Clear all products
                                                </span>
                                            } 
                                            classes="card card-xxx-large"
                                        >
                                            <div className="form-group">
                                                {
                                                    selectedProducts.length > 0 ? (
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Product</th>
                                                                    <th>Price</th>
                                                                    <th>Net</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    selectedProducts.map((product) => (
                                                                        <>
                                                                        <tr key={product.id}>
                                                                            <td>
                                                                                <span  
                                                                                    style={{ 
                                                                                        cursor: 'pointer', 
                                                                                        fontSize: 'smaller', 
                                                                                        fontWeight: '700',
                                                                                        textShadow: theme === 'dark' ? '0px 0px 2px #000' : '0px 0px 2px #fff'
                                                                                    }}
                                                                                    className="text-red"
                                                                                    onClick={() => removeSingleProduct(product.id)}
                                                                                >
                                                                                    Remove
                                                                                </span>
                                                                            </td>
                                                                            <td>{product.productName} &nbsp; x 
                                                                                <i className={theme === 'dark' ? 'text-lime-green' : 'text-green'}>
                                                                                    {product.quantity}
                                                                                </i>
                                                                            </td>
                                                                            <td>{product.price}</td>
                                                                            <td>{product.quantity * product.price}/-</td>
                                                                        </tr>
                                                                        </>
                                                                    ))
                                                                }
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td><strong>Total: </strong></td>
                                                                    <td>
                                                                        {selectedProducts.reduce((total, product) => total + (product.quantity * product.price), 0)}/-
                                                                    </td>
                                                                </tr>
                                                                {
                                                                    seller.discount && selectedProducts.length > 0 && (
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td><strong>Discount: </strong></td>
                                                                            <td>
                                                                                {
                                                                                    selectedProducts.reduce((total, product) => (total + (product.quantity * product.price)) - 
                                                                                    (product.quantity * product.price * product.discount / 100), 0)
                                                                                }/-
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                
                                                            </tbody>
                                                        </table>
                                                    ) : <h4>Products will be shown here</h4>
                                                }
                                            </div>
                                        </Card>
                                    </Form>
                                ) : (
                                    <Card classes="card-less card-xxx-large"></Card>
                                )}
                            </div>
                        </div>
                    </div>
                </Main>
            </Content>
        </>
    )
}

export default AddSale
