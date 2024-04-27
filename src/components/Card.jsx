import React from 'react'

function Card({ title, headerContent, classes, footer, children }) {
    return (
        <div className={classes}>
            {
                title && 
                <div className="card-header">
                    <h3>{title}</h3>
                    {
                        headerContent && headerContent
                    }
                </div>
            }
            <div className="card-body">
                {children}
            </div>
            {
                footer &&
                <div className="card-footer">
                    <p>{footer}</p>
                </div>
            }
        </div>
    )
}

export default Card
