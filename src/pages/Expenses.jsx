import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'
import Footer from '../partials/Footer'

function Expenses() {

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>
                    <h1>All Expenses</h1>
                </Main>
            </Content>
        </>
    )
}

export default Expenses
