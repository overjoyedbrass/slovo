import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'
import { themes } from '../../theme/themes.js'
import { useNavigate } from 'react-router-dom'
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
import { selectLeaderboard } from '../../app/slices/gameState.js'
import { toast } from 'react-toastify'

function getMinSecs(seconds){
    const min = Math.floor(seconds/60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? "0" : ""}${sec}`
}

async function copyTextToClipboard(text) {
    await text
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } 
    else {
        return document.execCommand('copy', true, text);
    }
}

export const Mainbar = ({share, strtable}) => {
    const [open, setOpen] = React.useState({
        help: false,
        stats: false,
    })
    const navigate = useNavigate()
    
    const medals = [gold, silver, bronze]
    const lb = useSelector(selectLeaderboard)

    lb.sort((a, b) => {
        const pokusyA = a[2].split("/")[1]
        const pokusyB = a[2].split("/")[1]
        if(pokusyA.localeCompare(pokusyB) < 0){
            return -1
        }
        if(a[1] < b[1]){
            return a[1]-b[1]
        }
        return a[2].split("/")[0].localeCompare(a[2].split("/")[0])
    })
    
    
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]
    
    const copyText = `Slovo ${format(new Date(), "d.M.")}  (${strtable.length}/6)\n\n${strtable.join('\n')}`

    return (
        <>
        <header>
            <div className="menu">
                <img alt="infoicon" onClick={() => setOpen({help: !open.help, stats: false})}  className="icon" src={keyTheme === "dark" ? infoDark : infoLight} />
                {share ? <CopyToClipBoard text={copyText}  theme={keyTheme}/> : null }
            </div>

            <div className="title">SLOVO</div>

            <div className="menu">
                <img alt="leaderboard" onClick={() => setOpen({help: false, stats: !open.stats})} className="icon" src={keyTheme === "dark" ? lbDark : lbLight} />
                <img alt="cogwheel" onClick={() => navigate("/settings")} className="icon" src={keyTheme === "dark" ? settingsDark : settingsLight} />
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
                <h3>Príklad: Nech hádane slovo je "Motor"</h3>

                <h6 style={{margin: 0 }}>1. Pokus</h6>
                <div className="playtableRow">
                    <Tablecell letter={"H"} color={theme.wrongCell}/>
                    <Tablecell letter={"U"} color={theme.wrongCell}/>
                    <Tablecell letter={"D"} color={theme.wrongCell}/>
                    <Tablecell letter={"B"} color={theme.wrongCell}/>
                    <Tablecell letter={"A"} color={theme.wrongCell}/>
                </div>
                <p>Žiadne z písmen sa v hádanom slove nenachádza</p>

                <h6 style={{margin: 0 }}>2. Pokus</h6>
                <div className="playtableRow">
                    <Tablecell letter={"O"} color={theme.containedCell} multiple={true}/>
                    <Tablecell letter={"K"} color={theme.wrongCell}/>
                    <Tablecell letter={"R"} color={theme.containedCell}/>
                    <Tablecell letter={"E"} color={theme.wrongCell}/>
                    <Tablecell letter={"M"} color={theme.containedCell}/>
                </div>
                <p>Písmeno O sa nachádza v hádanom slove viackrát, ale je na nesprávnej pozícií. Písmena R a M sú v hádanom slove, ale v našom pokuse sú na nesprávnej pozícií.</p>

                <h6 style={{margin: 0 }}>3. Pokus</h6>
                <div className="playtableRow">
                    <Tablecell letter={"M"} color={theme.rightCell}/>
                    <Tablecell letter={"E"} color={theme.wrongCell}/>
                    <Tablecell letter={"T"} color={theme.rightCell}/>
                    <Tablecell letter={"R"} color={theme.containedCell}/>
                    <Tablecell letter={"O"} color={theme.containedCell} multiple={true}/>
                </div>
                <p>Písmena M a T sú na správnej pozícií. Písmeno O sa v hádanom slove nachádza, ale nie je na správnej pozícií. Znak + nad písmenom znamená, že písmeno je v hádanom slove viackrát</p>

                <h6 style={{margin: 0 }}>4. Pokus</h6>
                <div className="playtableRow">
                    <Tablecell letter={"M"} color={theme.rightCell} />
                    <Tablecell letter={"O"} color={theme.rightCell} />
                    <Tablecell letter={"T"} color={theme.rightCell} />
                    <Tablecell letter={"O"} color={theme.rightCell} />
                    <Tablecell letter={"R"} color={theme.rightCell} />
                </div>
                <p>Uhádli sme hádane slovo.</p>
            
                <h2 style={{textAlign: "center"}}>Nové slovo každý deň!</h2>
            </div>
        </div>}

        {!open.stats ? null :
        <div style={{backgroundColor: theme.dialogColor, borderColor: theme.textColor}} onClick={() => setOpen({help: false, stats: false})} className="dialog stats">
            <h2 style={{ textAlign: "center" }}>Dnešná tabuľka</h2>
            {
                lb.length === 0 ? "Prázdna tabuľka": 
                lb.map((z, i) => <div key={i} className="lbRow">
                    <img alt="medal" src={medals[i] ?? candy} className="icon"/>
                    <div style={{width: "40%"}} className="lbCol">{z[0]}</div>
                    <div style={{width: "30%"}} className="lbCol">{getMinSecs(z[1])}</div>
                    <div style={{width: "30%", right: "0px"}}  className="lbCol">{z[2]}</div>
                </div>)
            }           
        </div>}
        </>
    )
}


const CopyToClipBoard = ({text, theme}) => {
    const makeCopy = async () => {
        await copyTextToClipboard(text)
        toast.info("Skopírované", {position: "top-center", toastId: 333})
    }
    
    return (
        <>
        <img alt="shareicon" onClick={() => makeCopy()}  className="icon" src={theme === "dark" ? shareDark : shareLight} />
        </>
    )
}
