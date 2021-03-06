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
    const lb = useSelector(selectLeaderboard).slice()
    
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
            <h2 style={{ textAlign: "center" }}>AKO HRA???</h2>
            <div className="text">
                Uh??dni SLOVO v 6 pokusoch. 
                Ka??d?? h??dane slovo mus?? by?? validn?? slovo d????ky 5. Stla?? enter pre kontrolu. 
                Po ka??dom h??dani sa zmeni farba pol????ka pod??a toho ako bl??zko bol v???? pokus.
                <br />
                <h3>Pr??klad: Nech h??dane slovo je "Motor"</h3>

                <h6 style={{margin: 0 }}>1. Pokus</h6>
                <div className="playtableRow">
                    <Tablecell letter={"H"} color={theme.wrongCell}/>
                    <Tablecell letter={"U"} color={theme.wrongCell}/>
                    <Tablecell letter={"D"} color={theme.wrongCell}/>
                    <Tablecell letter={"B"} color={theme.wrongCell}/>
                    <Tablecell letter={"A"} color={theme.wrongCell}/>
                </div>
                <p>??iadne z p??smen sa v h??danom slove nenach??dza</p>

                <h6 style={{margin: 0 }}>2. Pokus</h6>
                <div className="playtableRow">
                    <Tablecell letter={"O"} color={theme.containedCell} multiple={true}/>
                    <Tablecell letter={"K"} color={theme.wrongCell}/>
                    <Tablecell letter={"R"} color={theme.containedCell}/>
                    <Tablecell letter={"E"} color={theme.wrongCell}/>
                    <Tablecell letter={"M"} color={theme.containedCell}/>
                </div>
                <p>P??smeno O sa nach??dza v h??danom slove viackr??t, ale je na nespr??vnej poz??ci??. P??smena R a M s?? v h??danom slove, ale v na??om pokuse s?? na nespr??vnej poz??ci??.</p>

                <h6 style={{margin: 0 }}>3. Pokus</h6>
                <div className="playtableRow">
                    <Tablecell letter={"M"} color={theme.rightCell}/>
                    <Tablecell letter={"E"} color={theme.wrongCell}/>
                    <Tablecell letter={"T"} color={theme.rightCell}/>
                    <Tablecell letter={"R"} color={theme.containedCell}/>
                    <Tablecell letter={"O"} color={theme.containedCell} multiple={true}/>
                </div>
                <p>P??smena M a T s?? na spr??vnej poz??ci??. P??smeno O sa v h??danom slove nach??dza, ale nie je na spr??vnej poz??ci??. Znak + nad p??smenom znamen??, ??e p??smeno je v h??danom slove viackr??t</p>

                <h6 style={{margin: 0 }}>4. Pokus</h6>
                <div className="playtableRow">
                    <Tablecell letter={"M"} color={theme.rightCell} />
                    <Tablecell letter={"O"} color={theme.rightCell} />
                    <Tablecell letter={"T"} color={theme.rightCell} />
                    <Tablecell letter={"O"} color={theme.rightCell} />
                    <Tablecell letter={"R"} color={theme.rightCell} />
                </div>
                <p>Uh??dli sme h??dane slovo.</p>
            
                <h2 style={{textAlign: "center"}}>Nov?? slovo ka??d?? de??!</h2>
            </div>
        </div>}

        {!open.stats ? null :
        <div style={{backgroundColor: theme.dialogColor, borderColor: theme.textColor}} onClick={() => setOpen({help: false, stats: false})} className="dialog stats">
            <h2 style={{ textAlign: "center" }}>Dne??n?? tabu??ka</h2>
            {
                lb.length === 0 ? "Pr??zdna tabu??ka": 
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
        toast.info("Skop??rovan??", {position: "top-center", toastId: 333})
    }
    
    return (
        <>
        <img alt="shareicon" onClick={() => makeCopy()}  className="icon" src={theme === "dark" ? shareDark : shareLight} />
        </>
    )
}
