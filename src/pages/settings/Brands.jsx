import '../../styles/settings.css'

import { useEffect } from 'react'
import { useOrganizationCredential } from '../../hooks/OrganizationCredentialProvider'
import { useTheme } from '../../hooks/ThemeProvider'
import { Link } from 'react-router-dom'
import { usebrandFunctions } from '../../util/settings/useBrandFunctions'
import { usePagination } from '../../helpers/Pagination'
import { FaTrashAlt } from 'react-icons/fa'
import { MdOutlineToggleOff, MdOutlineToggleOn, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Footer from '../../partials/Footer'
import Card from '../../components/Card'
import Form from '../../components/Form'
import PrePagination from '../../components/pagination/PrePagination'
import Pagination from '../../components/pagination/Pagination'

function brands() {

    const { organizationCredential } = useOrganizationCredential()
    const { theme } = useTheme()

    const {
        brand,
        brands,
        serverResponse,
        selectedItems,
        setSelectedItems,
        handleSelection,
        colorVariation,
        handleChange,
        handleSubmit,
        handleDelete,
        handleUpdate,
        handleDeleteMultiple
    } = usebrandFunctions()

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
    } = usePagination({ data: brands })

    const currentItems = brands.slice(indexOfFirstItem, indexOfLastItem)
    const filteredItems = brands.filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
                            <Link to="/settings" className="link">
                                General
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/uom" className="link">
                                Units of Measurement (UOM)
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/categories" className="link">
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/brands" className="link active">
                                Brands
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/tax" className="link">
                                Tax
                            </Link>
                        </li>
                    </div>
                    <div className="container">
                        <h2>Brand Settings</h2>
                        <div className="box">
                            <div className="inner-box-1">
                                <Card title="Add unit" classes="card card-xx-large">
                                    <Form onSubmit={handleSubmit}>
                                        <h4>Every brand's status is Active by default</h4>
                                        <div className="form-group">
                                            <label htmlFor="brand">Define brand</label>
                                            <input 
                                                type="text" 
                                                name="brand" 
                                                id="brand" 
                                                value={brand} 
                                                onChange={handleChange} 
                                                placeholder="E.g. Dollar" 
                                            />
                                        </div>
                                        {serverResponse && <h6 className="text-red">{serverResponse}</h6>}
                                        <button 
                                            type="submit"
                                            disabled={!brand || brand.length < 2}
                                            title={!brand ? 'Add brand first' : null}
                                        >
                                            Add
                                        </button>
                                    </Form>
                                </Card>
                            </div>
                            <div className="inner-box-2">
                                <Card title="All brands" classes="card card-xx-large">
                                    {   
                                        !brands ? (
                                            <h5>Loading...</h5>
                                        ) : brands.length === 0 ? ( 
                                            <h5>No brands available</h5>
                                        ) : (
                                        <>
                                            <PrePagination 
                                                serachPlaceholder="Search brands..."
                                                totalPages={totalPages}
                                                handleItemsPerPage={handleItemsPerPage}
                                                handleSearchTerm={handleSearchTerm}
                                                selectedItems={selectedItems}
                                                handleDeleteMultiple={handleDeleteMultiple}
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
                                                                        onClick={() => setSelectedItems(brands.map(cat => cat.id))} 
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </th>
                                                    {
                                                        Object.keys(brands[0]).map((key, index) => (
                                                            <th key={index}>
                                                                {key === 'id' ? '#' : key.charAt(0).toUpperCase() + key.slice(1)}
                                                            </th>
                                                        ))
                                                    }
                                                    <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    !searchTerm ? (
                                                    <tbody>
                                                        {currentItems.map((brand, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div>
                                                                        {
                                                                            selectedItems.includes(brand.id) ? (
                                                                                <MdCheckBox 
                                                                                    size={20} 
                                                                                    style={{ cursor: 'pointer'}}
                                                                                    className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                                    onClick={() => handleSelection(brand.id)} 
                                                                                />
                                                                            ) : (
                                                                                <MdCheckBoxOutlineBlank 
                                                                                    size={20} 
                                                                                    style={{ cursor: 'pointer'}}
                                                                                    onClick={() => handleSelection(brand.id)} 
                                                                                />
                                                                            )
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>{brands.indexOf(brand) + 1}</td>
                                                                <td>{brand.name.charAt(0).toUpperCase() + brand.name.slice(1)}</td>
                                                                <td>
                                                                    <a 
                                                                        className={`link ${colorVariation(brand.status, theme)}`} 
                                                                        onClick={() => handleUpdate(brand.id, brand.status)}
                                                                        title={brand.status === 1 ? 'Deactivate brand' : 'Activate brand'}
                                                                    >
                                                                        {brand.status === 1 ? <MdOutlineToggleOn size={24} /> : <MdOutlineToggleOff size={24} />}
                                                                    </a>
                                                                </td>
                                                                <td>
                                                                    <button 
                                                                        className="danger" 
                                                                        onClick={() => handleDelete(brand.id)}
                                                                        title={`Delete brand: ${brand.name}`}
                                                                    >
                                                                        <FaTrashAlt />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    ) : filteredItems === 0 ? (
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={4}>No results found</td>
                                                            </tr>
                                                        </tbody>
                                                    ) : (
                                                        <tbody>
                                                            {filteredItems.map((brand, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div style={{ cursor: 'pointer'}}>
                                                                            {
                                                                                selectedItems.includes(brand.id) ? (
                                                                                    <MdCheckBox 
                                                                                        size={20} 
                                                                                        style={{ cursor: 'pointer'}}
                                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                                        onClick={() => handleSelection(brand.id)} 
                                                                                    />
                                                                                ) : (
                                                                                    <MdCheckBoxOutlineBlank 
                                                                                        size={20} 
                                                                                        style={{ cursor: 'pointer'}}
                                                                                        onClick={() => handleSelection(brand.id)} 
                                                                                    />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td>{brands.indexOf(brand) + 1}</td>
                                                                    <td>{brand.name}</td>
                                                                    <td>
                                                                        <a 
                                                                            className={`link ${colorVariation(brand.status, theme)}`} 
                                                                            onClick={() => handleUpdate(brand.id, brand.status)}
                                                                            title={cat.status === 1 ? 'Deactivate brand' : 'Activate brand'}
                                                                        >
                                                                            {cat.status === 1 ? <MdOutlineToggleOn size={24} /> : <MdOutlineToggleOff size={24} />}
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <button 
                                                                            className="danger" 
                                                                            onClick={() => handleDelete(brand.id)}
                                                                            title={`Delete brand: ${brand.name}`}
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
                                                data={brands}
                                                handleCurrentPage={handleCurrentPage}
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                firstPage={firstPage}
                                                previousPage={previousPage}
                                                nextPage={nextPage}
                                                lastPage={lastPage}
                                            />
                                        </>
                                        )
                                    }
                                </Card>
                            </div>
                        </div>
                    </div>
                </Main>
            </Content>
        </>
    )
}

export default brands
