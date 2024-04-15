import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Header from '../partials/Header'
import Main from '../partials/Main'
import Footer from '../partials/Footer'

function Products() {
    return (
        <>
            <Sidebar />
            <Content>
                <Header />
                <Main>
                    <h1>All Products</h1>
                </Main>
                <Footer />
            </Content>
        </>
    )
}

export default Products
