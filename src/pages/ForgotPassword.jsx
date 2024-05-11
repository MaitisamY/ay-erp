import '../styles/login.css'

import { useTheme } from '../hooks/ThemeProvider'
import { useLoginFunction } from '../util/login/useLoginFunction'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'


function ForgotPassword() {

    document.title = 'ERP - Forgot Password'

    const { theme } = useTheme()

    const {
        loginData,
        showPassword,
        isLoading,
        handleChange,
        handleLogin,
        handleShowPassword
    } = useLoginFunction()

    return (
        <div className="login-page">

            <div className="left">
                <div className="menu-bar">
                    <ul>
                        <li>
                            <Link className="link" to="/docs">Docs</Link>
                        </li>
                        <li>
                            <Link className="link" to="/learn">Learn</Link>
                        </li>
                    </ul>
                 </div>   

                <video autoPlay muted loop>
                    <source src="/videos/1.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="right">
                <img src={`/images/${theme === 'light' ? 'erp' : 'erp-white'}.png`} alt="ERP" />

                <form onSubmit={handleLogin}>
                    <h1 className="title">Reset Password</h1>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange} 
                            placeholder="E.g. your@email.com"
                        />

                        {loginData.emailError && <p className="error">{loginData.emailError}</p>}
                    </div>

                    <button type="submit">
                        {
                            isLoading ? 
                            <div className="loader">
                                <span className="loading-spinner"></span>
                            </div> 
                            : 'Login'
                        }
                    </button>

                    <Link className="back" to="/"><span><FaArrowLeft /></span> Go to Login</Link>
                </form>

                <h5>Copyright &copy; {new Date().getFullYear()}. ay-folio ERP System.</h5>
            </div>
        </div>
    )
}

export default ForgotPassword