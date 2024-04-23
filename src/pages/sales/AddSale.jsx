
import { Link } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import Content from '../../components/Content'
import Header from '../../partials/Header'
import Main from '../../partials/Main'
import Footer from '../../partials/Footer'
import Card from '../../components/Card'
import Form from '../../components/Form'

function AddSale() {
    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>
                    <div className="pills">
                        <li>
                            <Link to="/sales" className="link">
                                All Sales
                            </Link>
                        </li>
                        <li>
                            <Link to="/sales/add" className="link active">
                                Add Sale
                            </Link>
                        </li>
                    </div>

                    <div className="container">
                        <h2>Sale Details Form</h2>

                        <div className="box"></div>
                    </div>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default AddSale
