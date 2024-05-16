
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import validator from 'validator'

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ 
            ...prev, [name]: value 
        }))
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

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
                toast.success(response.data.message)
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    role: '',
                    password: '',
                    confirmPassword: ''
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    
    const valuesValid = getTheValues(formData);

    return (
        <div className="box">
            <ul className="sale-list-items">
                <li><h4>Fields with (<i className="text-red">*</i>) are mandatory</h4></li>
                <li><h4>Datalist is used for the ease of role selection</h4></li>
            </ul>
            <div className="inner-box-2">
                <Form onSubmit={() => {}}>
                    
                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="name">Name<i>*</i></label>
                            <input // customer name can be manual or from existing customers
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
                                <input // customer name can be manual or from existing customers
                                    type="email"
                                    name="email" 
                                    value={formData.email} 
                                    id="email" 
                                    placeholder="E.g. johnDoe@mail.com" 
                                    onChange={handleChange} 
                                />
                                {errors.email && <span className="text-red">{errors.email}</span>}
                            </div>
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <div className="input-group bordered">
                                <input // customer name can be manual or from existing customers
                                    type="text"
                                    name="phone" 
                                    value={formData.phone} 
                                    id="phone" 
                                    placeholder="E.g. +2348123456789" 
                                    onChange={handleChange} 
                                />
                                {errors.phone && <span className="text-red">{errors.phone}</span>}
                            </div>
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="role">Role<i>*</i></label>
                            <input // customer name can be manual or from existing customers
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

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="password">Password<i>*</i></label>
                            <div className="input-group bordered">
                                <input // customer name can be manual or from existing customers
                                    type={showPassword ? 'text' : 'password'}
                                    name="password" 
                                    value={formData.password} 
                                    id="password" 
                                    placeholder="Enter a good password" 
                                    onChange={handleChange} 
                                />
                                <i onClick={() => setShowPassword(!showPassword)} className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                {errors.password && <span className="text-red">{errors.password}</span>}
                            </div>
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password<i>*</i></label>
                            <div className="input-group bordered">
                                <input // customer name can be manual or from existing customers
                                    type="text"
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    id="confirmPassword" 
                                    placeholder="Confirm that good password" 
                                    onChange={handleChange} 
                                />
                                {errors.confirmPassword && <span className="text-red">{errors.confirmPassword}</span>}
                            </div>
                        </div>
                    </Card>

                    <Card classes="card-less card-xx-large">
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea 
                                placeholder="Thank You!"
                                name="address" 
                                id="address" 
                                value={formData.address} 
                                rows="3"
                                onChange={handleChange}
                            >
                            </textarea>
                            {errors.address && <span className="text-red">{errors.address}</span>}
                        </div>
                    </Card>

                    <Card classes="card-less card-small">
                        {
                            valuesValid 
                            ? 
                            <button type="submit">
                                {
                                    isLoading
                                    ?
                                    <i className="fa fa-spinner fa-pulse"></i>
                                    :
                                    'Add User'
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