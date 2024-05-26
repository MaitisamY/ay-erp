import '../styles/login.css'

import { useTheme } from '../hooks/ThemeProvider'
import { useUser } from '../hooks/UserProvider'
import { useLoginFunction } from '../util/login/useLoginFunction'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


function Login() {

    document.title = 'ERP - Login'

    const { theme } = useTheme()
    const { token } = useUser()

    const navigate = useNavigate()

    const {
        loginData,
        showPassword,
        isLoading,
        handleChange,
        handleLogin,
        handleShowPassword
    } = useLoginFunction()

    if (token){
        navigate('/dashboard')
    }

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
                    <h1 className="title">Login to your account</h1>

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

                        {
                            loginData.emailError && 
                            <p className="error" style={{ textShadow: theme === 'light' ? '#fff 0 0 5px' : '#000 0px 0px 5px' }}>{loginData.emailError}</p>
                        }
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

                        {
                            loginData.passwordError && 
                            <p className="error" style={{ textShadow: theme === 'light' ? '#fff 0 0 5px' : '#000 0px 0px 5px' }}>{loginData.passwordError}</p>
                        }
                    </div>

                    <div className="form-group">
                        <Link className="link" to="/reset-password">Forgot Password?</Link>
                    </div>

                    <button 
                        className="green"
                        type="submit" 
                        disabled={isLoading}
                        title={isLoading ? 'Loading... Please wait' : ''}
                    >
                        {
                            isLoading ? 
                            <div className="loader">
                                <span className="loading-spinner"></span> Please wait
                            </div> 
                            : 'Login'
                        }
                    </button>
                </form>

                <h5>Copyright &copy; {new Date().getFullYear()}. ay-folio ERP System.</h5>
            </div>
        </div>
    )
}

export default Login