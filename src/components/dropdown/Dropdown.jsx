
function Dropdown({ title, headerContent, children }) {
    const handleClickInside = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="dropdown-menu" onClick={handleClickInside}>
            <div className="menu-content">
                <div className="content-header">
                    <h3>{title && title}</h3>
                    {headerContent && headerContent}
                </div>
                <div className="content-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Dropdown;
