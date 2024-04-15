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
                    <h1>All Users</h1>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default Users
