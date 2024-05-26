import { useState, useEffect } from 'react'
import validator from 'validator'
import { toast } from 'react-toastify'
import axios from 'axios'

import { useUser } from '../../hooks/UserProvider'


export const useLoginFunction = () => {

    const { updateUser, updateToken } = useUser()

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

    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password } = loginData

        if (email === '') {
            setLoginData({
                ...loginData,
                emailError: 'Email is required'
            })
            return;
        }
        if (!validator.isEmail(email)) {
            setLoginData({
                ...loginData,
                emailError: 'Invalid email address'
            })
            return;
        }
        if (password === '') {
            setLoginData({
                ...loginData,
                passwordError: 'Password is required'
            })
            return;
        }
        if (password.length < 6) {
            setLoginData({
                ...loginData,
                passwordError: 'Password must be at least 6 characters long'
            })
            return;
        }
        else {
            setIsLoading(true)

            try {
                const response = await axios.post('http://localhost:5000/login', {
                    email: email,
                    password: password
                })

                console.log(response.data.user);

                if (response.status === 200) {
                    updateToken(response.data.token)
                    updateUser(response.data.user)
                    setTimeout(() => {
                        window.location.href = '/dashboard'
                    }, 2000)
                }
            } catch (error) {
                setTimeout(() => {
                    toast.error(error.response.data.error, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: 'dark',
                    })
                }, 3000)
            }
        }
        // Delay setting isLoading to false by 3 seconds
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
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