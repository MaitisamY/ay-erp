import { FaTrashAlt } from 'react-icons/fa'

function PrePagination({ totalPages, handleItemsPerPage, handleSearchTerm, selectedItems, handleDeleteMultiple }) {

    return (
        <div className="pre-pagination">
            <span>Total pages: {totalPages}</span>
            <input type="text" onChange={handleSearchTerm} placeholder="Search..." />
            {
                selectedItems.length > 1 && (
                    <button className="bg-danger" onClick={handleDeleteMultiple}>
                        <FaTrashAlt /> Delete selection ({selectedItems.length})
                    </button>
                )
            }
            <div>
            <span>Showing</span> <select name="items-per-page" id="items-per-page" onChange={handleItemsPerPage}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                </select> <span>rows</span>
            </div>
        </div>
    )
}

export default PrePagination
