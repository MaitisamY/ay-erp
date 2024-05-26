import { FaUsers, FaUserShield, FaCreditCard, FaDollarSign } from 'react-icons/fa'

import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'

function Dashboard() {

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>
                    
                    <div className="container">

                        <div className="dashboard-item-container">
                            <div className="dashboard-specifier">
                                <div>
                                    <h2>Users</h2>
                                    <i><FaUsers size={30} /></i>
                                </div>
                                <div><h3>1</h3></div>
                            </div>
                            <div className="dashboard-specifier">
                                <div>
                                    <h2>Customers</h2>
                                    <i><FaUserShield size={30} /></i>
                                </div>
                                <div><h3>26</h3></div>
                            </div>
                            <div className="dashboard-specifier">
                                <div>
                                    <h2>Sale</h2>
                                    <i><FaCreditCard size={30} /></i>
                                </div>
                                <div><h3>26</h3></div>
                            </div>
                            <div className="dashboard-specifier">
                                <div>
                                    <h2>Expense</h2>
                                    <i><FaDollarSign size={30} /></i>
                                </div>
                                <div><h3>$ 5120</h3></div>
                            </div>
                        </div>

                    </div>
                </Main>
            </Content>
        </>
    )
}

export default Dashboard
