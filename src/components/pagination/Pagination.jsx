function Pagination({ data, handleCurrentPage, currentPage, totalPages, firstPage, previousPage, nextPage, lastPage }) {
    return (
        <div className="pagination">
            <span>Total rows: {data.length}</span>
            <div>
                {currentPage > 1 && (
                    <button onClick={firstPage}>
                        {'First'}
                    </button>
                )}

                <button 
                    onClick={previousPage}
                    disabled={currentPage === 1}
                >
                    {'Prev'}
                </button>

                {currentPage > 3 && totalPages > 5 && (
                    <button onClick={() => handleCurrentPage(currentPage - 2)}>
                        ...
                    </button>
                )}

                {currentPage > 1 && (
                    <button onClick={() => handleCurrentPage(currentPage - 1)}>
                        {currentPage - 1}
                    </button>
                )}

                <button className="active">{currentPage}</button>

                {currentPage < totalPages && (
                    <button onClick={() => handleCurrentPage(currentPage + 1)}>
                        {currentPage + 1}
                    </button>
                )}

                {currentPage < totalPages - 1 && (
                    <button onClick={() => handleCurrentPage(currentPage + 2)}>
                        ...
                    </button>
                )}

                <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                >
                    {'Next'}
                </button>

                {currentPage < totalPages && (
                    <button onClick={lastPage}>
                        {'Last'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Pagination
