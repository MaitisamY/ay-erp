import { useState, useEffect } from 'react'
import validator from 'validator'
import { toast } from 'react-toastify'
import axios from 'axios'


export const useLoginFunction = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)

    const [isLoading, setIsLoading] = useState(false)

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
        else {
            setIsLoading(true)

            try {
                const response = axios.post('/login', {
                    email: loginData.email,
                    password: loginData.password
                })

                if (response.status === 200) {
                    toast.success(response.data.message)
                    setTimeout(() => {
                        window.location.href = '/dashboard'
                    }, 2000)
                }
            } catch (error) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'light',
                })
            }
        }
        setIsLoading(false)
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
        isLoading,
        handleChange,
        handleLogin,
        handleShowPassword
    }
}