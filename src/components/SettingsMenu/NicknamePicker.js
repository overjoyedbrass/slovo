import React from "react";
import { useSelector } from "react-redux";
import { suggestWord } from "../../helpers";
import { themes } from "../../theme/themes";
import { selectCurrentTheme } from "../../theme/themeSlice";


const MAX_LENGTH = 10
const MIN_LENGTH = 3

export const NicknamePicker = () => {
    const [infMsg, setInfMsg] = React.useState("")
    const [goodMsg, setGoodMsg] = React.useState("")
    const [nick, setNick] = React.useState("")
    const theme = themes[useSelector(selectCurrentTheme)]

    const currentNick = localStorage.nickname

    const textAreaChange = event => {
        setNick(event.target.value.replace(/[^a-zA-Z]/, ''))
        setGoodMsg("")
        setInfMsg("")
    }
    const enterPress = (e) => {
        if(e.keyCode === 13){
            buttonClick(e)
        }
    }
    const buttonClick = (e) => {
        setInfMsg("")
        if(nick.length < MIN_LENGTH){
            setInfMsg("Nickname musí byť dĺžky aspoň 3")
            setGoodMsg("")
            return
        }
        if(nick === currentNick){
            setInfMsg("Nickname je rovnaký ako predchádzajúci")
            setGoodMsg("")
            return
        }
        localStorage.nickname = nick
        setGoodMsg("Prezývka nastavená. Pri ďalšom uhádnutí Vás zapíšem pod týmto menom")
    }
    
    return (
        <>
        <div className="container">
            <h3>{currentNick ? `Nickname: ${currentNick}` : "Nastavíť prezývku"}</h3>
            <div style={{display: "flex"}}>
                <input
                    placeholder={"želvák"}
                    maxLength={MAX_LENGTH} 
                    onChange={textAreaChange} 
                    spellCheck="false"
                    style={{backgroundColor: theme.bgColor}}
                    type="text"
                    onKeyDown={(e) => enterPress(e)}
                />
                <button 
                    style={{backgroundColor: theme.bgColor}}
                    onClick={buttonClick}
                >
                    Zmeniť
                </button>
            </div>
            {infMsg}
            { !goodMsg ? null :
            <font style={{color: theme.href}}>{goodMsg}</font>
            }
        </div>
        </>
    )
}