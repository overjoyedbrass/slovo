import React from 'react'

import { themes } from '../theme/themes'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../theme/themeSlice'

export const Keycell = ({ letter, handlefunction, color }) => {
    const theme = themes[useSelector(selectCurrentTheme)]

    let sx = { backgroundColor: color }
    if(letter === '↵' || letter === '⌫'){
        sx = {
            paddingLeft: "0.8em",
            paddingRight: "0.8em"
        }
    }
    return (<div onClick={() => handlefunction(letter)} className="keyCell" style={sx}>{ letter }</div>)
}