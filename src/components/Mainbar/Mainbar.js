import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'
import { themes } from '../../theme/themes.js'
import { selectCurrentLength } from '../../slices/gameState.js'

import './Mainbar.css'

import infoLight from '../../img/infoLight.png'
import infoDark from '../../img/infoDark.png'
import settingsDark from '../../img/settingsDark.png'
import settingsLight from '../../img/settingsLight.png'
import lbDark from '../../img/lbDark.png'
import lbLight from '../../img/lbLight.png'
import shareLight from '../../img/shareLight.png'
import shareDark from '../../img/shareDark.png'
import gold from '../../img/gold.png'
import silver from '../../img/silver.png'
import bronze from '../../img/bronze.png'
import candy from '../../img/candy.png'
import { format } from 'date-fns'
import { Tablecell } from '../Playtable/Tablecell.js'
import { selectLeaderboard } from '../../slices/gameState.js'

function getMinSecs(seconds){
    const min = Math.floor(seconds/60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? "0" : ""}${sec}`
}

async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } 
    else {
        return document.execCommand('copy', true, text);
    }
}


export const Mainbar = ({copycolors, setroute}) => {
    const [open, setOpen] = React.useState({
        help: false,
        stats: false,
    })
    const length = useSelector(selectCurrentLength)
    const gameOver = localStorage.getItem(`gameOver${length}`)

    const medals = [gold, silver, bronze]
    const lb = useSelector(selectLeaderboard)
    
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]

    const copyText = `Slovo ${format(new Date(), "d.M.")}  (${copycolors.length}/6)\n\n${copycolors.map(m => m.join("")).join('\n')}`

    return (
        <>
        <header>
            <div className="menu">
                <img onClick={() => setOpen({help: !open.help, stats: false})}  className="icon" src={keyTheme === "dark" ? infoDark : infoLight} />
                <CopyToClipBoard text={copyText} gameover={gameOver} theme={keyTheme}/>
                
            </div>

            <div className="title">SLOVO</div>

            <div className="menu">
                <img onClick={() => setOpen({help: false, stats: !open.stats})} className="icon" src={keyTheme === "dark" ? lbDark : lbLight} />
                <img onClick={() => setroute("settings")} className="icon" src={keyTheme === "dark" ? settingsDark : settingsLight} />
            </div>
        </header>
        {!open.help ? null :
        <div style={{backgroundColor: theme.dialogColor, borderColor: theme.textColor}} onClick={() => setOpen({help: false, stats: false})} className="dialog">
            <h2 style={{ textAlign: "center" }}>AKO HRAŤ?</h2>
            <div className="text">
                Uhádni SLOVO v 6 pokusoch. 
                Každé hádane slovo musí byť validné slovo dĺžky 5. Stlač enter pre kontrolu. 
                Po každom hádani sa zmeni farba políčka podľa toho ako blízko bol váš pokus.
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
        </div>}

        {!open.stats ? null :
        <div style={{backgroundColor: theme.dialogColor, borderColor: theme.textColor}} onClick={() => setOpen({help: false, stats: false})} className="dialog stats">
            <h2 style={{ textAlign: "center" }}>Dnešná tabuľka</h2>
            {
                lb.length == 0 ? "Prázdna tabuľka": 
                lb.map((z, i) => <div key={i} className="lbRow">
                    <img src={medals[i] ?? candy} className="icon"/>
                    <div style={{width: "40%"}} className="lbCol">{z[0]}</div>
                    <div style={{width: "30%"}} className="lbCol">{getMinSecs(z[1])}</div>
                    <div style={{width: "30%"}}  className="lbCol" style={{right: '0px'}}>{z[2]}</div>
                </div>)
            }           
        </div>}
        </>
    )
}


const CopyToClipBoard = ({text, gameover, theme}) => {
    const [open, setOpen] = React.useState(false)

    const makeCopy = () => {
        const copyText = text
        copyTextToClipboard(copyText)
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 1000)
    }


    return (
        <>
        { gameover === "1" ? <img onClick={() => makeCopy()}  className="icon" src={theme === "dark" ? shareDark : shareLight} /> : null}
        {open ? <div className="notification">Skopírované</div> : null}
        </>
    )
}