import '../styles/404.css'

import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'

function NotFound() {

    const goBack = () => {
        window.history.back(); // This will navigate back one step in the browser history
    }

    return (
        <div className="page-not-found">
            <img src="/images/404.png" alt="404" />

            <div className="text-holder">
                <h1 className="text-red">404</h1>
                <h2 className="text-red">Page Not Found</h2>
                <a className="link" onClick={goBack}><span><FaArrowLeft /></span> <i>Go Back</i></a>
            </div>
        </div>
    )
}

export default NotFound
