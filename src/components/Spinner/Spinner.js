import React from 'react'
import './Spinner.css'

export const Spinner = ({theme}) => {
    return (
        <div 
            className={`loadingCircle ${theme.NAME}`}
            style={{borderTopColor: theme.spinner}}
        ></div>
        )
}