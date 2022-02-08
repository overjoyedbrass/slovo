import React from 'react'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'
import { themes } from '../../theme/themes.js'

import './Mainbar.css'

import infoLight from '../../img/infoLight.png'
import infoDark from '../../img/infoDark.png'

import settingsDark from '../../img/settingsDark.png'
import settingsLight from '../../img/settingsLight.png'

import { Tablecell } from '../Playtable/Tablecell.js'

export const Mainbar = ({setroute}) => {
    const [open, setOpen] = React.useState(false)
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]

    return (
        <div className="mainbar">
            <img onClick={() => setOpen(!open)} style={{float: 'left'}} className="icon" src={keyTheme === "dark" ? infoDark : infoLight} />

            <div className="title">SLOVO</div>

            <img onClick={() => setroute("settings")} style={{float: 'left'}} className="icon" src={keyTheme === "dark" ? settingsDark : settingsLight} />

            {!open ? null :
            <div style={{backgroundColor: theme.dialogColor, borderColor: theme.textColor}} onClick={() => setOpen(false)} className="dialog">
                <h2 style={{ textAlign: "center" }}>AKO HRAŤ?</h2>
                <div className="text">
                    Uhádni SLOVO v 6 pokusoch. 
                    Každé hádane slovo musí byť validne slovo dĺžky 5. Stlač enter pre kontrolu. 
                    Po každom hádani sa zmeni farba políčka podľa toho ako blízko bol váš pokus.
                    Hádané slová sú tie, ktoré nemajú diakritiku.
                    <br />
                    <h3>Príklad: </h3>
                    <div className="playTableRow">
                        <Tablecell letter={"P"} color={theme.rightCell}/>
                        <Tablecell letter={"E"} />
                        <Tablecell letter={"T"} />
                        <Tablecell letter={"E"} />
                        <Tablecell letter={"R"} />
                    </div>
                    <p>Písmeno P je na správnom mieste</p>

                    <div className="playTableRow">
                        <Tablecell letter={"S"} />
                        <Tablecell letter={"U"} />
                        <Tablecell letter={"S"} />
                        <Tablecell letter={"E"} color={theme.containedCell}/>
                        <Tablecell letter={"D"} />
                    </div>
                    <p>Písmeno E sa nachádza na inom mieste</p>

                    <div className="playTableRow">
                        <Tablecell letter={"A"} />
                        <Tablecell letter={"K"} color={theme.wrongCell}/>
                        <Tablecell letter={"O"} />
                        <Tablecell letter={"R"} />
                        <Tablecell letter={"D"} />
                    </div>
                    <p>Písmeno K sa v slove nenachádza</p>
                    <h2 style={{textAlign: "center"}}>Nové slovo každý deň!</h2>
                </div>
            </div>
            }
        </div>
    )
}