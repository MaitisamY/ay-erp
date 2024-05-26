import { useState, useEffect } from 'react'
import axios from 'axios'

export const useUserFunctions = () => {
    const [users, setUsers] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [loading, setLoading] = useState(true)

    const handleSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const getUsers = async () => {
        try {
            setLoading(true); 
            
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/get/users`)
            setUsers(response.data.data)

            setLoading(false); 
        } catch (err) {
            console.log(err)
            setLoading(false); 
        }
    }

    const updateUsers = (users) => {
        setUsers(users)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return { users, loading, selectedItems, setSelectedItems, handleSelection }
}