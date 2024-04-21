
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePagination } from '../helpers/Pagination'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

import PrePagination from '../components/pagination/PrePagination'
import Pagination from '../components/pagination/Pagination'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'
import Footer from '../partials/Footer'

function Products() {

    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Product 1',
            sku: 'P1',
            price: 1000,
            quantity: 10,
            category: '1',
        },
        {
            id: 2,
            name: 'Product 2',
            sku: 'P2',
            price: 2000,
            quantity: 20,
            category: '4',
        },
        {
            id: 3,
            name: 'Product 3',
            sku: 'P3',
            price: 3000,
            quantity: 30,
            category: '2',
        }
    ])

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
        item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                                totalPages={totalPages}
                                handleItemsPerPage={handleItemsPerPage}
                                handleSearchTerm={handleSearchTerm}
                           />

                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Product SKU</th>
                                        <th>Price</th>
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
                                                    <td>{products.indexOf(product) + 1}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.sku}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.category}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button  
                                                                className="edit"
                                                                title={`Edit unit: ${product.name}`}
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button 
                                                                className="danger" 
                                                                title={`Delete unit: ${product.name}`}
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
                                                    <td>{products.indexOf(product) + 1}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.sku}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.category}</td>
                                                    <td>
                                                        <button  
                                                            className="edit"
                                                            title={`Edit unit: ${product.name}`}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button 
                                                            className="danger" 
                                                            title={`Delete unit: ${product.name}`}
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
                <Footer />
            </Content>
        </>
    )
}

export default Products
