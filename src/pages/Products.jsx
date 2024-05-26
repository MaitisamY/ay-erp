
import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/ThemeProvider'
import { Link } from 'react-router-dom'
import { usePagination } from '../helpers/Pagination.js'
import { useProductFunctions } from '../util/products/useProductFunctions.js'
import { useCurrency } from '../hooks/CurrencyProvider'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

import PrePagination from '../components/pagination/PrePagination'
import Pagination from '../components/pagination/Pagination'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'
import Footer from '../partials/Footer'

function Products() {

    const { theme } = useTheme()
    const { currency } = useCurrency()

    /* SHOP PC */
    // const [products, setProducts] = useState([
    //     {
    //         id: 1,
    //         name: 'Product 1',
    //         sku: 'P1',
    //         price: 199.99,
    //         quantity: 10,
    //         category: 1,
    //     },
    //     {
    //         id: 2,
    //         name: 'Product 2',
    //         sku: 'P2',
    //         price: 10.67,
    //         quantity: 20,
    //         category: 2,
    //     },
    //     {
    //         id: 3,
    //         name: 'Product 3',
    //         sku: 'P3',
    //         price: 30,
    //         quantity: 30,
    //         category: 4,
    //     }
    // ])

    /* HOME PC */
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Product 1',
            sku: 'P1',
            price: 199.99,
            quantity: 10,
            category: 22,
        },
        {
            id: 2,
            name: 'Product 2',
            sku: 'P2',
            price: 10.67,
            quantity: 20,
            category: 30,
        },
        {
            id: 3,
            name: 'Product 3',
            sku: 'P3',
            price: 30,
            quantity: 30,
            category: 44,
        }
    ])

    const {
        categoryOptions,
        selectedItems,
        setSelectedItems,
        handleSelection,
    } = useProductFunctions()

    const {
        searchTerm,
        currentPage,
        indexOfFirstItem,
        indexOfLastItem,
        totalPages,
        handleCurrentPage,
        setCurrentPage,
        previousPage,
        nextPage,
        lastPage,
        firstPage,
        handleItemsPerPage,
        handleSearchTerm 
    } = usePagination({ data: products })

    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
    const filteredItems = currentItems.filter(
        item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                || item.sku.toLowerCase().includes(searchTerm.toLowerCase()) 
                || categoryOptions.find(option => option.id === item.category).name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>

                    <div className="pills">
                        <li>
                            <Link to="/products" className="link active">
                                All Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/products/add" className="link">
                                Add Product
                            </Link>
                        </li>
                    </div>

                    <div className="container">
                        <h2>All Products</h2>

                        <div className="box">

                            <PrePagination 
                                items={products}
                                serachPlaceholder="Search by Name, SKU or Category..."
                                totalPages={totalPages}
                                handleItemsPerPage={handleItemsPerPage}
                                handleSearchTerm={handleSearchTerm}
                                selectedItems={selectedItems}
                                isImportable={true}
                                isExportable={true}
                           />

                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div style={{ cursor: 'pointer'}}>
                                                {
                                                    selectedItems.length > 0 ? (
                                                        <MdCheckBox 
                                                            size={20} 
                                                            style={{ cursor: 'pointer'}}
                                                            className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                            onClick={() => setSelectedItems([])} 
                                                        />
                                                    ) : (
                                                        <MdCheckBoxOutlineBlank 
                                                            size={20} 
                                                            onClick={() => setSelectedItems(products.map(item => item.id))} 
                                                        />
                                                    )
                                                }
                                            </div>
                                        </th>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>SKU</th>
                                        <th>Price ({currency})</th>
                                        <th>Quantity</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {
                                    !searchTerm ? (
                                        <tbody>
                                            {currentItems.map((product, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div>
                                                            {
                                                                selectedItems.includes(product.id) ? (
                                                                    <MdCheckBox 
                                                                        size={20} 
                                                                        style={{ cursor: 'pointer'}}
                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                        onClick={() => handleSelection(product.id)} 
                                                                    />
                                                                ) : (
                                                                    <MdCheckBoxOutlineBlank 
                                                                        size={20} 
                                                                        style={{ cursor: 'pointer'}}
                                                                        onClick={() => handleSelection(product.id)} 
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>{products.indexOf(product) + 1}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.sku}</td>
                                                    <td>
                                                        {
                                                            Float32Array ? product.price.toFixed(2) + '/-'
                                                            : Float64Array ? product.price.toFixed(2) + '/-'
                                                            : product.price + '/-'
                                                        }
                                                    </td>
                                                    <td>{product.quantity}</td>
                                                    <td>
                                                        {   
                                                            categoryOptions.find(cat => cat.id === product.category)?.name || 'Unknown'
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button  
                                                                className="edit"
                                                                title={`Edit product: ${product.name}`}
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button 
                                                                className="danger" 
                                                                title={`Delete product: ${product.name}`}
                                                            >
                                                                <FaTrashAlt />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            {filteredItems.map((product, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div>
                                                            {
                                                                selectedItems.includes(product.id) ? (
                                                                    <MdCheckBox 
                                                                        size={20} 
                                                                        style={{ cursor: 'pointer'}}
                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                        onClick={() => handleSelection(product.id)} 
                                                                    />
                                                                ) : (
                                                                    <MdCheckBoxOutlineBlank 
                                                                        size={20} 
                                                                        style={{ cursor: 'pointer'}}
                                                                        onClick={() => handleSelection(product.id)} 
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>{products.indexOf(product) + 1}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.sku}</td>
                                                    <td>
                                                        {
                                                            Float32Array ? product.price.toFixed(2) + '/-'
                                                            : Float64Array ? product.price.toFixed(2) + '/-'
                                                            : product.price + '/-'
                                                        }
                                                    </td>
                                                    <td>{product.quantity}</td>
                                                    <td>
                                                        {   
                                                            categoryOptions.find(cat => cat.id === product.category)?.name || 'Unknown'
                                                        }
                                                    </td>
                                                    <td>
                                                        <button  
                                                            className="edit"
                                                            title={`Edit product: ${product.name}`}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button 
                                                            className="danger" 
                                                            title={`Delete product: ${product.name}`}
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )
                                }
                            </table>

                            <Pagination 
                                data={products}
                                handleCurrentPage={handleCurrentPage}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                firstPage={firstPage}
                                previousPage={previousPage}
                                nextPage={nextPage}
                                lastPage={lastPage}
                            />
                        </div>
                    </div>
                </Main>
            </Content>
        </>
    )
}

export default Products
