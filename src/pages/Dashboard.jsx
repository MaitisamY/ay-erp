import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'
import Footer from '../partials/Footer'

function Dashboard() {

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>
                    <h1>Welcome!</h1>
                </Main>
            </Content>
        </>
    )
}

export default Dashboard
