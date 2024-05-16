
import { Link } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'
import Footer from '../partials/Footer'

function Users() {

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
                    </div>

                </Main>
            </Content>
        </>
    )
}

export default Users
