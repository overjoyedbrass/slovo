import React from 'react'

import { themes } from '../../theme/themes'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'

export const Tablecell = ({letter, color, multiple}) => {
    const theme = themes[useSelector(selectCurrentTheme)]

    const farby = { 
        backgroundColor: color, 
        borderColor: color ? color : letter ? theme.cellBgFill : theme.cellBg
    }

    return (
        <div style={{ ...farby}} className="tablecell">
            {letter}
            {multiple ? <div className="plus">+</div> : null}
        </div>
    )
}