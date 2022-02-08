import React from 'react'

import { ThemeSwitch } from './ThemeSwitch'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'

import { themes } from '../../theme/themes.js'

import homeDark from '../../img/homeDark.png'
import homeLight from '../../img/homeLight.png'

import './Settings.css'
import { loadGameOver, loadWordLength, removeGameStorage } from '../../helpers'
import { Suggester } from './Suggester'

export const Settings = ({setroute}) => {
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]
    const wordLength = loadWordLength()
    const gameOver = loadGameOver(wordLength)

    const [refresh, doRefresh] = React.useState(true)

    React.useEffect(() => {
        document.body.style = `background: ${theme.bgColor} ; color: ${theme.textColor}`;
    }, [theme])

    return (
        <>
        <div className="mainbar">


            <img onClick={() => setroute("game")} style={{float: 'left'}} className="icon" src={keyTheme === "dark" ? homeDark : homeLight} />
            <div className="title">Nástroje</div>
            <ThemeSwitch />
        </div>
        <div className="settingsContent">
            <Suggester />

            
            {gameOver === "0" ? null :
                <button 
                    onClick={() => {
                        removeGameStorage(wordLength)
                        doRefresh(!refresh)
                    }} 
                    className="warnButton" style={{backgroundColor: theme.warn, color: theme.textColor}}
                >
                    Vymazať dáta hry
                </button>
            }
        </div>
        </>
        )
}
