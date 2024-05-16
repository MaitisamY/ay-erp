import '../../styles/settings.css'

import { useEffect } from 'react'
import { useOrganizationCredential } from '../../hooks/OrganizationCredentialProvider'
import { useTheme } from '../../hooks/ThemeProvider'
import { Link } from 'react-router-dom'
import { useUOMFunctions } from '../../util/settings/useUOMFunctions'
import { usePagination } from '../../helpers/Pagination.js'
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

function UOM() {

    const { organizationCredential } = useOrganizationCredential()
    const { theme } = useTheme()

    const { 
        uom, 
        uoms, 
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
    } = useUOMFunctions()

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
    } = usePagination({ data: uoms })

    const currentItems = uoms.slice(indexOfFirstItem, indexOfLastItem)
    const filteredItems = uoms.filter(uom => uom.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
                            <Link to="/settings/uom" className="link active">
                                Units of Measurement (UOM)
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/categories" className="link">
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings/brands" className="link">
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
                        <h2>Unit Settings</h2>
                        <div className="box">
                            <div className="inner-box-1">
                                <Card title="Add unit" classes="card card-xx-large">
                                    <Form onSubmit={handleSubmit}>
                                        <h4>Every unit's status is Active by default</h4>
                                        <div className="form-group">
                                            <label htmlFor="name">Define Unit</label>
                                            <input 
                                                type="text" 
                                                name="unit" 
                                                id="unit" 
                                                value={uom} 
                                                onChange={handleChange} 
                                                placeholder="E.g. Kg" 
                                            />
                                        </div>
                                        {serverResponse && <h6 className="text-red">{serverResponse}</h6>}
                                        <button 
                                            type="submit"
                                            disabled={!uom || uom.length < 2}
                                            title={!uom ? 'Add unit first' : null}
                                        >
                                            Add
                                        </button>
                                    </Form>
                                </Card>
                            </div>
                            <div className="inner-box-2">
                                <Card title="All Units" classes="card card-xx-large">
                                    {   
                                        !uoms ? (
                                            <h5>Loading...</h5>
                                        ) : uoms.length === 0 ? ( 
                                            <h5>No units available</h5>
                                        ) : (
                                        <>
                                            <PrePagination 
                                                serachPlaceholder="Search UOMs..."
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
                                                                        onClick={() => setSelectedItems(uoms.map(uom => uom.id))} 
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </th>
                                                    {
                                                        Object.keys(uoms[0]).map((key, index) => (
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
                                                            {currentItems.map((uom, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div>
                                                                            {
                                                                                selectedItems.includes(uom.id) ? (
                                                                                    <MdCheckBox 
                                                                                        size={20} 
                                                                                        style={{ cursor: 'pointer'}}
                                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                                        onClick={() => handleSelection(uom.id)} 
                                                                                    />
                                                                                ) : (
                                                                                    <MdCheckBoxOutlineBlank 
                                                                                        size={20} 
                                                                                        style={{ cursor: 'pointer'}}
                                                                                        onClick={() => handleSelection(uom.id)} 
                                                                                    />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td>{uoms.indexOf(uom) + 1}</td>
                                                                    <td>{uom.name}</td>
                                                                    <td>
                                                                        <a 
                                                                            className={`link ${colorVariation(uom.status, theme)}`} 
                                                                            onClick={() => handleUpdate(uom.id, uom.status)}
                                                                            title={uom.status === 1 ? 'Deactivate unit' : 'Activate unit'}
                                                                        >
                                                                            {
                                                                                uom.status === 1 ? <MdOutlineToggleOn size={24} /> 
                                                                                : <MdOutlineToggleOff size={24} />
                                                                            }
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <button 
                                                                            className="danger" 
                                                                            onClick={() => handleDelete(uom.id)}
                                                                            title={`Delete unit: ${uom.name}`}
                                                                        >
                                                                            <FaTrashAlt />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    ) : filteredItems.length === 0 ? (
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={4}>No results found</td>
                                                            </tr>
                                                        </tbody>
                                                    ) : (
                                                        <tbody>
                                                            {filteredItems.map((uom, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div style={{ cursor: 'pointer'}}>
                                                                            {
                                                                                selectedItems.includes(uom.id) ? (
                                                                                    <MdCheckBox 
                                                                                        size={20} 
                                                                                        style={{ cursor: 'pointer'}}
                                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                                        onClick={() => handleSelection(uom.id)} 
                                                                                    />
                                                                                ) : (
                                                                                    <MdCheckBoxOutlineBlank 
                                                                                        size={20} 
                                                                                        style={{ cursor: 'pointer'}}
                                                                                        onClick={() => handleSelection(uom.id)} 
                                                                                    />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td>{uoms.indexOf(uom) + 1}</td>
                                                                    <td>{uom.name}</td>
                                                                    <td>
                                                                        <a 
                                                                            className={`link ${colorVariation(uom.status, theme)}`} 
                                                                            onClick={() => handleUpdate(uom.id, uom.status)}
                                                                            title={uom.status === 1 ? 'Deactivate unit' : 'Activate unit'}
                                                                        >
                                                                            {
                                                                                uom.status === 1 ? <MdOutlineToggleOn size={24} /> 
                                                                                : <MdOutlineToggleOff size={24} />
                                                                            }
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <button 
                                                                            className="danger" 
                                                                            onClick={() => handleDelete(uom.id)}
                                                                            title={`Delete unit: ${uom.name}`}
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
                                                data={uoms}
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

export default UOM
