import React from 'react'

export const Keycell = ({ letter, handlefunction, color, theme }) => {
    if(!color){
        color = theme.keycell
    }
    let sx = { backgroundColor: color, color: theme.keyboardText }
    if(letter === '↵' || letter === '⌫'){
        sx.padding = "0 1em 0 1em"
    }
    return (
        <div 
            onClick={() => handlefunction(letter)}            
            className="keyCell" 
            style={sx}>{ letter.toUpperCase() }
        </div>
    )
}