import { useState, useEffect } from 'react'
import validator from 'validator'
import { toast } from 'react-toastify'


export const useLoginFunction = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData({ 
            ...loginData, 
            [name]: value 
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        if (loginData.email === '') {
            setLoginData({
                ...loginData,
                emailError: 'Email is required'
            })
            return;
        }
        if (!validator.isEmail(loginData.email)) {
            setLoginData({
                ...loginData,
                emailError: 'Invalid email address'
            })
            return;
        }
        if (loginData.password === '') {
            setLoginData({
                ...loginData,
                passwordError: 'Password is required'
            })
            return;
        }
        if (loginData.password.length < 6) {
            setLoginData({
                ...loginData,
                passwordError: 'Password must be at least 6 characters long'
            })
            return;
        }

        // Login successful
        toast.success('Login successful', {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }

    useEffect(() => {
        if (validator.isEmail(loginData.email) && loginData.email.length >= 6) {
            setLoginData({
                ...loginData,
                emailError: '',
            })
        }

        if (loginData.password.length >= 6) {
            setLoginData({
                ...loginData,
                passwordError: '',
            })
        }
    }, [loginData.email, loginData.password])

    return {
        loginData,
        showPassword,
        handleChange,
        handleLogin,
        handleShowPassword
    }
}