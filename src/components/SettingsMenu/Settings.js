import React from 'react'

import { ThemeSwitch } from './ThemeSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'
import { themes } from '../../theme/themes.js'
import homeDark from '../../img/homeDark.png'
import homeLight from '../../img/homeLight.png'
import './Settings.css'
import { Suggester } from './Suggester'
import { NicknamePicker } from './NicknamePicker'
import { format, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { setNewLength, selectCurrentLength, selectHistory } from '../../app/slices/gameState'

import five from '../../img/five.png'
import six from '../../img/six.png'


export const Settings = () => {
    const length = useSelector(selectCurrentLength)
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    var history = useSelector(selectHistory).map(x => [parseISO(x[0]), x[1]])

    history.sort((a, b) => b[0]-a[0])
    const dnes = new Date()
    history = history.filter(x => !format(x[0], "yyyy-MM-dd").includes(format(dnes, "yyyy-MM-dd")))
    

    React.useEffect(() => {
        document.body.style = `background: ${theme.bgColor} ; color: ${theme.textColor}`;
    }, [theme])

    return (
        <div className="settingsPage">
            <header>
                <div className="menu">
                    <img alt="length" onClick={() => { dispatch(setNewLength(length === 5 ? 6 : 5)) }} className="icon" src={length === 5 ? five : six} />
                    <ThemeSwitch />
                </div>
                <div className="title">Nástroje</div>
                <div className="menu">
                    <img alt="lightbulb" onClick={() => navigate("/")} style={{float: 'left'}} className="icon" src={keyTheme === "dark" ? homeDark : homeLight} />
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
        </div>
        )
}
