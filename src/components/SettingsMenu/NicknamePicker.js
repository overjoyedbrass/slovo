import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themes } from "../../theme/themes";
import { selectCurrentTheme } from "../../theme/themeSlice";
import { setNickname } from "../../slices/nicknameSlice";

import { toast } from 'react-toastify';


const MAX_LENGTH = 10
const MIN_LENGTH = 3

export const NicknamePicker = () => {

    const [nick, setNick] = React.useState("")
    const theme = themes[useSelector(selectCurrentTheme)]
    const dispatch = useDispatch()
    const currentNick = useSelector(state => state.nickname.nick)

    const textAreaChange = event => {
        setNick(event.target.value.replace(/[^a-zA-Z]/, ''))
    }
    const enterPress = (e) => {
        if(e.keyCode === 13){
            buttonClick(e)
        }
    }
    const buttonClick = (e) => {
        if(nick.length < MIN_LENGTH){
            toast.warn("Prezývka musí byť dĺžky aspoň 3", {toastId: 150})
            return
        }
        if(nick === currentNick){
            toast.warn("Prezývka je rovnaká ako predchadzajúca", {toastId: 151})
            return
        }
        setNick("")
        dispatch(setNickname(nick))
        toast.success("Prezývka nastavená!", {toastId: 151})
    }
    
    return (
        <>
        <div className="container">
            <h3>{currentNick ? `Nickname: ${currentNick}` : "Nastavíť prezývku"}</h3>
            <input
                placeholder={"zelvak"}
                maxLength={MAX_LENGTH} 
                onChange={textAreaChange} 
                spellCheck="false"
                value={nick}
                style={{backgroundColor: theme.bgColor}}
                type="text"
                onKeyDown={(e) => enterPress(e)}
            />
            <button 
                style={{backgroundColor: theme.bgColor}}
                onClick={buttonClick}
            >
                {currentNick ? "Zmeniť" : "Nastaviť"}
            </button>
            <br />
        </div>
        </>
    )
}