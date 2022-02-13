import React from 'react'

import { ThemeSwitch } from './ThemeSwitch'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'

import { themes } from '../../theme/themes.js'

import homeDark from '../../img/homeDark.png'
import homeLight from '../../img/homeLight.png'

import { selectHistory } from '../../slices/gameState.js'

import './Settings.css'
import { Suggester } from './Suggester'
import { NicknamePicker } from './NicknamePicker'

import { format, parseISO } from 'date-fns'
import { LengthPicker } from './LengthPicker'

export const Settings = ({setroute}) => {
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]
    
    const history = useSelector(selectHistory).map(x => [parseISO(x[0]), x[1]])

    history.sort((a, b) => b[0]-a[0])
    history.shift()
    history.shift()


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
                    history.map((z, i) => <div key={i} className="hsRow">
                        <div className="hsCol1">{z[1]}</div>
                        <div className="hsCol2">{format(z[0], "d. M.")}</div>
                    </div>)
                }
            </div>
            <Suggester />
            <NicknamePicker />
            <LengthPicker />
        </div>
        )
}
