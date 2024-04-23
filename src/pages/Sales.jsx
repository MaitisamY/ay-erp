
import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/ThemeProvider'
import { Link } from 'react-router-dom'
import { usePagination } from '../helpers/Pagination'
import { useSaleFunctions } from '../util/sales/useSaleFunctions'
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

function Sales() {

    const { theme } = useTheme()
    const { currency } = useCurrency()

    const [sales, setSales] = useState([
        {
            id: 1,
            saleId: 12548569,
            clientName: 'Name 1',
            product: 'Product 1',
            category: 3,
            sellingPrice: 199.99,
            cutOffPrice: 156.55,
            quantity: 20,
            tax: 'none',
            remarks: 'Remarks 1',
        },
        {
            id: 2,
            saleId: 12548570,
            clientName: 'Name 2',
            product: 'Product 2',
            category: 2,
            sellingPrice: 149.99,
            cutOffPrice: 120.00,
            quantity: 15,
            tax: 'VAT',
            remarks: 'Remarks 2',
        },
        {
            id: 3,
            saleId: 12548571,
            clientName: 'Name 3',
            product: 'Product 3',
            category: 1,
            sellingPrice: 99.99,
            cutOffPrice: 85.00,
            quantity: 10,
            tax: 'GST',
            remarks: 'Remarks 3',
        },
        {
            id: 4,
            saleId: 12548572,
            clientName: 'Name 4',
            product: 'Product 4',
            category: 2,
            sellingPrice: 129.99,
            cutOffPrice: 110.00,
            quantity: 12,
            tax: 'VAT',
            remarks: 'Remarks 4',
        }
    ])

    const {
        categoryOptions,
        sale,
        selectedItems,
        setSelectedItems,
        handleSelection,
        handleChange,
    } = useSaleFunctions()

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
    } = usePagination({ data: sales })

    const currentItems = sales.slice(indexOfFirstItem, indexOfLastItem)
    const filteredItems = currentItems.filter(item => {
        // Check if the search term is entirely numeric
        const isNumeric = /^\d+$/.test(searchTerm);
    
        // If the search term is numeric, compare it with saleId directly
        if (isNumeric) {
            return item.saleId.toString().includes(searchTerm);
        } 
    });

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
                            <Link to="/sales" className="link active">
                                All Sales
                            </Link>
                        </li>
                        <li>
                            <Link to="/sales/add" className="link">
                                Add Sale
                            </Link>
                        </li>
                    </div>

                    <div className="container">
                        <h2>All Sales</h2>

                        <div className="box">

                            <PrePagination 
                                items={sales}
                                serachPlaceholder="Search by Client Name or Sale Id..."
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
                                                            onClick={() => setSelectedItems(sales.map(item => item.id))} 
                                                        />
                                                    )
                                                }
                                            </div>
                                        </th>
                                        <th>#</th>
                                        <th>Sale Id</th>
                                        <th>Client Name</th>
                                        <th>Product</th>
                                        <th>Price ({currency})</th>
                                        <th>Quantity</th>
                                        <th>Category</th>
                                        <th>Total ({currency})</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {
                                    !searchTerm ? (
                                        <tbody>
                                            {currentItems.map((sale, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div>
                                                            {
                                                                selectedItems.includes(sale.id) ? (
                                                                    <MdCheckBox 
                                                                        size={20} 
                                                                        style={{ cursor: 'pointer'}}
                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                        onClick={() => handleSelection(sale.id)} 
                                                                    />
                                                                ) : (
                                                                    <MdCheckBoxOutlineBlank 
                                                                        size={20} 
                                                                        style={{ cursor: 'pointer'}}
                                                                        onClick={() => handleSelection(sale.id)} 
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>{sales.indexOf(sale) + 1}</td>
                                                    <td>{sale.saleId}</td>
                                                    <td>{sale.clientName}</td>
                                                    <td>{sale.product}</td>
                                                    <td>
                                                        {
                                                            Float32Array ? sale.cutOffPrice.toFixed(2) + '/-'
                                                            : Float64Array ? sale.cutOffPrice.toFixed(2) + '/-'
                                                            : sale.cutOffPrice + '/-'
                                                        }
                                                    </td>
                                                    <td>{sale.quantity}</td>
                                                    <td>
                                                        {   
                                                            categoryOptions.filter(cat => cat.id === sale.category).map(cat => cat.name)
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            Float32Array ? sale.cutOffPrice * sale.quantity.toFixed(2) + '/-'
                                                            : Float64Array ? sale.cutOffPrice * sale.quantity.toFixed(2) + '/-'
                                                            : sale.cutOffPrice * sale.quantity + '/-'
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button  
                                                                className="edit"
                                                                title={`Edit sale: ${sale.saleId}`}
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button 
                                                                className="danger" 
                                                                title={`Delete sale: ${sale.saleId}`}
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
                                            {filteredItems.map((sale, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div>
                                                            {
                                                                selectedItems.includes(sale.id) ? (
                                                                    <MdCheckBox 
                                                                        size={20} 
                                                                        style={{ cursor: 'pointer'}}
                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                        onClick={() => handleSelection(sale.id)} 
                                                                    />
                                                                ) : (
                                                                    <MdCheckBoxOutlineBlank 
                                                                        size={20} 
                                                                        style={{ cursor: 'pointer'}}
                                                                        onClick={() => handleSelection(sale.id)} 
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>{sales.indexOf(sale) + 1}</td>
                                                    <td>{sale.saleId}</td>
                                                    <td>{sale.clientName}</td>
                                                    <td>{sale.product}</td>
                                                    <td>
                                                        {
                                                            Float32Array ? sale.cutOffPrice.toFixed(2) + '/-'
                                                            : Float64Array ? sale.cutOffPrice.toFixed(2) + '/-'
                                                            : sale.cutOffPrice + '/-'
                                                        }
                                                    </td>
                                                    <td>{sale.quantity}</td>
                                                    <td>
                                                        {   
                                                            categoryOptions.filter(cat => cat.id === sale.category).map(cat => cat.name)
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            Float32Array ? sale.cutOffPrice * sale.quantity.toFixed(2) + '/-'
                                                            : Float64Array ? sale.cutOffPrice * sale.quantity.toFixed(2) + '/-'
                                                            : sale.cutOffPrice * sale.quantity + '/-'
                                                        }
                                                    </td>
                                                    <td>
                                                        <button  
                                                            className="edit"
                                                            title={`Edit sale: ${sale.name}`}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button 
                                                            className="danger" 
                                                            title={`Delete sale: ${sale.name}`}
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
                                data={sales}
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

export default Sales
