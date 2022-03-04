import React from "react";
import { NicknamePicker } from "./NicknamePicker";
import './IntroCompo.css'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTheme } from "../../theme/themeSlice";
import { themes } from "../../theme/themes";
import { Game } from "../Game.js"
import { setNickname } from "../../slices/nicknameSlice";

export const IntroCompo = () => {
    const nickname = localStorage.nickname
    const dispatch = useDispatch()
    const handleClick = () => {
        if(!nickname){
            localStorage.nickname = ""
            dispatch(setNickname(""))
        }
        setNickname(nickname)
    }
    const theme = themes[useSelector(selectCurrentTheme)]

    React.useEffect(()=>{
        document.body.style = `background: ${theme.bgColor} ; color: ${theme.textColor}`;
    })

    if(localStorage.nickname){
        return <Game />
    }

    return (
        <div className="introduction">
            <h3>Nastavenie prezývky</h3>
            <div className="blockText">
                Toto nastavenie je voliteľné. S nastavenou prezývkou Vás po uhádnutí zapíšem do dennej tabuľky. Ak si nechcete zvoliť prezývku teraz alebo vôbec, môžete toto nastavenie preskočiť.

            </div>
            <button style={{backgroundColor: theme.rightCell}} className="playButton" onClick={() => handleClick()}>Hrať</button>
            <NicknamePicker />
        </div>
    )
}