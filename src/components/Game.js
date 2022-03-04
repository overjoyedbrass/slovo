import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Mainbar } from './Mainbar/Mainbar.js'
import { Spinner } from './Spinner/Spinner.js'
import { loadAttempt, loadTable, isLetter, copy2D, loadWord, removeGameStorage, wordCheck,  letterFrequency, saveToStorage, lbwrite, letterToAccent, increaseRound } from '../helpers/helpers.js'
import './Game.css'
import { endOfDay } from 'date-fns'

import { themes } from '../theme/themes.js'
import { selectCurrentTheme } from '../theme/themeSlice.js'
import { Playtable } from './Playtable/Playtable.js'
import { Keyboard } from './Keyboard/Keyboard.js'
import { InfoBox } from './InfoBox.js'
import { saveGameState, updateLeaderboard, selectCurrentLength, selectTargetWord } from '../slices/gameState.js'
import { toast } from 'react-toastify'

function isWinner(table, attempt, targetWord){
    if(attempt === 0) return false
    const input = table[attempt-1].join("")
    for(let i = 0; i < input.length; i++){
        if(input[i] !== targetWord[i]){
            return false
        }
    }
    return true
}
function getLetters(table, attempt, targetWord){
    const usedLetters = new Set()
    const correctLetters = []
    for(let i = 0; i < attempt; i++){
        for(let j = 0; j < table[i].length; j++){
            if(table[i][j] === targetWord[j]){
                correctLetters.push(table[i][j])
            }
            usedLetters.add(table[i][j])
            usedLetters.add(letterToAccent(table[i][j]))
        }
    }
    return [correctLetters, usedLetters]
}

