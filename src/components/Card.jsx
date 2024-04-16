import React from 'react'

function Card({ title, classes, footer, children }) {
    return (
        <div className={classes}>
            {
                title && 
                <div className="card-header">
                    <h3>{title}</h3>
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
