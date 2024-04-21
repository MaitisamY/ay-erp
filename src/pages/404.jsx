import '../styles/404.css'

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
                    <div className="container">
                        <div className="page-not-found">
                            <h2 className="text-red">Page Not Found</h2>
                            <img src="/images/404.png" alt="404" />
                        </div>
                    </div>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default NotFound