export const Game = () => {
    const theme = themes[useSelector(selectCurrentTheme)]
    const attempts = 6
    const wordLength = useSelector(selectCurrentLength)
    const targetWord = useSelector(selectTargetWord)
    const nickname = localStorage.nickname ?? ""

    const [inputEnabled, allowInput] = React.useState(true)
    const [table, setTable] = React.useState(loadTable(attempts, wordLength))
    const [attempt, setAttempt] = React.useState(loadAttempt(wordLength))
    const winner = isWinner(table, attempt, targetWord)    
    const [correctLetters, usedLetters] = getLetters(table, attempt, targetWord)
    const dispatch = useDispatch()

    const strtable = []
    const multiples = []
    React.useEffect(() => {
        if(targetWord !== "") return
        loadWord(wordLength).then(odpoved => {
            const [slovo, newWord, leaderboard, history] = odpoved

            if(newWord){
                saveToStorage("lastload", wordLength, (new Date()).getTime())
                saveToStorage("round", wordLength, 1)
                resetGame()
            }
            dispatch(saveGameState({
                word: slovo,
                leaderboard: leaderboard,
                history: history
            }))
        })
    })

    React.useEffect(() => {
        document.body.style = `background: ${theme.bgColor} ; color: ${theme.textColor}`;
    }, [theme])

    React.useEffect(() => {
        saveToStorage("attempt", wordLength, attempt)
        saveToStorage("table", wordLength, table)
    }, [attempt, wordLength])

    React.useEffect(() => {
        const handleKeyDown = (event) => handlefunction(event.key)
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    })

    const handlefunction = letter => {
        if(winner) return
        if(attempt >= attempts) return
        if(!inputEnabled) return
        if(letter === '↵' || letter === "Enter") checkAndSubmit()
        else if(letter ==='⌫' || letter === "Backspace") removeLetter()
        else addLetter(letter)
    }

    const checkAndSubmit = async () => {
        if(winner) return
        if(table[attempt].includes("")){
            toast.warn(`Slovo musí byť dĺžky ${wordLength}`, {toastId: 101})
            return
        }
        const slovo = table[attempt].join("")
        const goodWord = wordCheck(slovo)
        
        if(!goodWord){
            const copy = copy2D(table)
            copy[attempt] = Array(wordLength).fill("")
            setTable(copy)
            toast.warn("Slovo nie je v zozname", {toastId: 101})
            return
        }
        let guessed = slovo === targetWord;
        if(guessed){
            toast.success("Gratulujem!", {toastId: 1, autoClose: 5000})
        }
        if(guessed && nickname){
            try{
                const lastload = new Date(parseInt(localStorage.getItem(`lastload${wordLength}`)))
                const now = new Date()
                const diff = Math.abs(Math.floor((lastload.getTime() - now.getTime()) / 1000))
                const round = parseInt(localStorage.getItem(`round${wordLength}`))

                if(isNaN(diff) || isNaN(round)){
                    throw(new Error("Chyba pri zapise do tabuľky :("))
                }
                const attemptStr = `${attempt+1+attempts*(round-1)}/${attempts*round}`
                dispatch(updateLeaderboard([nickname, diff, attemptStr]))
                lbwrite({ nick: nickname, time: diff, attempt: attemptStr, length: wordLength })
            }
            catch(err){
                console.log(err)
            }
        }
        setAttempt(attempt + 1)
        if(attempt+1 >= attempts){
            toast.info("Vyčerpali ste pokusy :(", {toastId: 2, autoClose: 3000})
        }
    }
    const addLetter = letter => {
        letter = letter.toLowerCase()
        if(!isLetter(letter)){
            return
        }
        const copy = copy2D(table)
        for(let i = 0; i < copy[attempt].length; i++){
            if(copy[attempt][i] === ""){
                copy[attempt][i] = letter
                setTable(copy)
                return
            }
        }
    }
    const removeLetter = () => {
        const copy = copy2D(table)
        for(let i = copy[attempt].length-1; i >= 0; i--){
            if(copy[attempt][i] !== ""){
                copy[attempt][i] = ""
                setTable(copy)
                return
            }
        }
    }

    const resetGame = () => {        
        removeGameStorage(wordLength)
        setTable(Array(attempts).fill(Array(wordLength).fill("")))
        setAttempt(0)
    }

    const getRowCellColors = index => {
        const colors = Array(wordLength).fill("")

        if(index >= attempt){
            return colors
        }

        let copyRow = Array(wordLength).fill("")
        const inputWord = table[index].join("")
        const freq = letterFrequency(targetWord)

        for(let i = 0; i < wordLength; i++){
            if(targetWord[i] === inputWord[i]){
                colors[i] = theme.rightCell
                copyRow[i] = "🟩"
                freq[inputWord[i]] -= 1
            }
        }

        for(let i = 0; i < wordLength; i++){
            if(colors[i] !== "") continue;
            if(targetWord.includes(inputWord[i]) && freq[inputWord[i]] > 0){
                colors[i] = theme.containedCell
                copyRow[i] = "🟨"
                freq[inputWord[i]] -= 1
            }
            else {
                colors[i] = theme.wrongCell
                copyRow[i] = "⬛"
            }
        }
        for(let i = 0; i < wordLength; i++){
            let letter = inputWord[i]
            if(targetWord.includes(letter) && freq[letter] > 0){
                freq[letter] -= 1
                multiples.push(`${index}.${i}`)
            }
        }
        strtable[index] = copyRow.join('')
        return colors
    }

    const getKeyCellColor = (l) => {
        l = l.toLowerCase()
        if(!usedLetters.has(l)){
            return ""
        }
        else if(correctLetters.includes(l)){ 
            return theme.rightCell
        }
        else if (targetWord.toLowerCase().includes(l)){
            return theme.containedCell
        }
        else{
            return theme.wrongCell
        }
    }
    const rowColors = []
    if(targetWord){
        for(let i = 0; i < attempts; i++){
            rowColors.push(getRowCellColors(i))
        }
    }

    return (
        <div className="game" style={{justifyContent: !targetWord ? "start" : "space-between"}}>
            <div className="wrapper">
            <Mainbar share={targetWord && winner} strtable={strtable}/>
            { targetWord ? (
                <>
                {
                    winner ? <><InfoBox theme={theme} targetWord={targetWord}/><Timer color={theme.textColor}/></> : 
                    attempt >= attempts ? <button style={{color: theme.textColor, backgroundColor: theme.bgColor }} onClick={() => {increaseRound(wordLength); resetGame()}}>Skúsiť znovu</button> : null
                }
                </>
                ) : null
            }
            </div>
            {  
                !targetWord ? 
                (
                    <>
                    <div className="loadingMessage">Načítavam slovo : )</div>
                    <Spinner theme={theme}/>
                    </>
                )
                 :
                (
                    <>
                    <Playtable gameState={table} theme={theme} colors={rowColors} multiples={multiples}/>
                    <Keyboard handlefunction={handlefunction} getKeyCellColor={getKeyCellColor}/>
                    </>
                )
            }
            {/* <button onClick={() => resetGame()}>RESET</button> */}
        </div>
    )
}

const Timer = ({color}) => {
    const [time, setTime] = React.useState(new Date())
    const eod = endOfDay(time)
    const h = eod.getHours()-time.getHours()
    const m = eod.getMinutes()-time.getMinutes()
    const s = eod.getSeconds()-time.getSeconds()

    let refresh = true
    let content
    if (h === 0 && m === 0 && s === 0){
        content = <a style={{color: color}} href="/">Obnoviť</a>
        refresh = false
    }
    else {
        content = `Nové slovo: ${h < 10 ? "0"+h : h}:${m < 10 ? "0"+m : m}:${s < 10 ? "0"+s : s}`
    }

    React.useEffect(() => {
        if(refresh){
            const interval = setInterval(() => setTime(new Date()), 1000)
            return () => clearInterval(interval)
        }
    })

    return (
        <div className="warning">{ content }</div>
    )
}
