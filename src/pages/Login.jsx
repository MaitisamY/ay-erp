import '../styles/login.css'

import { useTheme } from '../hooks/ThemeProvider'
import { useLoginFunction } from '../util/login/useLoginFunction'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


function Login() {

    document.title = 'ERP - Login'

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
                <video autoPlay muted loop>
                    <source src="/videos/1.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="right">
                <img src={`/images/${theme === 'light' ? 'erp' : 'erp-white'}.png`} alt="ERP" />
                <h1>Login to your account</h1>

                <form onSubmit={handleLogin}>

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

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="fielder">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password" 
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            <span onClick={handleShowPassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>

                        {loginData.passwordError && <p className="error">{loginData.passwordError}</p>}
                    </div>

                    <div className="form-group">
                        <Link className="link" to="/reset-password">Forgot Password?</Link>
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
                </form>
            </div>
        </div>
    )
}

export default Login