import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/ThemeProvider'
import { useUserFunctions } from '../util/users/useUserFunctions.js'
import { usePagination } from '../helpers/Pagination.js'
import { useUser } from '../hooks/UserProvider'

import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

import PrePagination from '../components/pagination/PrePagination'
import Pagination from '../components/pagination/Pagination'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'

function Users() {
    const { theme } = useTheme()
    const { user } = useUser()
    const { users, loading, selectedItems, setSelectedItems, handleSelection } = useUserFunctions()

    // Filter out the current user globally
    const filteredUsers = users.filter(item => item.id !== user.id);

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
    } = usePagination({ data: filteredUsers });

    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const filteredItems = currentItems.filter(
        item => item.name.toLowerCase().includes(searchTerm.toLowerCase())
            || item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <Link to="/users" className="link active">
                                All Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/add" className="link">
                                Add User
                            </Link>
                        </li>
                    </div>

                    <div className="container">
                        <h2>Users data</h2>

                        <div className="box">
                            {loading ? (
                                    <div className="loader">
                                        <div className="loading-spinner-style-two"></div> Loading ...
                                    </div>
                                ) : (
                                <>
                                <PrePagination 
                                    items={filteredUsers} 
                                    searchPlaceholder="Search by Name or email..."
                                    totalPages={totalPages}
                                    handleItemsPerPage={handleItemsPerPage}
                                    handleSearchTerm={handleSearchTerm}
                                    selectedItems={selectedItems}
                                    isImportable={true}
                                    isExportable={true}
                                />
                                    {filteredUsers.length === 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th colSpan={8} className="text-center">
                                                        No data found
                                                    </th>
                                                </tr>
                                            </thead>
                                        </table>
                                    ) : (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <div style={{ cursor: 'pointer' }}>
                                                            {
                                                                selectedItems.length > 0 ? (
                                                                    <MdCheckBox
                                                                        size={20}
                                                                        style={{ cursor: 'pointer' }}
                                                                        className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                        onClick={() => setSelectedItems([])}
                                                                    />
                                                                ) : (
                                                                    <MdCheckBoxOutlineBlank
                                                                        size={20}
                                                                        onClick={() => setSelectedItems(filteredItems.map(item => item.id))}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </th>
                                                    <th>#</th>
                                                    <th>Photo</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            {!searchTerm ? (
                                                <tbody>
                                                    {currentItems.map((currentUser, index) => (
                                                        <tr key={index} style={user.id === currentUser.id ? { backgroundColor: '#31eb3152' } : {}}>
                                                            <td>
                                                                <div>
                                                                    {
                                                                        selectedItems.includes(currentUser.id) ? (
                                                                            <MdCheckBox
                                                                                size={20}
                                                                                style={{ cursor: 'pointer' }}
                                                                                className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                                onClick={() => handleSelection(currentUser.id)}
                                                                            />
                                                                        ) : (
                                                                            <MdCheckBoxOutlineBlank
                                                                                size={20}
                                                                                style={{ cursor: 'pointer' }}
                                                                                onClick={() => handleSelection(currentUser.id)}
                                                                            />
                                                                        )
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>{filteredUsers.indexOf(currentUser) + 1}</td>
                                                            <td>{currentUser.photo ? <img src={currentUser.photo} alt={currentUser.name} /> : '--'}</td>
                                                            <td>{currentUser.name} <span>{currentUser.role === 1 ? 'Admin' : currentUser.role === 2 ? 'Manager' : 'User'}</span></td>
                                                            <td>{currentUser.email}</td>
                                                            <td>{currentUser.phone ? currentUser.phone : '--'}</td>
                                                            <td>{currentUser.address ? currentUser.address : '--'}</td>
                                                            <td>
                                                                {
                                                                    user.role === 3 ? (
                                                                        <p className="text-red">Unauthorized for any action</p>
                                                                    ) : (
                                                                        <div className="btn-group">
                                                                            <button className="edit" title={`Edit User: ${currentUser.name}`}>
                                                                                <FaEdit />
                                                                            </button>
                                                                            <button className="danger" title={`Delete User: ${currentUser.name}`}>
                                                                                <FaTrashAlt />
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            ) : (
                                                <tbody>
                                                    {filteredItems.length === 0 ? (
                                                            <tr>
                                                                <td className="text-red text-center" colSpan="8">No matching results found</td>
                                                            </tr>
                                                        ) : (
                                                        filteredItems.map((currentUser, index) => (
                                                        <tr key={index} style={user.id === currentUser.id ? { backgroundColor: '#31eb3152' } : {}}>
                                                            <td>
                                                                <div>
                                                                    {
                                                                        selectedItems.includes(currentUser.id) ? (
                                                                            <MdCheckBox
                                                                                size={20}
                                                                                style={{ cursor: 'pointer' }}
                                                                                className={theme === 'dark' ? 'text-lime-green' : 'text-green'}
                                                                                onClick={() => handleSelection(currentUser.id)}
                                                                            />
                                                                        ) : (
                                                                            <MdCheckBoxOutlineBlank
                                                                                size={20}
                                                                                style={{ cursor: 'pointer' }}
                                                                                onClick={() => handleSelection(currentUser.id)}
                                                                            />
                                                                        )
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>{filteredUsers.indexOf(currentUser) + 1}</td>
                                                            <td>{currentUser.photo ? <img src={currentUser.photo} alt={currentUser.name} /> : '--'}</td>
                                                            <td>{currentUser.name} <span>{currentUser.role === 1 ? 'Admin' : currentUser.role === 2 ? 'Manager' : 'User'}</span></td>
                                                            <td>{currentUser.email}</td>
                                                            <td>{currentUser.phone ? currentUser.phone : '--'}</td>
                                                            <td>{currentUser.address ? currentUser.address : '--'}</td>
                                                            <td>
                                                                {
                                                                    user.role === 3 ? (
                                                                        <p className="text-red">Unauthorized for any action</p>
                                                                    ) : (
                                                                        <div className="btn-group">
                                                                            <button className="edit" title={`Edit currentUser: ${currentUser.name}`}>
                                                                                <FaEdit />
                                                                            </button>
                                                                            <button className="danger" title={`Delete currentUser: ${currentUser.name}`}>
                                                                                <FaTrashAlt />
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    )))}
                                                </tbody>
                                            )}
                                        </table>
                                    )}
                                    <Pagination
                                        data={currentItems}
                                        handleCurrentPage={handleCurrentPage}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        firstPage={firstPage}
                                        previousPage={previousPage}
                                        nextPage={nextPage}
                                        lastPage={lastPage}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                </Main>
            </Content>
        </>
    )
}

export default Users
