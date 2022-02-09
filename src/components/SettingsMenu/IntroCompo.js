import React from "react";
import { NicknamePicker } from "./NicknamePicker";
import './IntroCompo.css'
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../../theme/themeSlice";
import { themes } from "../../theme/themes";

export const IntroCompo = ({setroute}) => {
    const handleClick = () => {
        if(!localStorage.nickname){
            localStorage.nickname = ""
        }
        setroute("game")
    }
    const theme = themes[useSelector(selectCurrentTheme)]
    React.useEffect(()=>{
        document.body.style = `background: ${theme.bgColor} ; color: ${theme.textColor}`;
    })

    return (
        <div className="introduction">
            <h3>Nastavenie prezývky</h3>
            <div className="blockText">
                Toto nastavenie je voliteľné. S nastavenou prezývkou Vás po uhádnutí zapíšem do dennej tabuľky. Ak si nechcete zvoliť prezývku teraz alebo vôbec, môžete toto nastavenie preskočiť.

            </div>
            <button style={{backgroundColor: theme.rightCell}} className="playButton" onClick={handleClick}>Hrať</button>
            <NicknamePicker />
        </div>
    )
}