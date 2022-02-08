import React from 'react'
import { Tablecell } from './Tablecell.js'
import './Playtable.css'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'
import { themes } from '../../theme/themes'


export const Playtable = ({gameState, colorFunction}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    return (
        <div className="playtable">{
            gameState.map((row, rowIndex) => {
                const rowColors = colorFunction(rowIndex)
                return (
                    <div key={rowIndex} className={"playtableRow"}>{
                        row.map( (l, colIndex) => 
                            <Tablecell 
                                key={colIndex}
                                letter={l}
                                color={rowColors[colIndex]}
                                theme={theme}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}