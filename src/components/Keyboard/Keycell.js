import React from 'react'

export const Keycell = ({ letter, handlefunction, color, theme }) => {
    let sx = { backgroundColor: color }
    if(letter === '↵' || letter === '⌫'){
        sx = {
            paddingLeft: "0.8em",
            paddingRight: "0.8em"
        }
    }
    return (
        <div 
            onClick={() => handlefunction(letter)} 
            className="keyCell" 
            style={sx}>{ letter }
        </div>
    )
}