
import { Link } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Footer from '../../partials/Footer'

import AddUserForm from './AddUserForm'

function AddUser() {

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>
                    
                    <div className="pills">
                        <li>
                            <Link to="/users" className="link">
                                All Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/add" className="link active">
                                Add User
                            </Link>
                        </li>
                    </div>

                    <div className="container">
                        <h2>Add User Form</h2>
                        
                        <AddUserForm />
                    </div>

                </Main>
            </Content>
        </>
    )
}

export default AddUser