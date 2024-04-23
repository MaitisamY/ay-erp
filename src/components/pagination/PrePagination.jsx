
import { useTheme } from '../../hooks/ThemeProvider'
import { useExportData } from '../../hooks/ExportDataProvider'
import { FaTrashAlt } from 'react-icons/fa'
import { BsDownload, BsUpload } from 'react-icons/bs'

function PrePagination({ 
    items, 
    serachPlaceholder,
    totalPages, 
    handleItemsPerPage, 
    handleSearchTerm, 
    selectedItems, 
    handleDeleteMultiple,
    isImportable,
    isExportable 
}) {

    const { theme } = useTheme()
    const { exportData, importData } = useExportData()

    return (
        <div className="pre-pagination">
            <span>Total pages: {totalPages}</span>
            <input 
                type="text" 
                onChange={handleSearchTerm && handleSearchTerm} 
                placeholder={serachPlaceholder ? serachPlaceholder : 'Search...'} 
            />
            <div>
            {
                importData && isImportable && (
                    <button>
                        <BsUpload /> 

                        <span 
                            className={theme === 'dark' ? 'tooltip-dark' : 'tooltip-light'}
                        >
                            Import Data (CSV)
                        </span>
                    </button>
                )
            }
            {
                exportData && isExportable && items && items.length > 0 && (
                    <button>
                        <BsDownload /> 

                        <span 
                            className={theme === 'dark' ? 'tooltip-dark' : 'tooltip-light'}
                        >
                            Export Data ({items.length})
                        </span>
                    </button>
                )
            }
            {
                selectedItems && selectedItems.length > 1 && (
                    <button className="bg-red" onClick={handleDeleteMultiple && handleDeleteMultiple}>
                        <FaTrashAlt /> 

                        <span 
                            className={theme === 'dark' ? 'tooltip-dark' : 'tooltip-light'}
                        >
                            Delete selection ({selectedItems.length})
                        </span>
                    </button>
                )
            }
            </div>
            <div>
            <span>Showing</span> <select name="items-per-page" id="items-per-page" onChange={handleItemsPerPage && handleItemsPerPage}>
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
