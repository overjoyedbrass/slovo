import React from "react";
import { useSelector } from "react-redux";
import { suggestWord } from "../../helpers";
import { themes } from "../../theme/themes";
import { selectCurrentTheme } from "../../theme/themeSlice";


const SUGGEST_LIMIT = 2

function datesAre10MApart(d1, d2){
    const diff = d1 - d2
    var minutes = (diff/1000)/60
    return minutes >= SUGGEST_LIMIT
}

export const Suggester = () => {
    const [infMsg, setInfMsg] = React.useState("")
    const [goodMsg, setGoodMsg] = React.useState("")
    const [word, setWord] = React.useState("")
    const theme = themes[useSelector(selectCurrentTheme)]

    const textAreaChange = event => {
        setWord(
            event.target.value.replace(/[^a-zA-Z]/, '')
        )
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
        if(word.length < 5){
            setInfMsg("slovo musí byť dĺžky 5")
            setGoodMsg("")
            return
        }
        const teraz = new Date()
        const last = new Date(parseInt(localStorage.lastSuggest))

        if(!localStorage.lastSuggest ||datesAre10MApart(teraz, last)){
            suggestWord(word)
            setWord("")
            setGoodMsg("Úspešné odoslané")
            localStorage.lastSuggest = ''+teraz.getTime()
            return
        }
        setInfMsg(`Môžete navrhnúť slovo iba raz za ${SUGGEST_LIMIT} minúty`)
    }
    
    return (
        <>
        <div className="container">
            <h3>Navrhni slovo do hry</h3>
            <input
                placeholder={"slovo na 5"}
                maxLength={5} 
                onChange={textAreaChange} 
                value={word}
                spellCheck="false"
                style={{backgroundColor: theme.bgColor}}
                type="text"
                pattern="[a-zA-Z]*"
                onKeyDown={(e) => enterPress(e)}
            />
            <button 
                style={{backgroundColor: theme.bgColor}}
                onClick={buttonClick}
            >
                Odoslať
            </button>
            {infMsg}
            { !goodMsg ? null :
            <font style={{color: theme.href}}>{goodMsg}</font>
            }
        </div>
        </>
    )
}