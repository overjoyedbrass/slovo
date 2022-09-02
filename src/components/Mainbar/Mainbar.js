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
import shareLight from '../../img/shareLight.png'
import shareDark from '../../img/shareDark.png'
import { format } from 'date-fns'
import { Tablecell } from '../Playtable/Tablecell.js'
import { toast } from 'react-toastify'


async function copyTextToClipboard(text) {
    await text
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } 
    else {
        return document.execCommand('copy', true, text);
    }
}

export const Mainbar = ({ share, strtable }) => {
    const [helpOpen, setHelpOpen] = React.useState(false)
    const navigate = useNavigate()    
    
    const keyTheme = useSelector(selectCurrentTheme)
    const theme = themes[keyTheme]
    
    const copyText = `Slovo ${format(new Date(), "d.M.")}  (${strtable.length}/6)\n\n${strtable.join('\n')}`

    return (
        <>
        <header>
            <div className="menu">
                <img alt="infoicon" onClick={() => setHelpOpen(!helpOpen)}  className="icon" src={keyTheme === "dark" ? infoDark : infoLight} />
                {share ? <CopyToClipBoard text={copyText}  theme={keyTheme}/> : null }
            </div>

            <div className="title">SLOVO</div>

            <div className="menu">
                <img alt="cogwheel" onClick={() => navigate("/helper")} className="icon" src={keyTheme === "dark" ? settingsDark : settingsLight} />
            </div>
        </header>
        {!helpOpen ? null :
        <div style={{backgroundColor: theme.dialogColor, borderColor: theme.textColor}} onClick={() => setHelpOpen(!helpOpen)} className="dialog">
            <h2 style={{ textAlign: "center" }}>AKO HRAŤ?</h2>
            <div className="text">
                Uhádni SLOVO v 6 pokusoch. 
                Každé hádane slovo musí byť validné slovo dĺžky 5. Stlač enter pre kontrolu. 
                Po každom hádani sa zmeni farba políčka podľa toho ako blízko bol váš pokus.
                <br />
                <h3>Príklad: Nech hádane slovo je "Motor"</h3>

                <h6 style={{margin: 0 }}>1. Pokus</h6>
                <div className="playtableRow">
                    {
                        "HUDBA".split("").map(l => 
                            <Tablecell letter={l} color={theme.wrongCell}/>
                        )
                    }
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
                    {"MOTOR".split("").map(l =>
                        (<Tablecell letter={l} color={theme.rightCell} />)
                    )}
                </div>
                <p>Uhádli sme hádane slovo.</p>
            </div>
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
        <img alt="shareicon" onClick={() => makeCopy()}  className="icon" src={theme === "dark" ? shareDark : shareLight} />
    )
}
