
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'
import Footer from '../partials/Footer'

function NotFound() {

    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>
                    <h1>Page Not Found</h1>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default NotFound
