import React from 'react'

import infoLight from '../../img/infoLight.png'
import infoDark from '../../img/infoDark.png'
import bulbLight from '../../img/bulbLight.png'
import bulbDark from '../../img/bulbDark.png'

import './Mainbar.css'


import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentTheme, setCurrentTheme } from '../../theme/themeSlice'
import { themes } from '../../theme/themes.js'

import { Tablecell } from '../Tablecell.js'

export const Mainbar = (props) => {
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false)

    const switchTheme = () => {
        const newTheme = keyTheme === "dark" ? "light" : "dark"
        dispatch(setCurrentTheme(newTheme))
        localStorage.setItem("theme", newTheme)
    }


    return (
        <div className="mainbar">
            <img onClick={() => setOpen(!open)} style={{float: 'left'}} className="icon" src={keyTheme === "dark" ? infoDark : infoLight} />

            <div className="title">SLOVO</div>

            <img style={{float: 'right'}} onClick={switchTheme} className="icon" src={keyTheme === "dark" ? bulbDark : bulbLight} />

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