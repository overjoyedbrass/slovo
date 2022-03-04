import React from "react";
import { useSelector } from "react-redux";
import { suggestWord } from "../../helpers/helpers";
import { themes } from "../../theme/themes";
import { selectCurrentTheme } from "../../theme/themeSlice";
import { toast } from "react-toastify";

const SUGGEST_LIMIT = 2

function datesAre10MApart(d1, d2){
    const diff = d1 - d2
    var minutes = (diff/1000)/60
    return minutes >= SUGGEST_LIMIT
}

export const Suggester = () => {
    const [word, setWord] = React.useState("")
    const theme = themes[useSelector(selectCurrentTheme)]

    const textAreaChange = event => {
        setWord(
            event.target.value
        )
    }
    const enterPress = (e) => {
        if(e.keyCode === 13){
            buttonClick(e)
        }
    }
    const buttonClick = (e) => {
        if(word.length < 5){
            toast.warn("Slovo musí byť dĺžky aspoň 5!", {toastId: 141})
            return
        }
        const teraz = new Date()
        const last = new Date(parseInt(localStorage.lastSuggest))

        if(!localStorage.lastSuggest ||datesAre10MApart(teraz, last)){
            suggestWord(word)
            setWord("")
            toast.success("Úspešne odoslané", {toastId: 142})
            localStorage.lastSuggest = ''+teraz.getTime()
            return
        }
        toast.error(`Môžete navrhnúť slovo iba raz za ${SUGGEST_LIMIT} minúty`, {toastId: 143})
    }
    
    return (
        <>
        <div className="container">
            <h3>Navrhni slovo do hry</h3>
            <input
                placeholder={"ovocie"}
                maxLength={6} 
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
            <br />
        </div>
        </>
    )
}