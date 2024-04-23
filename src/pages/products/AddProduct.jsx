
import { Link } from 'react-router-dom'
import { usePrefix } from '../../hooks/SKUPrefixProvider'
import { useCurrency } from '../../hooks/CurrencyProvider'
import { useProductFunctions } from '../../util/products/useProductFunctions'
import { useTaxFunctions } from '../../util/settings/useTaxFunctions'

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
    const { taxInfo } = useTaxFunctions()

    const {
        categoryOptions,
        uomOptions,
        product,
        variants,
        images,
        generateSKU,
        handleChange,
        handleChangeVariant,
        createVariant,
        removeVariant,
        createImages,
        removeImages
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
                            <h4>Fields with (<i className="text-red">*</i>) are mandatory</h4>
                            <Form onSubmit={() => {}}>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="name">Product Name<i>*</i></label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={product.name} 
                                            id="name" 
                                            placeholder="E.g. T-Shirt" 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="selling-price">Selling Price<i>*</i></label>
                                        <div className="input-group bordered">
                                            {currency && <span>{currency}</span>}
                                            <input 
                                                type="number"
                                                name="sellingPrice" 
                                                value={product.sellingPrice} 
                                                id="selling-price" 
                                                placeholder="E.g. 1400" 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="sku">Product SKU (Stock Keeping Unit)<i>*</i></label>
                                        <div className="input-group bordered">
                                            {prefix && <span>{prefix}-</span>}
                                            <input 
                                                type="text" 
                                                name="sku" 
                                                value={product.sku} 
                                                id="sku" 
                                                placeholder="E.g. P1" 
                                                onChange={handleChange} 
                                            />
                                            <a onClick={generateSKU}>Generate</a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cut-off-price">Cut/ Off Price</label>
                                        <div className="input-group bordered">
                                            {currency && <span>{currency}</span>}
                                            <input 
                                                type="number"
                                                name="cutOffPrice" 
                                                value={product.cutOffPrice} 
                                                id="cut-off-price" 
                                                placeholder="E.g. 1299" 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="category">Product Category<i>*</i></label>
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
                                    <div className="form-group">
                                        <label htmlFor="uom">UOM (Unit of Measurement)<i>*</i></label>
                                        <select name="uom" id="uom" onChange={handleChange}>
                                            <option value="">Select UOM</option>
                                        {
                                            uomOptions &&
                                            uomOptions.map((uom, index) => (
                                                <option key={index} value={uom.id}>{uom.name}</option>
                                            ))
                                        }
                                        </select>
                                    </div>
                                </Card>

                                <Card classes="card-less card-x-small">
                                    <div className="form-group">
                                        <label htmlFor="purchase-cost">Purchase Cost<i>*</i></label>
                                        <div className="input-group bordered">
                                            {currency && <span>{currency}</span>}
                                            <input 
                                                type="number" 
                                                name="purchaseCost" 
                                                value={product.purchaseCost} 
                                                id="purchase-cost" 
                                                placeholder="E.g. 1000" 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tax">Tax Paid (For this product)</label>
                                        <div className="input-group bordered">
                                            {taxInfo && <span>{taxInfo.name}</span>}
                                            <input 
                                                type="number" 
                                                name="tax" 
                                                value={product.tax} 
                                                id="tax" 
                                                placeholder="E.g. 4.2" 
                                                onChange={handleChange} 
                                            />
                                            <p>%</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card classes="card-less card-xxx-large">
                                    <div className="form-group">
                                        <label htmlFor="description">Product Description</label>
                                        <textarea 
                                            name="description" 
                                            id="description" 
                                            value={product.description} 
                                            placeholder="E.g. This is a description of the product"
                                            onChange={handleChange}
                                            rows="5"
                                        ></textarea>
                                    </div>
                                </Card>

                                <div className="inner-box-1">
                                    <Card classes="card-less card-x-large">
                                        <div className="form-group">
                                            <label htmlFor="variants">Does this product have variants? (Optional)</label>
                                            <button 
                                                className="blue" 
                                                type="button" 
                                                onClick={createVariant}
                                                disabled={variants.length === 12}
                                                title={variants.length === 12 ? "You can't add more than 12 variants" : "Add Variant"}
                                            >
                                                Add Variant
                                            </button>
                                        </div>
                                    </Card>
                                </div>
                                
                                <div className="inner-box-2">
                                    <Card classes="card-less card-large">
                                        {
                                            variants && 
                                            variants.map((variant) => (
                                                <div key={variant.id} className="form-group">
                                                    <label>{variant.id}.</label>
                                                    <div className="input-group bordered">
                                                        <span>Name</span>
                                                        <input 
                                                            type="text" 
                                                            name="name" 
                                                            value={variant.name}
                                                            placeholder="E.g. Red"
                                                            onChange={(e) => handleChangeVariant(variant.id, e.target.name, e.target.value)} 
                                                        />
                                                        <i>Price</i>
                                                        <input 
                                                            type="number" 
                                                            name="price"
                                                            value={variant.price}
                                                            placeholder="E.g. 1299"
                                                            inputMode="numeric"
                                                            onChange={(e) => handleChangeVariant(variant.id, e.target.name, e.target.value)} 
                                                        />
                                                        <a className="text-red" onClick={() => removeVariant(variant.id)}>
                                                            Remove
                                                        </a>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Card>
                                </div>

                                <div className="inner-box-1">
                                    <Card classes="card-less card-x-large">
                                        <div className="form-group">
                                            <label htmlFor="variants">Does this product have images? (Optional)</label>
                                            <button 
                                                className="blue" 
                                                type="button" 
                                                onClick={createImages}
                                                disabled={images.length === 5}
                                                title={images.length === 5 ? 'Maximum 5 images allowed' : ''}
                                            >
                                                Add Image
                                            </button>
                                        </div>
                                    </Card>
                                </div>

                                <div className="inner-box-2">
                                    <Card classes="card-less card-large">
                                        {
                                            images && 
                                            images.map((img) => (
                                                <div key={img.id} className="form-group">
                                                    <label>{img.id}.</label>
                                                    <div className="input-group bordered">
                                                        <input 
                                                            type="file" 
                                                            name="name" 
                                                            value={img.url}
                                                            placeholder="E.g. Red"
                                                            onChange={(e) => handleChangeVariant(img.id, e.target.name, e.target.value)} 
                                                        />
                                                        <a className="text-red" onClick={() => removeImages(img.id)}>
                                                            Remove
                                                        </a>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Card>
                                </div>
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
