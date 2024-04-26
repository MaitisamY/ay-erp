
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

    /* SHOP PC */
    // const [sales, setSales] = useState([
    //     {
    //         id: 1,
    //         saleId: 12548569,
    //         clientName: 'Clinet Name 1',
    //         products: ['Product 1', 'Product 2', 'Product 3'],
    //         category: [1, 2, 3],
    //         sellingPrice: [300, 149.99, 110],
    //         cutOffPrice: [300, 120.00, 110],
    //         quantity: [22, 12, 18],
    //         tax: '',
    //         remarks: 'Great to have you sir!',
    //     },
    //     {
    //         id: 2,
    //         saleId: 12548570,
    //         clientName: 'Clinet Name 2',
    //         products: ['Product 4', 'Product 5', 'Product 6'],
    //         category: [1, 2, 3],
    //         sellingPrice: [199.99, 280, 99.99],
    //         cutOffPrice: [154.99, 190.00, 85.00],
    //         quantity: [12, 8, 2],
    //         tax: 'GST',
    //         remarks: '',
    //     },
    //     {
    //         id: 3,
    //         saleId: 12548571,
    //         clientName: 'Clinet Name 3',
    //         products: ['Product 7', 'Product 8', 'Product 9'],
    //         category: [1, 2, 3],
    //         sellingPrice: [199.99, 149.99, 99.99],
    //         cutOffPrice: [75.00, 60.00, 85.00],
    //         quantity: [1, 3, 1],
    //         tax: '',
    //         remarks: '',
    //     },
    //     {
    //         id: 4,
    //         saleId: 12548572,
    //         clientName: 'Clinet Name 4',
    //         products: ['Product 10', 'Product 11', 'Product 12'],
    //         category: [22, 2, 3],
    //         sellingPrice: [199.99, 149.99, 99.99],
    //         cutOffPrice: [156.55, 120.00, 85.00],
    //         quantity: [20, 15, 10],
    //         tax: 'VAT',
    //         remarks: 'Awesome customer with high ethics.',
    //     }
    // ])

    /* HOME PC */
    const [sales, setSales] = useState([
        {
            id: 1,
            saleId: 12548569,
            clientName: 'Clinet Name 1',
            products: ['Product 1', 'Product 2', 'Product 3'],
            category: [22, 28, 30],
            sellingPrice: [300, 149.99, 110],
            cutOffPrice: [300, 120.00, 110],
            quantity: [22, 12, 18],
            tax: '',
            remarks: 'Great to have you sir!',
        },
        {
            id: 2,
            saleId: 12548570,
            clientName: 'Clinet Name 2',
            products: ['Product 4', 'Product 5', 'Product 6'],
            category: [44, 46, 30],
            sellingPrice: [199.99, 280, 99.99],
            cutOffPrice: [154.99, 190.00, 85.00],
            quantity: [12, 8, 2],
            tax: 'GST',
            remarks: '',
        },
        {
            id: 3,
            saleId: 12548571,
            clientName: 'Clinet Name 3',
            products: ['Product 7', 'Product 8', 'Product 9'],
            category: [22, 47, 44],
            sellingPrice: [199.99, 149.99, 99.99],
            cutOffPrice: [75.00, 60.00, 85.00],
            quantity: [1, 3, 1],
            tax: '',
            remarks: '',
        },
        {
            id: 4,
            saleId: 12548572,
            clientName: 'Clinet Name 4',
            products: ['Product 10', 'Product 11', 'Product 12'],
            category: [26, 29, 30],
            sellingPrice: [199.99, 149.99, 99.99],
            cutOffPrice: [156.55, 120.00, 85.00],
            quantity: [20, 15, 10],
            tax: 'VAT',
            remarks: 'Awesome customer with high ethics.',
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
                                        <th>Products, Price ({currency}), Quantity and Category</th>
                                        <th>Tax type</th>
                                        <th>Remarks</th>
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
                                                    <td>
                                                    {sale.products.map((product, index) => (
                                                        <div key={index}>
                                                            {product} - (
                                                                {sale.cutOffPrice[index].toFixed(2)}) - (
                                                                    {sale.quantity[index]}) - (
                                                                        {categoryOptions.find(c => c.id === sale.category[index])?.name || 'Unknown'})
                                                        </div>
                                                    ))}
                                                    </td>
                                                    <td>{sale.tax || 'N/A'}</td>
                                                    <td>{sale.remarks || 'N/A'}</td>
                                                    <td>
                                                        {
                                                            sale.cutOffPrice.reduce((total, price, index) => (
                                                                total + (sale.quantity[index] * price)
                                                            ), 0).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/-'
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
                                                    <td>
                                                    {sale.products.map((product, index) => (
                                                        <div key={index}>
                                                            {product} - (
                                                                {sale.cutOffPrice[index].toFixed(2)}) - (
                                                                    {sale.quantity[index]}) - (
                                                                        {categoryOptions.find(c => c.id === sale.category[index])?.name || 'Unknown'})
                                                        </div>
                                                    ))}
                                                    </td>
                                                    <td>{sale.tax || 'N/A'}</td>
                                                    <td>{sale.remarks || 'N/A'}</td>
                                                    <td>
                                                        {
                                                            sale.cutOffPrice.reduce((total, price, index) => (
                                                                total + (sale.quantity[index] * price)
                                                            ), 0).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '/-'
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
