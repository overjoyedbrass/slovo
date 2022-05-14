import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../theme/themeSlice'
import { themes } from '../theme/themes'

const URL = "https://slovnik.juls.savba.sk/?w=";

export const InfoBox = ({targetWord}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    return (
        <div className="infoBox">
            Hľadané slovo je <a 
                href={`${URL}${targetWord}`}
                target="blank"
                style={{color: theme.href, backgroundColor: theme.bgColor}}
            >{targetWord.toUpperCase()}</a>
        </div>
    )
}
