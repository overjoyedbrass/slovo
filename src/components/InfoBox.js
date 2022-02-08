import React from 'react'
import { loadGameOver } from '../helpers'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../theme/themeSlice'
import { themes } from '../theme/themes'

export const InfoBox = ({targetWord}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    
    const gameOver = loadGameOver(targetWord.length)

    return (
        <div className="infoBox">
            {gameOver === "0" ? null:
                <>
                    Hľadané slovo je <a 
                        href={`https://slovnik.aktuality.sk/pravopis/?q=${targetWord}`}
                        target="blank"
                        style={{color: theme.href, backgroundColor: theme.bgColor}}
                    >{targetWord.toUpperCase()}</a>
                </>
            }
        </div>
    )
}