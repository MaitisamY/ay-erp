import { useState, useEffect } from 'react'

export const usePagination = ({ data: data }) => {
    
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(25)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const totalPages = Math.ceil(data.length / itemsPerPage)

    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const lastPage = () => {
        setCurrentPage(totalPages)
    }

    const firstPage = () => {
        setCurrentPage(1)
    }

    const handleItemsPerPage = (e) => {
        setItemsPerPage(e.target.value)
    }

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }
    
    return {
        searchTerm,
        currentPage,
        indexOfFirstItem,
        indexOfLastItem,
        totalPages,
        handleCurrentPage,
        setCurrentPage,
        previousPage,
        nextPage,
        lastPage,
        firstPage,
        handleItemsPerPage,
        handleSearchTerm
    }
}