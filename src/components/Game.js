import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Mainbar } from './Mainbar/Mainbar.js'
import { Spinner } from './Spinner/Spinner.js'
import { loadCorrect, loadAttempt, loadTable, isLetter, copy2D, loadGameOver, loadWord, removeGameStorage, wordCheck,  letterFrequency, saveToStorage, lbwrite, letterToAccent } from '../helpers.js'
import './Game.css'
import { endOfDay } from 'date-fns'

import { themes } from '../theme/themes.js'
import { selectCurrentTheme } from '../theme/themeSlice.js'
import { Playtable } from './Playtable/Playtable.js'
import { Keyboard } from './Keyboard/Keyboard.js'
import { InfoBox } from './InfoBox.js'

import { saveGameState, updateLeaderboard, selectCurrentLength, selectTargetWord } from '../slices/gameState.js'

function getUsedLetters(array2D, attempt){
    const letters = new Set()
    for(let i = 0; i < attempt; i++){
        for(let j = 0; j < array2D[i].length; j++){
            letters.add(array2D[i][j])
            letters.add(letterToAccent(array2D[i][j]))
        }
    }
    return letters
}

export const Game = ({setroute}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    const attempts = 6
    const wordLength = useSelector(selectCurrentLength)
    const targetWord = useSelector(selectTargetWord)
    const nickname = localStorage.nickname ?? ""
    const winner = localStorage.getItem(`winner${wordLength}`) ?? "0"

    var gameOver = loadGameOver(wordLength)

    const [fetching, setFecthing] = React.useState(false)
    const [warnMessage, setWarnMessage] = React.useState("")


    const [table, setTable] = React.useState(loadTable(attempts, wordLength))
    const [attempt, setAttempt] = React.useState(loadAttempt(wordLength))
    const [correctLetters, setCorrectLetters] = React.useState(loadCorrect(wordLength))

    const dispatch = useDispatch()

    const strtable = []
    React.useEffect(() => {
        if(targetWord !== "") return
        loadWord(wordLength).then(o => {
            const [slovo, newWord, leaderboard, history] = o

            if(newWord){
                resetGame()
                saveToStorage("firstTry", wordLength, 1)
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
        saveToStorage("correct", wordLength, correctLetters)
    }, [attempt, correctLetters])

    const handlefunction = letter => {
        setWarnMessage("")
        if(gameOver === "1") return
        if(attempt >= attempts) return
        if(fetching) return
        if(letter === '↵' || letter === "Enter"){
            checkAndSubmit()
        }
        else if(letter ==='⌫' || letter === "Backspace"){
            removeLetter()
        }
        else{
            addLetter(letter)
        }
    }

    React.useEffect(() => {
        const handleKeyDown = (event) => handlefunction(event.key)
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    })

    const checkAndSubmit = async () => {
        if(gameOver === "1") return
        if(table[attempt].includes("")){
            setWarnMessage("Slovo musí byť dĺžky " + wordLength)
            return
        }
        const slovo = table[attempt].join("")

        setFecthing(true)
        const goodWord = await wordCheck(slovo, nickname)
        setFecthing(false)
        if(!goodWord){
            const copy = copy2D(table)
            copy[attempt] = Array(wordLength).fill("")
            setTable(copy)
            setWarnMessage("Slovo nie je v zozname")
            return
        }
        let winner = true;

        const copyCorrect = correctLetters.slice()
        for(let i = 0; i < wordLength; i++){
            if(table[attempt][i] === targetWord[i]){
                copyCorrect.push(table[attempt][i])
            }
            else{
                winner = false;
            }
        }
        setCorrectLetters(copyCorrect)
        saveToStorage("winner", wordLength, winner ? 1 : 0)
        const firstTry = localStorage.getItem(`firstTry${wordLength}`) ?? "0"

        if(winner && nickname && firstTry === '1'){
            try{
                const lastload = new Date(parseInt(localStorage.lastload))
                const now = new Date()
                const diff = Math.abs(Math.floor((lastload.getTime() - now.getTime()) / 1000))
                
                const attemptStr = `${attempt+1}/6`
                dispatch(updateLeaderboard([nickname, diff, attemptStr]))
                lbwrite({
                    nick: nickname,
                    time: diff,
                    attempt: attemptStr,
                    length: wordLength
                })
            }
            catch(err){
                console.log(err)
            }
        }
        if(attempt+1 >= attempts){
            saveToStorage("firstTry", wordLength, 0)
        }
        if(attempt+1 >= attempts || winner){
            saveToStorage("gameOver", wordLength, 1)
        }
        setAttempt(attempt + 1)
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
    const usedLetters = getUsedLetters(table, attempt)
    const getRowCellColors = index => {
        const colors = Array(wordLength).fill("")
        
        if(index >= attempt){
            return colors
        }

        let copyRow = Array(wordLength).fill("")
        const word = table[index].join("")
        const freq = letterFrequency(targetWord)

        for(let i = 0; i < wordLength; i++){
            if(targetWord[i] === word[i]){
                colors[i] = theme.rightCell
                copyRow[i] = "🟩"
                freq[word[i]] -= 1
            }
        }

        for(let i = 0; i < wordLength; i++){
            if(colors[i] !== "") continue;
            if(targetWord.includes(word[i]) && freq[word[i]] > 0){
                colors[i] = theme.containedCell
                copyRow[i] = "🟨"
                freq[word[i]] -= 1
            }
            else {
                colors[i] = theme.wrongCell
                copyRow[i] = "⬛"
            }
        }
        strtable[index] = copyRow.join('')
        return colors
    }

    const resetGame = () => {
        localStorage.winner = "0"
        localStorage.lastload = (new Date()).getTime()
        correctLetters.length = 0
        gameOver = "0"
        removeGameStorage(wordLength)
        setTable(Array(attempts).fill(Array(wordLength).fill("")))
        setAttempt(0)
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
            <Mainbar targetWord={targetWord} strtable={strtable} setroute={setroute}/>
            { targetWord ? (
                <>
                {winner === "1" ? <InfoBox theme={theme} targetWord={targetWord}/> : null}
                {
                    gameOver === "1" ? winner === "1" ? <Timer color={theme.textColor}/> : 
                    <button style={{color: theme.textColor, backgroundColor: theme.bgColor }} onClick={() => resetGame()}>Skúsiť znovu</button> :
                    (fetching ? <div className="warning">Zisťujem . . .</div> : 
                    <div className="warning">{warnMessage}</div>)
                }
                </>
            ) : null }
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
                    <Playtable gameState={table} theme={theme} colors={rowColors}/>
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
