import React from 'react'
import { Keycell } from './Keycell'


import { themes } from '../../theme/themes'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'

import './Keyboard.css'

const ROWS = [
    'ľščťžýáíéóďúň',
    'qwertzuiop',
    'asdfghjkl',
    '↵yxcvbnm⌫'
]

export const Keyboard = ({handlefunction, getKeyCellColor}) => {
    const theme = themes[useSelector(selectCurrentTheme)]

    return (
        <div className="keyboard">{
            ROWS.map((row, rowIndex) => 
            <div key={rowIndex} className="keyBoardRow">
                { row.split('').map(l => 
                    <Keycell
                        key={l} 
                        letter={l} 
                        handlefunction={handlefunction} 
                        color={ getKeyCellColor(l) }
                        theme={theme}
                    />
                )}
            </div>
            )}
        </div>
    )
}