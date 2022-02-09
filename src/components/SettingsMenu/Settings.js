import React from 'react'

import { ThemeSwitch } from './ThemeSwitch'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'

import { themes } from '../../theme/themes.js'

import homeDark from '../../img/homeDark.png'
import homeLight from '../../img/homeLight.png'

import { selectHistory } from '../../slices/gameState.js'

import './Settings.css'
import { loadGameOver, loadWordLength, removeGameStorage } from '../../helpers'
import { Suggester } from './Suggester'
import { NicknamePicker } from './NicknamePicker'

export const Settings = ({setroute}) => {
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]
    const wordLength = loadWordLength()
    const gameOver = loadGameOver(wordLength)


    const history = useSelector(selectHistory).slice(1)
    

    React.useEffect(() => {
        document.body.style = `background: ${theme.bgColor} ; color: ${theme.textColor}`;
    }, [theme])

    return (
        <div className="settingsPage">
            <header>
                <div className="menu">
                    <img onClick={() => setroute("game")} style={{float: 'left'}} className="icon" src={keyTheme === "dark" ? homeDark : homeLight} />
                </div>
                <div className="title">Nástroje</div>

                <div className="menu">
                    <ThemeSwitch />
                </div>
            </header>
            <div className="container">
                <h3>Predchádzajúce slová</h3>
                {
                    history.map((z, i) => <div key={i} className="lbRow">
                        <div className="lbCol">{z[1]}</div>
                        <div className="lbCol">{z[0]}</div>
                    </div>)
                }
            </div>
            <Suggester />
            <NicknamePicker />
        </div>
        )
}
