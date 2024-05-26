import '../../styles/settings.css'

import { useEffect } from 'react'
import { useOrganizationCredential } from '../../hooks/OrganizationCredentialProvider'
import { useTheme } from '../../hooks/ThemeProvider'
import { Link } from 'react-router-dom'
import { useCategoryFunctions } from '../../util/settings/useCategoryFunctions.js'
import { usePagination } from '../../helpers/Pagination.js'
import { FaTrashAlt } from 'react-icons/fa'
import { MdOutlineToggleOff, MdOutlineToggleOn, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Card from '../../components/Card'
import Form from '../../components/Form'
import PrePagination from '../../components/pagination/PrePagination'
import Pagination from '../../components/pagination/Pagination'

function Categories() {

    const { organizationCredential } = useOrganizationCredential()
    const { theme } = useTheme()

    const {
        category,
        categories,
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
    } = useCategoryFunctions()

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
    } = usePagination({ data: categories })

    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem)
    const filteredItems = categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
                            <Link to="/settings/categories" className="link active">
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
                        <h2>Category Settings</h2>
                        <div className="box">
                            <div className="inner-box-1">
                                <Card title="Add unit" classes="card card-xx-large">
                                    <Form onSubmit={handleSubmit}>
                                        <h4>Every category's status is Active by default</h4>
                                        <div className="form-group">
                                            <label htmlFor="category">Define Category</label>
                                            <input 
                                                type="text" 
                                                name="category" 
                                                id="category" 
                                                value={category} 
                                                onChange={handleChange} 
                                                placeholder="E.g. Pencil" 
                                            />
                                        </div>
                                        {serverResponse && <h6 className="text-red">{serverResponse}</h6>}
                                        <button 
                                            className="theme"
                                            type="submit"
                                            disabled={!category || category.length < 2}
                                            title={!category ? 'Add category first' : null}
                                        >
                                            Add
                                        </button>
                                    </Form>
                                </Card>
                            </div>
                            <div className="inner-box-2">
                                <Card title="All Categories" classes="card card-xx-large">
                                    {   
                                        !categories ? (
                                            <h5>Loading...</h5>
                                        ) : categories.length === 0 ? ( 
                                            <h5>No categories available</h5>
                                        ) : (
                                        <>
                                            <PrePagination 
                                                serachPlaceholder="Search categories..."
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
                                                                        onClick={() => setSelectedItems(categories.map(cat => cat.id))} 
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </th>
                                                    {
                                                        Object.keys(categories[0]).map((key, index) => (
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
                                                        {currentItems.map((cat, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div>
                                                                        {
                                                                            selectedItems.includes(cat.id) ? (
                                                                                <MdCheckBox 
                                                                                    size={20} 
                                                                                    style={{ cursor: 'pointer'}}
                                                                                    className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                                    onClick={() => handleSelection(cat.id)} 
                                                                                />
                                                                            ) : (
                                                                                <MdCheckBoxOutlineBlank 
                                                                                    size={20} 
                                                                                    style={{ cursor: 'pointer'}}
                                                                                    onClick={() => handleSelection(cat.id)} 
                                                                                />
                                                                            )
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>{categories.indexOf(cat) + 1}</td>
                                                                <td>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</td>
                                                                <td>
                                                                    <a 
                                                                        className={`link ${colorVariation(cat.status, theme)}`} 
                                                                        onClick={() => handleUpdate(cat.id, cat.status)}
                                                                        title={cat.status === 1 ? 'Deactivate category' : 'Activate category'}
                                                                    >
                                                                        {cat.status === 1 ? <MdOutlineToggleOn size={24} /> : <MdOutlineToggleOff size={24} />}
                                                                    </a>
                                                                </td>
                                                                <td>
                                                                    <button 
                                                                        className="danger" 
                                                                        onClick={() => handleDelete(cat.id)}
                                                                        title={`Delete category: ${cat.name}`}
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
                                                            {filteredItems.map((cat, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div style={{ cursor: 'pointer'}}>
                                                                            {
                                                                                selectedItems.includes(cat.id) ? (
                                                                                    <MdCheckBox 
                                                                                        size={20} 
                                                                                        style={{ cursor: 'pointer'}}
                                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                                        onClick={() => handleSelection(cat.id)} 
                                                                                    />
                                                                                ) : (
                                                                                    <MdCheckBoxOutlineBlank 
                                                                                        size={20} 
                                                                                        style={{ cursor: 'pointer'}}
                                                                                        onClick={() => handleSelection(cat.id)} 
                                                                                    />
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td>{categories.indexOf(cat) + 1}</td>
                                                                    <td>{cat.name}</td>
                                                                    <td>
                                                                        <a 
                                                                            className={`link ${colorVariation(cat.status, theme)}`} 
                                                                            onClick={() => handleUpdate(cat.id, cat.status)}
                                                                            title={cat.status === 1 ? 'Deactivate category' : 'Activate category'}
                                                                        >
                                                                            {cat.status === 1 ? <MdOutlineToggleOn size={24} /> : <MdOutlineToggleOff size={24} />}
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <button 
                                                                            className="danger" 
                                                                            onClick={() => handleDelete(cat.id)}
                                                                            title={`Delete category: ${cat.name}`}
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
                                                data={categories}
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

export default Categories
