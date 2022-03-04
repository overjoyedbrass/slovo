import React from 'react'
import { Tablecell } from './Tablecell.js'
import './Playtable.css'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'
import { themes } from '../../theme/themes'


export const Playtable = ({gameState, colors, multiples}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    return (
        <div className="playtable">{
            gameState.map((row, rowIndex) => {
                const rowColors = colors[rowIndex]
                return (
                    <div key={rowIndex} className={"playtableRow"}>{
                        row.map( (l, colIndex) => 
                            <Tablecell
                                key={colIndex}
                                letter={l}
                                color={rowColors[colIndex]}
                                theme={theme}
                                multiple={multiples.includes(`${rowIndex}.${colIndex}`)}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}