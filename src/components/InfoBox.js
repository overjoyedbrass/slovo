import React from 'react'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../theme/themeSlice'
import { themes } from '../theme/themes'

export const InfoBox = ({targetWord}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    return (
        <div className="infoBox">
            Hľadané slovo je <a 
                href={`https://slovnik.aktuality.sk/pravopis/?q=${targetWord}`}
                target="blank"
                style={{color: theme.href, backgroundColor: theme.bgColor}}
            >{targetWord.toUpperCase()}</a>
        </div>
    )
}