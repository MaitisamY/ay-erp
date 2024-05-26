
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import validator from 'validator'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

import Form from '../../components/Form'
import Card from '../../components/Card'

import { getTheValues } from '../../helpers/CommonHelper.js'

function AddUserForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        password: '',
        confirmPassword: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ 
            ...prev, [name]: value 
        }))
    }

    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const { name, email, phone, address, role, password } = formData

        if (!name || !email || !role || !password) {
            setErrors({
                name: !name ? 'Name is required' : '',
                email: !email ? 'Email is required' : '',
                phone: !phone ? 'Phone is required' : '',
                address: !address ? 'Address is required' : '',
                role: !role ? 'Role is required' : '',
                password: !password ? 'Password is required' : ''
            })
            return
        }

        if (!validator.isEmail(email)) {
            setErrors(prev => ({ ...prev, email: 'Invalid email address' }))
            return
        }

        if (password !== formData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
            return
        }
        else {}
        setIsLoading(true)

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/add/user`, {
                name: name,
                email: email,
                phone: phone,
                address: address,
                role: role,
                password: password
            })

            if (response.data.status === 200) {
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        role: '',
                        password: '',
                        confirmPassword: ''
                    })
                    toast.success(response.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: 'dark',
                    })
                }, 2000)
                
            } else {
                setTimeout(() => {
                    toast.error(response.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: 'dark',
                    });
                }, 2000)
            }
        } catch (error) {
            console.error('Error submitting form:', error); // Log the error message
            setTimeout(() => {
                toast.error(error.response?.data?.message || 'An error occurred', {
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
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }
    
    const valuesValid = getTheValues(formData);

    const generatePassword = (length) => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            randomPassword += chars[randomIndex];
        }
        setFormData(prev => ({ 
            ...prev, 
            password: randomPassword,
            confirmPassword: randomPassword 
        }));
    }    

    return (
        <div className="box">
            <ul className="sale-list-items">
                <li><h4>Fields with (<i className="text-red">*</i>) are mandatory</h4></li>
                <li><h4>Datalist is used for the ease of role selection</h4></li>
            </ul>
            <div className="inner-box-2">
                <Form onSubmit={handleFormSubmit}>
                    
                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="name">Name<i>*</i></label>
                            <input 
                                type="text"
                                name="name" 
                                value={formData.name} 
                                id="name"  
                                placeholder="E.g. John Doe"
                                onChange={handleChange}
                            />
                            {errors.name && <span className="text-red">{errors.name}</span>}
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="email">Email<i>*</i></label>
                            <div className="input-group bordered">
                                <input 
                                    type="email"
                                    name="email" 
                                    value={formData.email} 
                                    id="email" 
                                    placeholder="E.g. johnDoe@mail.com" 
                                    onChange={handleChange} 
                                />
                            </div>
                            {errors.email && <span className="text-red">{errors.email}</span>}
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <div className="input-group bordered">
                                <input 
                                    type="text"
                                    name="phone" 
                                    value={formData.phone} 
                                    id="phone" 
                                    placeholder="E.g. +2348123456789" 
                                    onChange={handleChange} 
                                />
                            </div>
                            {errors.phone && <span className="text-red">{errors.phone}</span>}
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="password">Password<i>*</i></label>
                            <div className="input-group bordered">
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    name="password" 
                                    value={formData.password} 
                                    id="password" 
                                    placeholder="Enter a good password" 
                                    onChange={handleChange} 
                                />
                                <p style={{ cursor: 'pointer' }} onClick={handleShowPassword}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</p>
                            </div>
                            {errors.password && <span className="text-red">{errors.password}</span>}
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password<i>*</i></label>
                            <div className="input-group bordered">
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    id="confirmPassword" 
                                    placeholder="Confirm that good password" 
                                    onChange={handleChange} 
                                />
                                <p style={{ cursor: 'pointer' }} onClick={handleShowConfirmPassword}>{showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}</p>
                            </div>
                            {errors.confirmPassword && <span className="text-red">{errors.confirmPassword}</span>}
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Generate Password</label>
                            <select name="length" id="length" onChange={(e) => generatePassword(parseInt(e.target.value, 10))}>
                                <option value="">Select</option>
                                <option value="8">8 random characters</option>
                                <option value="12">12 random characters</option>
                                <option value="16">16 random characters</option>
                                <option value="20">20 random characters</option>
                            </select>
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="role">Role<i>*</i></label>
                            <input 
                                type="text"
                                name="role" 
                                value={formData.role} 
                                id="role"  
                                placeholder="E.g. John Doe"
                                onChange={handleChange}
                                list="roles"
                            />
                            {errors.role && <span className="text-red">{errors.role}</span>}
                            <datalist id="roles">
                                <option value="1" label="Admin" />
                                <option value="2" label="Manager" />
                                <option value="3" label="Staff" />
                            </datalist>
                        </div>
                    </Card>

                    <Card classes="card-less card-large">
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text"
                                name="address" 
                                value={formData.address} 
                                id="address" 
                                placeholder="E.g. 5th Avenue, New York" 
                                onChange={handleChange} 
                            />
                            {errors.address && <span className="text-red">{errors.address}</span>}
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        {
                            formData.name.length >= 3 && formData.email.length >= 3 && formData.password.length >= 3 && formData.confirmPassword.length >= 3 && formData.role.length >= 1 
                            ? 
                            <button className="theme" type="submit" disabled={isLoading}>
                                {
                                    isLoading ? 
                                    <div className="loader">
                                        <span className="loading-spinner"></span> Please wait
                                    </div> 
                                    : 'Add User'
                                }
                            </button> 
                            : 
                            <button type="submit" disabled>Add User</button>
                        }
                    </Card>
                    
                </Form>
            </div>
        </div>
    )
}

export default AddUserForm